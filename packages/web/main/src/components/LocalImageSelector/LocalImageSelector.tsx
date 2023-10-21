import React, { useMemo, useState } from "react";
import styles from "./LocalImageSelector.module.scss";
import { ImageCropModal } from "components/ImageCropModal/ImageCropModal";
import {
  Button,
  ListSpaceBetween,
  SpaceBetweenListItem,
  AspectRatioImage,
  SpaceBetween,
} from "@wedding-planner/shared";
import { useDropzone } from "react-dropzone";
import { APIFetcher, ImageCompressionUtils } from "utils";
import { Crop } from "react-image-crop";
import axios from "axios";

export type ImageForUpload = File & {
  original: string;
  preview: string;
  crop?: Crop;
  final?: File;
};

const maxImages = 100;

export type LocalImageSelectorProps = {};

export const LocalImageSelector = (props: LocalImageSelectorProps) => {
  const [files, setFiles] = useState<ImageForUpload[]>([]);
  const [showCropModal, setShowCropModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const selectedImage = useMemo(
    () => (selectedImageIndex !== null ? files[selectedImageIndex] : null),
    [selectedImageIndex, files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: Math.max(maxImages - files.length, 0),
    disabled: files.length >= maxImages,
    onDropRejected: (rejectedFiles) => {
      const isMaxFilesError = files.length + rejectedFiles.length > maxImages;

      if (isMaxFilesError) {
        alert(`You can only upload ${maxImages} images`);
      }
    },
    onDrop: (acceptedFiles) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            original: URL.createObjectURL(file),
          })
        ),
      ]);
    },
  });

  const removeImage = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const uploadImages = async () => {
    const startTime = Date.now();

    // Comrpess images
    const images = await ImageCompressionUtils.compressImages(
      // TODO: Ensure all images have been cropped to 1920x1080 before reaching this point
      files.map((f) => f.final ?? f)
    );

    // Get unique S3 signed URLs for each image
    const { signedURLs } = await APIFetcher.getVendorImageUploadPresignedUrl({
      imageNames: images.map((img) => img.name),
    });

    // Upload all images to S3
    await Promise.all(
      signedURLs.map(async ({ signedUrl }, i) => {
        const image = images[i];

        await axios.put(signedUrl, image, {
          headers: {
            "Content-Type": image.type,
          },
        });
      })
    );

    const endTime = Date.now();
    console.log(`Upload time: ${endTime - startTime}ms`);

    console.log("all images uploaded");

    // TODO: Send object keys to backend to be associated with vendor
  };

  return (
    <SpaceBetween vertical>
      <div {...getRootProps({ className: styles.dropArea })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select some files</p>
      </div>
      <Button onClick={uploadImages}>Upload</Button>
      <ListSpaceBetween
        itemsPerRow={3}
        classes={{ root: styles.previewThumbs }}
      >
        {files.map((file, i) => (
          <SpaceBetweenListItem key={i}>
            <button
              className={styles.previewThumbWrapper}
              onClick={() => {
                setShowCropModal(true);
                setSelectedImageIndex(i);
              }}
            >
              <AspectRatioImage
                img={file.preview}
                classes={{ root: styles.previewThumb }}
              />
              <button
                className={styles.removeThumbBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(i);
                }}
              >
                x
              </button>
            </button>
          </SpaceBetweenListItem>
        ))}
      </ListSpaceBetween>

      <ImageCropModal
        file={selectedImage}
        show={showCropModal}
        crop={selectedImage?.crop}
        onSave={(imageBlob, crop) => {
          const imageHref = URL.createObjectURL(imageBlob);

          setFiles(
            files.map((f, i) =>
              i === selectedImageIndex
                ? { ...f, preview: imageHref, final: imageBlob, crop }
                : f
            )
          );
        }}
        toggleShow={() => setShowCropModal(!showCropModal)}
      />
    </SpaceBetween>
  );
};
