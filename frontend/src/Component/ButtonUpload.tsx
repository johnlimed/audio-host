import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useContext, useEffect, useState } from 'react';
import { SnackContext } from '../Context/appContext';
import { Form, useActionData } from 'react-router-dom';
import { ITrackRes } from '../type/ITrackRes';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

type InputFileUploadProps = {
  fullWidth?: boolean;
}

export default function InputFileUpload(props: InputFileUploadProps) {
  const { setMessage, setOpenSnackbar } = useContext(SnackContext);
  const [visible, setVisible] = useState(false);
  
  const onChange = () => {
    setVisible(true);
  }

  const actionData = useActionData() as { track: ITrackRes } | { error: string } | undefined;
  
  useEffect(() => {
    if (actionData) {
      if ("error" in actionData) {
        setMessage(actionData.error);
      } else {
        setMessage(`File ${actionData.track.filename} uploaded.`);
      }
      setOpenSnackbar(true);
      setVisible(false);
    }
  }, [actionData, setMessage, setOpenSnackbar]);

  return (
    <Form id="upload-file-form" method="post">
      <Button
        fullWidth={props.fullWidth}
        size={"small"}
        component="label"
        variant="contained"
        role={undefined}
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Select file
        <VisuallyHiddenInput id="fileUpload" name="fileUpload" type="file" onClick={onChange} />
      </Button>
      <Button size="small" type="submit" sx={{ ml: "5px", display: !visible ? "none" : "inline-flex" }}>Upload</Button>
    </Form>
  );
}