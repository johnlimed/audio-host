import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useLoaderData } from "react-router-dom";


import { ITrackRes } from "../type/ITrackRes";
import TrackCard from "../Component/TrackCard";
import DenseTable from "../Component/DenseTable";
import TrackWavesurfer from '../Component/TrackWavesurfer';


export default function TrackPlayer() {
  const [trackIndex, setTrackIndex] = useState <number>(0);
  const [trackData, setTrackData] = useState <string[][]>([]);
  const [paused, setPaused] = useState(true);

  const { tracks } = useLoaderData() as { tracks: ITrackRes[] };

  useEffect(() => {
    if (tracks && tracks.length > 0) {
      const td = tracks.map((track) => {
        return [track.id, track.filename]
      });
      setTrackData(td);
      // Default set to first track
      setTrackIndex(0);
    }
  }, [tracks]);

  const handleRowClick = (e?: React.MouseEvent<HTMLTableRowElement, MouseEvent>, index?: number) => { 
    if (index!== undefined) {
      setTrackIndex(index);
      setPaused(true);
    }
  }

  const renderTable = () => {
    return (
      <DenseTable 
        name="Track list" 
        headers={["id", "track name"]} 
        data={trackData} 
        focusIndex={trackIndex} 
        rowOnClick={handleRowClick}
      />
    )
  }

  const renderTracks = () => {
    const curTrack = tracks[trackIndex];
    if (!curTrack) {
      return (
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography variant="h1" component="h2">No tracks just yet, upload one to get started :)</Typography>
          </Grid >
        </Grid>
      )
    }

    return (
      <>
        <Grid container spacing={6} sx={{ mb: "20px" }}>
          <Grid item xs={12}>
            <TrackWavesurfer 
              trackId={tracks[trackIndex].id} 
              onClick={() => { 
                setPaused(!paused);
              }} 
            />
          </Grid>
        </Grid>
        <Grid container sx={{ mb: "20px" }} justifyContent={"center"} spacing={2}>
          <Grid item xs={4}>
            <TrackCard 
              id={curTrack.id} 
              externalPaused={paused} 
              filename={curTrack.filename} 
              playOnClick={() => {setPaused(!paused)} } 
            />
          </Grid>
          <Grid item xs={8}>
            {renderTable()}
          </Grid>
        </Grid>
      </>
    )
  }

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
        {renderTracks()}
      </Container>
      <Divider />
    </Box>    
  );
}