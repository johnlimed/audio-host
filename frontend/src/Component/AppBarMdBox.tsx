import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import { useFetcher } from "react-router-dom";
import { Button } from "@mui/material";

type AppBarMdBoxProps = {
  menuItems: { name: string, link: string }[]
}

export default function AppBarMdBox(props: AppBarMdBoxProps) {
  const fetcher = useFetcher();
  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        {
          props.menuItems.map((menuItem, index) => {
            return (
              <MenuItem
                key={`${index}-md-menuitem`}
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
      </Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          gap: 0.5,
          alignItems: 'center',
        }}
      >
        <fetcher.Form method="post" action="/logout">
          <Button size="small" variant="contained" type="submit">
            Logout
          </Button>
        </fetcher.Form>
      </Box>
    </>
  )
}