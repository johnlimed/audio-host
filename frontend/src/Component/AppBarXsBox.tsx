import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import MenuIcon from '@mui/icons-material/Menu';
import ButtonLink from "./ButtonLink";

type AppBarXsBoxProps = {
  menuItems: { name: string, link: string }[]
}

export default function AppBarXsBox(props: AppBarXsBoxProps) {
  const [open, setOpen] = useState(false);

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
              return (
                <MenuItem
                  key={`${index}-xs-menuitem`}
                  // onClick={() => { }}
                  href={menuItem.link}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    {menuItem.name}
                  </Typography>
                </MenuItem>
              )
            })
          }
          <Divider />
          <MenuItem>
            <ButtonLink
              to="/logout"
              text="logout"
              sx={{ width: "100%" }}
            />
          </MenuItem>
        </Box>
      </Drawer>
    </Box>
  )
}