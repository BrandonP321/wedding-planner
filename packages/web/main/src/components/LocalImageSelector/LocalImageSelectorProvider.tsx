import React, { useMemo, useRef, useState } from "react";
import { createContext } from "react";
import {
  ImageForUpload,
  getSortedShowcaseImages,
} from "./imageSelectorHelpers";
import {
  ArrayUtils,
  VendorMediaUtils,
} from "@wedding-planner/shared/common/utils";

type LocalImageSelectorContext = {
  files: ImageForUpload[];
  setFiles: (files: ImageForUpload[]) => void;
  showCropModal: boolean;
  setShowCropModal: (show: boolean) => void;
  showMoveImageModal: boolean;
  showMoveShowcaseImageModal: boolean;
  setShowMoveShowcaseImageModal: (show: boolean) => void;
  setShowMoveImageModal: (show: boolean) => void;
  imageToMoveIndex: React.MutableRefObject<number>;
  selectedImageIndex: number | null;
  setSelectedImageIndex: (index: number | null) => void;
};

const Context = createContext({} as LocalImageSelectorContext);

export type LocalImageSelectorProviderProps = React.PropsWithChildren<{}>;

export const LocalImageSelectorProvider = ({
  children,
}: LocalImageSelectorProviderProps) => {
  const [files, setFiles] = useState<ImageForUpload[]>([]);
  const [showCropModal, setShowCropModal] = useState(false);
  const [showMoveImageModal, setShowMoveImageModal] = useState(false);
  const [showMoveShowcaseImageModal, setShowMoveShowcaseImageModal] =
    useState(false);
  const imageToMoveIndex = useRef(-1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  return (
    <Context.Provider
      value={{
        files,
        setFiles,
        setShowMoveShowcaseImageModal,
        showMoveShowcaseImageModal,
        imageToMoveIndex,
        selectedImageIndex,
        setSelectedImageIndex,
        setShowCropModal,
        setShowMoveImageModal,
        showCropModal,
        showMoveImageModal,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const maxShowcaseImages = VendorMediaUtils.maxShowcaseImages;

export const useLocalImageSelector = () => {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error(
      "useLocalImageSelector must be used within a LocalImageSelectorProvider"
    );
  }

  const { files, setFiles, selectedImageIndex } = context;

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

  const selectedImage = useMemo(
    () => (selectedImageIndex !== null ? files[selectedImageIndex] : null),
    [selectedImageIndex, files]
  );

  const canAddShowcaseImage = showcaseImages.length < maxShowcaseImages;

  return {
    ...context,
    canAddShowcaseImage,
    showcaseImages,
    selectedImage,
    updateImage,
    updateImages,
    moveImage,
    moveShowcaseImage,
    removeImage,
    removeShowcaseImage,
  };
};
