import { SxProps, Theme } from "@mui/material";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom"

type ButtonLinkProps = {
  to: string;
  text?: string;
  newTab?: boolean;
  fullWidth?: boolean;
  sx?: SxProps<Theme> | undefined;
  children?: string | JSX.Element | JSX.Element[] | "() => JSX.Element";
}

export default function ButtonLink(props: ButtonLinkProps) {
  return (
    <Button
      color="primary"
      variant="contained"
      size="small"
      fullWidth={props.fullWidth}
      to={props.to}
      component={RouterLink}
      target={props.newTab ? "_blank" : undefined}
      sx={props.sx}
    >
      {props.children || props.text}
    </Button>
  )
}