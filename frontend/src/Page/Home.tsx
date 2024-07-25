import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useLoaderData } from "react-router-dom";

import { ITrackRes } from "../type/ITrackRes";
import TrackCard from "../Component/TrackCard";
import TrackPlayer from "../Component/TrackPlayer";
import { useEffect, useState } from "react";
import { EnumHost } from "../type/EnumHost";
import { EnumEndpoint } from "../type/EnumEndpoint";

export default function Home() {
  const [curTrack, setCurTrack] = useState <ITrackRes|null>(null);
  const { tracks } = useLoaderData() as { tracks: ITrackRes[] };

  useEffect(() => {
    if (tracks && tracks.length > 0) {
      // Default set to first track
      setCurTrack(tracks[0]);
    }
  }, [tracks]);

  const renderPlayer = () => {
    if (!curTrack) return null;
    const url = `${EnumHost.LOCAL}${EnumEndpoint.TRACK}/${curTrack.id}`;

    return (
      <Grid container spacing={6} sx={{ mb: "20px" }}>
        <Grid item xs={12}>
          <TrackPlayer name={curTrack.filename} url={url} />
        </Grid>
      </Grid>
    )
  }

  const renderTracks = () => {
    if (tracks.length === 0) {
      return (
          <Grid item xs={12} md={6}>
            <Typography variant="h1" component="h2">No tracks just yet, upload one to get started :)</Typography>
          </Grid >
      )
    }
    return tracks.map((val, index) => {
      return (
        <Grid key={`grid-track-${index}`} item xs={6} md={4}>
          <TrackCard filename={val.filename} />
        </Grid>
      )
    });
  }

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
        {renderPlayer()}
        <Grid container spacing={6}>
          {renderTracks()}
        </Grid>
      </Container>
      <Divider />
    </Box>    
  );
}