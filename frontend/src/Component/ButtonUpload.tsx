import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useContext } from 'react';
import { SnackContext } from '../Context/appContext';

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
  
  return (
    <>
      <Button
        fullWidth={props.fullWidth}
        size={"small"}
        component="label"
        variant="contained"
        role={undefined}
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput type="file" />
      </Button>
    </>
  );
}