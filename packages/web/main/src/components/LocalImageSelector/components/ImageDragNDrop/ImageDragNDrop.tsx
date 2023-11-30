import styles from "../../LocalImageSelector.module.scss";
import { useDropzone } from "react-dropzone";
import { VendorMediaUtils } from "@wedding-planner/shared";
import { useLocalImageSelector } from "components/LocalImageSelector/LocalImageSelectorProvider";

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
      <p>Drag 'n' drop some files here, or click to select some files</p>
    </div>
  );
};
