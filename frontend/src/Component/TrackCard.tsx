import { useState } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";

type TrackCardProps = {
  filename: string;
}

export default function TrackCard(props: TrackCardProps) {
  const [paused, setPaused] = useState(true);

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
        alt="Contemplative Reptile album cover"
        src="/images/contemplative-reptile.jpg"
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
            Sounds of Nature
          </Typography>
        </div>
        <Stack direction="row" alignItems="center" spacing={1} useFlexGap>
          <IconButton aria-label="Fast rewind" disabled size="small">
            <FastRewindRounded fontSize="small" />
          </IconButton>
          <IconButton
            aria-label={paused ? 'Play music' : 'Pause music'}
            onClick={() => setPaused((val) => !val)}
            sx={{ mx: 1 }}
          >
            {paused ? <PlayArrowRounded /> : <PauseRounded />}
          </IconButton>
          <IconButton aria-label="Fast forward" disabled size="small">
            <FastForwardRounded fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Card>
  )
}