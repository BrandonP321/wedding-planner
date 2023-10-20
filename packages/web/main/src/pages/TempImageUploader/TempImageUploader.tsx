import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./TempImageUploader.module.scss";
import { useDropzone } from "react-dropzone";
import {
  AspectRatioContent,
  AspectRatioImage,
  Button,
  ListSpaceBetween,
  Modal,
  SpaceBetween,
  SpaceBetweenListItem,
} from "@wedding-planner/shared";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import classNames from "classnames";

export type TempImageUploaderProps = {};

const maxImages = 10;

type ImageForUpload = File & {
  original: string;
  preview: string;
  crop?: Crop;
  final?: string;
};

export const TempImageUploader = (props: TempImageUploaderProps) => {
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

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select some files</p>
      </div>
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
        onSave={(image, crop) => {
          console.log(image, crop);
          setFiles(
            files.map((f, i) =>
              i === selectedImageIndex
                ? { ...f, preview: image, final: image, crop }
                : f
            )
          );
        }}
        toggleShow={() => setShowCropModal(!showCropModal)}
      />
    </div>
  );
};

type ImageCropModalProps = {
  file: ImageForUpload | null;
  show: boolean;
  crop?: Crop;
  onSave: (image: string, crop: Crop) => void;
  toggleShow: () => void;
};

export const ImageCropModal = ({
  file,
  show,
  crop: initialCrop,
  toggleShow,
  onSave,
}: ImageCropModalProps) => {
  const [crop, setCrop] = useState<Crop | undefined>(initialCrop);
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const transformedImgHref = useRef<string | null>(null);

  const closeModal = (withReset = true) => {
    withReset &&
      setTimeout(() => {
        resetCropSettings();
      }, 350);
    toggleShow();
  };

  const handleSaveBtnClick = () => {
    const transformedImg = transformedImgHref.current;

    if (transformedImg && completedCrop) {
      onSave(transformedImg ?? "", completedCrop);
    } else {
      // TODO: Alert user of error
    }

    closeModal();
  };

  const resetCropSettings = () => {
    transformedImgHref.current = null;
    setIsPreviewMode(false);
    setCompletedCrop(undefined);
    setCrop(undefined);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    if (completedCrop && canvas && image) {
      getCroppedImg(image, completedCrop, canvas)
        .then((blob) => {
          transformedImgHref.current = URL.createObjectURL(blob);
        })
        // TODO: Alert user of error
        .catch(() => {});
    }
  }, [completedCrop]);

  useEffect(() => {
    setCrop(initialCrop);
  }, [show, initialCrop]);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 16 / 9));
  };

  return (
    <Modal
      show={show}
      toggleShow={closeModal}
      title="Crop Image"
      fullSize
      footer={
        <SpaceBetween justify="end">
          <Button
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            disabled={!completedCrop}
          >
            {isPreviewMode ? "Edit" : "Preview"}
          </Button>
          <Button onClick={() => closeModal()}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveBtnClick}>
            Save
          </Button>
        </SpaceBetween>
      }
    >
      <ReactCrop
        crop={crop}
        onChange={(_, percentCrop) => setCrop(percentCrop)}
        onComplete={(crop) => setCompletedCrop(crop)}
        aspect={16 / 9}
        className={classNames(isPreviewMode && styles.hide)}
        keepSelection
      >
        <img
          src={file?.original}
          ref={imageRef}
          onLoad={handleImageLoad}
          alt="Crop preview"
        />
      </ReactCrop>
      {completedCrop && (
        <AspectRatioContent
          classes={{
            root: classNames(styles.cropPreview, !isPreviewMode && styles.hide),
          }}
        >
          <canvas
            ref={canvasRef}
            className={styles.canvas}
            style={{
              objectFit: "contain",
            }}
          />
        </AspectRatioContent>
      )}
    </Modal>
  );
};

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        height: 80,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

function getCroppedImg(
  image: HTMLImageElement,
  crop: Crop,
  canvas: HTMLCanvasElement
) {
  const ctx = canvas.getContext("2d");

  const parentWidth = canvas.parentElement?.offsetWidth ?? 0;
  const parentHeight = canvas.parentElement?.clientHeight ?? 0;

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;

  canvas.width = parentWidth * pixelRatio;
  canvas.height = parentHeight * pixelRatio;
  canvas.style.width = `${parentWidth}px`;
  canvas.style.height = `${parentHeight}px`;

  if (ctx) {
    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";
  }

  ctx?.drawImage(
    image,
    crop.x * scaleX, // source x
    crop.y * scaleY, // source y
    crop.width * scaleX, // source width
    crop.height * scaleY, // source height
    0, // destination x
    0, // destination y
    parentWidth, // destination width
    parentHeight // destination height
  );

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      resolve(blob);
    }, "image/jpeg");
  });
}
