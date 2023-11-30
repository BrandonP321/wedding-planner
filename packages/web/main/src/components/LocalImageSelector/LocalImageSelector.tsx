import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./LocalImageSelector.module.scss";
import { ImageCropModal } from "components/ImageCropModal/ImageCropModal";
import {
  Button,
  ListSpaceBetween,
  SpaceBetween,
  Header,
  Alert,
  Container,
  ArrayUtils,
} from "@wedding-planner/shared";
import { useDropzone } from "react-dropzone";
import { ImagePreview } from "./components/ImagePreview/ImagePreview";
import { MoveImageModal } from "./components/MoveImageModal/MoveImageModal";
import { useAuthedVendorListing } from "store/slices/vendor/vendorHooks";
import {
  ImageForUpload,
  getFileObjectsFromImages,
  getSortedShowcaseImages,
  uploadImages,
} from "./imageSelectorHelpers";

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

const maxImages = 100;
const maxShowcaseImages = 5;

export type LocalImageSelectorProps = {};

export const LocalImageSelector = (props: LocalImageSelectorProps) => {
  const { listing } = useAuthedVendorListing();

  const [files, setFiles] = useState<ImageForUpload[]>([]);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showMoveImageModal, setShowMoveImageModal] = useState(false);
  const [showMoveShowcaseImageModal, setShowMoveShowcaseImageModal] =
    useState(false);
  const imageToMoveIndex = useRef<number>(-1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    const listingImages = listing?.images;

    if (listingImages?.length) {
      getFileObjectsFromImages(listingImages).then((images) => {
        setFiles(images);
      });
    }
  }, []);

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

  const updateImages = (cb: (images: ImageForUpload[]) => void) => {
    const newImages = [...files];
    cb(newImages);
    setFiles(newImages);
  };

  const updateImage = (index: number, cb: (img: ImageForUpload) => void) => {
    updateImages((images) => cb(images[index]));
  };

  const removeImage = (index: number) => {
    updateImages((images) => images.splice(index, 1));
  };

  const removeShowcaseImage = (index: number) => {
    updateImages((images) => {
      images[index].isInShowcase = false;
      images[index].showcaseOrder = undefined;

      const showcaseImages = getSortedShowcaseImages(images);

      showcaseImages.forEach((img, i) => {
        img.showcaseOrder = i + 1;
      });
    });
  };

  const moveImage = (from: number, to: number) => {
    updateImages((images) => {
      ArrayUtils.move(images, from, to);
    });
  };

  const moveShowcaseImage = (from: number, to: number) => {
    updateImages((images) => {
      const showcaseImages = getSortedShowcaseImages(images);

      ArrayUtils.move(showcaseImages, from, to);

      showcaseImages.forEach((img, i) => {
        img.showcaseOrder = i + 1;
      });
    });
  };

  const showcaseImages = useMemo(
    () =>
      files
        .filter((f) => f.isInShowcase)
        .map((f) => ({ ...f, index: files.indexOf(f) }))
        .sort((a, b) => (a.showcaseOrder ?? 0) - (b.showcaseOrder ?? 0)),
    [files]
  );

  const canAddShowcaseImage = showcaseImages.length < maxShowcaseImages;

  return (
    <SpaceBetween size="xxl" vertical stretch stretchChildren>
      <div {...getRootProps({ className: styles.dropArea })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select some files</p>
      </div>

      <Container
        header={
          <Header
            title={`Showcase images (${showcaseImages.length}/${maxShowcaseImages})`}
            variant="h3"
            description={lorem}
          />
        }
      >
        {!showcaseImages.length && (
          <Alert type="info" title={<p>No showcase images yet</p>}>
            <p>
              Upload an image and click the start icon to mark it as a showcase
              image.
            </p>
          </Alert>
        )}

        <ListSpaceBetween
          itemsPerRow={4}
          classes={{ root: styles.previewThumbs }}
          stretch
        >
          {showcaseImages.map((file, i) => (
            <ImagePreview
              key={file.name}
              file={file}
              isInShowcase={file.isInShowcase}
              reorderLabel="Change position in showcase"
              onReorderClick={() => {
                setShowMoveImageModal(false);
                setShowMoveShowcaseImageModal(true);
                imageToMoveIndex.current = i;
              }}
              onShowcaseClick={() => removeShowcaseImage(file.index)}
            />
          ))}
        </ListSpaceBetween>
      </Container>

      <SpaceBetween vertical stretchChildren>
        <Header
          title={`All images (${files.length}/${maxImages})`}
          variant="h2"
          description={lorem}
        />

        <ListSpaceBetween
          itemsPerRow={4}
          classes={{ root: styles.previewThumbs }}
        >
          {files.map((file, i) => (
            <ImagePreview
              key={i}
              file={file}
              onDeleteClick={() => removeImage(i)}
              isInShowcase={file.isInShowcase}
              disableShowcaseBtn={!canAddShowcaseImage && !file.isInShowcase}
              onReorderClick={() => {
                setShowMoveShowcaseImageModal(false);
                setShowMoveImageModal(true);
                imageToMoveIndex.current = i;
              }}
              onEditClick={() => {
                setShowCropModal(true);
                setSelectedImageIndex(i);
              }}
              onShowcaseClick={() =>
                updateImage(i, (img) => {
                  img.isInShowcase = !img.isInShowcase;
                  img.showcaseOrder = showcaseImages.length + 1;
                })
              }
            />
          ))}
        </ListSpaceBetween>
      </SpaceBetween>

      <SpaceBetween justify="end">
        <Button variant="primary" onClick={() => uploadImages(files)}>
          Publish changes
        </Button>
      </SpaceBetween>

      {/* All images */}
      <MoveImageModal
        imageIndex={imageToMoveIndex.current}
        totalImages={files.length}
        show={showMoveImageModal}
        toggleShow={() => setShowMoveImageModal(!showMoveImageModal)}
        handleSave={(to) => {
          moveImage(imageToMoveIndex.current, to);
          setShowMoveImageModal(false);
        }}
      />

      {/* Showcase images */}
      <MoveImageModal
        imageIndex={imageToMoveIndex.current}
        totalImages={showcaseImages.length}
        show={showMoveShowcaseImageModal}
        toggleShow={() =>
          setShowMoveShowcaseImageModal(!showMoveShowcaseImageModal)
        }
        handleSave={(to) => {
          moveShowcaseImage(imageToMoveIndex.current, to);
          setShowMoveShowcaseImageModal(false);
        }}
      />

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
