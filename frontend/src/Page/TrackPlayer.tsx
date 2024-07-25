import { Form, useLoaderData } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


import { ITrackRes } from "../type/ITrackRes";
import TrackCard from "../Component/TrackCard";
import DenseTable from "../Component/DenseTable";
import TrackWavesurfer from '../Component/TrackWavesurfer';


export default function TrackPlayer() {
  const [trackIndex, setTrackIndex] = useState <number>(0);
  const [trackData, setTrackData] = useState <string[][]>([]);
  const [paused, setPaused] = useState(true);
  const [dialogText, setDialogText] = useState("");
  const [deleteId, setDeleteId] = useState("");

  const { tracks } = useLoaderData() as { tracks: ITrackRes[] };

  const closeDialog = () => { setDialogText(""); }

  const callDeleteTrack = useCallback(async (index: number, track: any) => {
    console.log(track)
    setDialogText(`You are about to delete track ${track[0]}`);
    setDeleteId(track[0]);
  }, []);

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

  const skipNext = useCallback(() => {
    const newIndex = trackIndex + 1;
    if (newIndex < tracks.length) {
      setTrackIndex(newIndex);
    }
  }, [trackIndex, tracks.length]);

  const skipPrevious = useCallback(() => {
    const newIndex = trackIndex - 1;
    if (newIndex >= 0) {
      setTrackIndex(newIndex);
    }
  }, [trackIndex])

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
              skipNext={skipNext}
              skipPrevious={skipPrevious}
            />
          </Grid>
          <Grid item xs={8}>
            <DenseTable
              name="Track list"
              headers={["id", "Track name", ""]}
              data={trackData}
              focusIndex={trackIndex}
              rowOnClick={handleRowClick}
              onDelete={callDeleteTrack}
            />
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
      <Dialog
        open={!!dialogText}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Form method="DELETE">
            <TextField
              id="dialog-input-delete"
              name="dialog-input-delete"
              sx={{ display:"none" }}
              value={deleteId}
            />
            <Button type="submit" autoFocus onClick={closeDialog}>
              Confirm
            </Button>
          </Form>
        </DialogActions>
      </Dialog>
    </Box>    
  );
}