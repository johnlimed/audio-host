import { Link as RouterLink } from "react-router-dom";

import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

type LinkTextProps = {
  to: string;
  text: string;
}

export default function LinkText(props: LinkTextProps) {

  return (
    <Typography>
      <Link 
        to={props.to} 
        component={RouterLink}
      >
        {props.text}
      </Link>
    </Typography>
  )
}