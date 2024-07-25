import { useEffect, useState } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import SkipNext from "@mui/icons-material/SkipNext";
import SkipPrevious from "@mui/icons-material/SkipPrevious";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";

type TrackCardProps = {
  filename: string;
  id: string;
  externalPaused?: boolean;
  playOnClick?: () => void;
  skipNext?: () => void;
  skipPrevious?: () => void;
}

function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function TrackCard(props: TrackCardProps) {
  const [paused, setPaused] = useState(true);
  const rndInt = randomIntFromInterval(1, 3);
  useEffect(() => {
    if (props.externalPaused !== undefined) {
      setPaused(props.externalPaused);
    }
  }, [props.externalPaused]);

  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        width: { xs: '100%', sm: 'auto' },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        gap: 2,
      }}
    >
      <CardMedia
        component="img"
        width="100"
        height="100"
        alt={`${props.id}-img`}
        src={`a${rndInt}.png`}
        sx={{
          width: { xs: '100%', sm: 100 },
        }}
      />
      <Stack direction="column" alignItems="center" spacing={1} useFlexGap>
        <div>
          <Typography color="text.primary" fontWeight="semiBold">
            {props.filename}
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight="medium"
            textAlign="center"
            sx={{ width: '100%' }}
          >
            {props.id}
          </Typography>
        </div>
        <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
          <IconButton id="track-card-previous" aria-label="Previous skip" size="small"
            onClick={() => { if (props.skipPrevious) props.skipPrevious(); }}
          >
            <SkipPrevious fontSize="small" />
          </IconButton>
          <IconButton id="track-card-rewind" aria-label="Fast rewind" size="small">
            <FastRewindRounded fontSize="small" />
          </IconButton>
          <IconButton
            id="track-card-play-pause"
            aria-label={paused ? 'Play music' : 'Pause music'}
            onClick={props.playOnClick ? props.playOnClick : () => setPaused((val) => !val)}
            sx={{ mx: 1 }}
          >
            {paused ? <PlayArrowRounded /> : <PauseRounded />}
          </IconButton>
          <IconButton id="track-card-fastfoward" aria-label="Fast forward" size="small">
            <FastForwardRounded fontSize="small" />
          </IconButton>
          <IconButton id="track-card-next" aria-label="Next skip" size="small"
            onClick={() => { if (props.skipNext) props.skipNext(); }}
          >
            <SkipNext fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  )
}