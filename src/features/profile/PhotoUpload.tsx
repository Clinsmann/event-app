import React, { useState, useEffect } from "react";
import { Header, Grid, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { ImageCropper, FileUpload } from "../../app/common/form-controls";

interface IProps {
  loading: boolean;
  uploadPhoto: (file: Blob) => void;
}

const PhotoUpload: React.FC<IProps> = ({ loading, uploadPhoto }) => {
  const [files, setFiles] = useState<any[]>([]);
  const [image, setImage] = useState<Blob | null>(null);

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  });

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header color="teal" sub content="Step 1 - Add Photo" />
        <FileUpload setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 2 - Resize image" />
        {files.length > 0 && <ImageCropper setImage={setImage} imagePreview={files[0].preview} />}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub color="teal" content="Step 3 - Preview & Upload" />
        {files.length > 0 && (
          <>
            <div className="img-preview" style={{ minHeight: "200px", overflow: "hidden" }} />
            <Button.Group widths={2}>
              <Button positive icon="check" loading={loading} onClick={() => uploadPhoto(image!)} />
              <Button icon="close" disabled={loading} onClick={() => setFiles([])} />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(PhotoUpload);
