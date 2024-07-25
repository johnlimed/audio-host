import { useState } from "react";
import { Link as RouterLink, useFetcher } from "react-router-dom";

import Box from "@mui/material/Box";
import Link from '@mui/material/Link';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import MenuIcon from '@mui/icons-material/Menu';
import InputFileUpload from "./ButtonUpload";
import { isAdmin } from "../util/auth";

type AppBarXsBoxProps = {
  menuItems: { name: string, link: string, isAdmin?: boolean }[]
}

export default function AppBarXsBox(props: AppBarXsBoxProps) {
  const [open, setOpen] = useState(false);
  const fetcher = useFetcher();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ display: { sm: '', md: 'none' } }}>
      <Button
        variant="text"
        color="primary"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ minWidth: '30px', p: '4px' }}
      >
        <MenuIcon />
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            minWidth: '60dvw',
            p: 2,
            backgroundColor: 'background.paper',
            flexGrow: 1,
          }}
        >          
          {
            props.menuItems.map((menuItem, index) => {
              if (menuItem.isAdmin && !isAdmin()) {
                return null;
              }
              return (
                <MenuItem
                  key={`${index}-xs-menuitem`}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Link
                    to={menuItem.link}
                    component={RouterLink}
                    underline="none"
                  >
                    <Typography variant="body2" color="text.primary">
                      {menuItem.name}
                    </Typography>
                  </Link>
                </MenuItem>
              )
            })
          }
          <Divider />
          <MenuItem>
            <InputFileUpload fullWidth={true}/>
          </MenuItem>
          <MenuItem>
            <fetcher.Form method="post" action="/logout" style={{ width: "100%" }}>
              <Button size="small" type="submit" fullWidth={true}>
                Logout
              </Button>
            </fetcher.Form>
          </MenuItem>
        </Box>
      </Drawer>
    </Box>
  )
}