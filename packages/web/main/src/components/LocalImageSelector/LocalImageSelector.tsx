import React, { useEffect, useState } from "react";
import styles from "./LocalImageSelector.module.scss";
import { ImageCropModal } from "components/ImageCropModal/ImageCropModal";
import {
  Button,
  ListSpaceBetween,
  SpaceBetween,
  Header,
  Alert,
  Container,
  VendorMediaUtils,
  Spinner,
} from "@wedding-planner/shared";
import { ImagePreview } from "./components/ImagePreview/ImagePreview";
import { MoveImageModal } from "./components/MoveImageModal/MoveImageModal";
import { useAuthedVendorListing } from "store/slices/vendor/vendorHooks";
import { getFileObjectsFromImages, uploadImages } from "./imageSelectorHelpers";
import { useLocalImageSelector } from "./LocalImageSelectorProvider";
import { ImageDragNDrop } from "./components/ImageDragNDrop/ImageDragNDrop";

const maxImages = VendorMediaUtils.maxImages;
const maxShowcaseImages = VendorMediaUtils.maxShowcaseImages;

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

export type LocalImageSelectorProps = {};

export const LocalImageSelector = (props: LocalImageSelectorProps) => {
  const { listing } = useAuthedVendorListing();
  const {
    files,
    setFiles,
    selectedImageIndex,
    selectedImage,
    showcaseImages,
    setShowMoveImageModal,
    setShowCropModal,
    setShowMoveShowcaseImageModal,
    imageToMoveIndex,
    removeShowcaseImage,
    removeImage,
    setSelectedImageIndex,
    updateImage,
    canAddShowcaseImage,
    showCropModal,
    showMoveImageModal,
    moveImage,
    showMoveShowcaseImageModal,
    moveShowcaseImage,
  } = useLocalImageSelector();

  const [isLoadingImages, setIsLoadingImages] = useState(false);

  useEffect(() => {
    const listingImages = listing?.images;

    if (listingImages?.length) {
      setIsLoadingImages(true);
      getFileObjectsFromImages(listingImages).then((images) => {
        setFiles(images);
        setIsLoadingImages(false);
      });
    }
  }, []);

  return (
    <SpaceBetween size="xxl" vertical stretch stretchChildren>
      <ImageDragNDrop />

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

        <ImagesList>
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
        </ImagesList>
      </Container>

      <SpaceBetween vertical stretchChildren>
        <Header
          title={`All images (${files.length}/${maxImages})`}
          variant="h2"
          description={lorem}
        />

        {isLoadingImages && (
          <SpaceBetween stretch justify="center">
            <Spinner text="Loading images" />
          </SpaceBetween>
        )}

        <ImagesList>
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
        </ImagesList>
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

function ImagesList(props: React.PropsWithChildren) {
  const { children } = props;

  return (
    <ListSpaceBetween
      itemsPerRow={4}
      responsiveItemsPerRow={{
        large: 3,
        medium: 2,
        tiny: 1,
      }}
      classes={{ root: styles.previewThumbs }}
      stretch
    >
      {children}
    </ListSpaceBetween>
  );
}
