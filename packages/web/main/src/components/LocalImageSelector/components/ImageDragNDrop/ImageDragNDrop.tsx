import styles from "../../LocalImageSelector.module.scss";
import { useDropzone } from "react-dropzone";
import {
  Button,
  SpaceBetween,
  VendorMediaUtils,
} from "@wedding-planner/shared";
import { useLocalImageSelector } from "components/LocalImageSelector/LocalImageSelectorProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/pro-solid-svg-icons";

export type ImageDragNDropProps = {};

const maxImages = VendorMediaUtils.maxImages;

export const ImageDragNDrop = (props: ImageDragNDropProps) => {
  const { files, setFiles } = useLocalImageSelector();

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

  return (
    <div {...getRootProps({ className: styles.dropArea })}>
      <input {...getInputProps()} />
      <SpaceBetween
        classes={{ root: styles.uploadContent }}
        size="m"
        align="center"
        vertical
      >
        <FontAwesomeIcon icon={faCloudArrowUp} className={styles.uploadIcon} />
        <SpaceBetween align="center" stretch vertical>
          <p>Drag & Drop to Upload Images</p>
          <p>OR</p>
          <Button variant="primary">Browse files</Button>
        </SpaceBetween>
      </SpaceBetween>
    </div>
  );
};
