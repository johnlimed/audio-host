import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useLoaderData } from "react-router-dom";

import { ITrackRes } from "../type/ITrackRes";

export default function Home() {
  
  const { tracks } = useLoaderData() as { tracks: ITrackRes[] };

  const renderTracks = () => {
    if (tracks.length === 0) {
      return (
        <Typography variant="h1" component="h2">No tracks just yet, upload one to get started :)</Typography>
      )
    }
    return null;
  }

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            {renderTracks()}
          </Grid>
        </Grid>
      </Container>
      <Divider />
    </Box>    
  );
}