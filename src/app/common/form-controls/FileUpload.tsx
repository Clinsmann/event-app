import React, { useCallback } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { Icon, Header } from "semantic-ui-react";

interface IProps extends Partial<DropzoneOptions> {
  setFiles: (files: object[]) => void;
}

const dropzoneStyles = {
  border: "dashed 3px",
  borderColor: "#eee",
  borderRadius: "5px",
  paddingTop: "30px",
  textAlign: "center" as "center",
  height: "200px",
};

const dropzoneActive = {
  borderColor: "green",
};

export const FileUpload: React.FC<IProps> = ({ setFiles, multiple, accept, minSize, maxSize, maxFiles }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file: object) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept,
    minSize,
    maxSize,
    maxFiles,
  });

  return (
    <div {...getRootProps()} style={isDragActive ? { ...dropzoneStyles, ...dropzoneActive } : dropzoneStyles}>
      <input {...getInputProps()} />
      <Icon name="upload" size="huge" />
      <Header content="Drop image here" />
    </div>
  );
};

/*
 accept="image/jpeg, image/png, application/pdf, 
application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" 

*/
