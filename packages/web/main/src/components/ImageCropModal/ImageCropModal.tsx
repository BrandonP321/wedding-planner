import {
  Modal,
  SpaceBetween,
  Button,
  AspectRatioContent,
} from "@wedding-planner/shared";
import classNames from "classnames";
import React, { useState, useRef, useEffect } from "react";
import ReactCrop, { Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import styles from "./ImageCropModal.module.scss";
import "react-image-crop/dist/ReactCrop.css";
import { ImageForUpload } from "components/LocalImageSelector/LocalImageSelector";

export type ImageCropModalProps = {
  file: ImageForUpload | null;
  show: boolean;
  crop?: Crop;
  onSave: (imageFile: File, crop: Crop) => void;
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
  const transformedImgFile = useRef<File | null>(null);

  const closeModal = (withReset = true) => {
    withReset &&
      setTimeout(() => {
        resetCropSettings();
      }, 350);
    toggleShow();
  };

  const handleSaveBtnClick = () => {
    const transformedImg = transformedImgFile.current;

    if (transformedImg && completedCrop) {
      onSave(transformedImg ?? "", completedCrop);
    } else {
      // TODO: Alert user of error
    }

    closeModal();
  };

  const resetCropSettings = () => {
    transformedImgFile.current = null;
    setIsPreviewMode(false);
    setCompletedCrop(undefined);
    setCrop(undefined);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    if (completedCrop && canvas && image && file) {
      getCroppedImg(image, completedCrop, canvas, file)
        .then((blob) => {
          transformedImgFile.current = blob;
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
  canvas: HTMLCanvasElement,
  file: File
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

  return new Promise<File>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas is empty"));
        return;
      }
      const newFile = new File([blob], file.name, { type: "image/jpeg" });
      resolve(newFile);
    }, "image/jpeg");
  });
}
