import axios from 'axios';
import { useEffect, useState } from 'react';

import WaveSurfer from 'wavesurfer.js';
// @ts-ignore
// import Spectrogram from 'wavesurfer.js/dist/plugins/spectrogram.esm.js'
// @ts-ignore
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js'

import "./waveform.css";

import { EnumHost } from '../type/EnumHost';
import { EnumEndpoint } from '../type/EnumEndpoint';

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const secondsRemainder = Math.round(seconds) % 60
  const paddedSeconds = `0${secondsRemainder}`.slice(-2)
  return `${minutes}:${paddedSeconds}`
}

type TrackPlayerProps = {
  data?: Blob;
  trackId?: string;
  onClick: () => void;
}

export default function TrackWavesurfer(props: TrackPlayerProps) {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null)

  useEffect(() => {
    if (wavesurfer) wavesurfer.destroy();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // Define the waveform gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
    gradient.addColorStop(0, '#656666') // Top color
    gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666') // Top color
    gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
    gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
    gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1') // Bottom color
    gradient.addColorStop(1, '#B1B1B1') // Bottom color

    // Define the progress gradient
    const progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
    progressGradient.addColorStop(0, '#EE772F') // Top color
    progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926') // Top color
    progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
    progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
    progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094') // Bottom color
    progressGradient.addColorStop(1, '#F6B094') // Bottom color

    const ws = WaveSurfer.create({
      container: "#waveform",
      waveColor: gradient,
      progressColor: progressGradient,
      barWidth: 2,
      cursorColor: "#4a74a5",
      height: 80,
      hideScrollbar: true,
      plugins: [
        Hover.create({
          lineColor: '#ff0000',
          lineWidth: 2,
          labelBackground: '#555',
          labelColor: '#fff',
          labelSize: '11px',
        }),
        // Spectrogram.create({
        //   labels: true,
        //   height: 80,
        //   splitChannels: true,
        // }),
      ]
    });

    // Play/pause on click
    ws.on('interaction', () => {
      ws.playPause();
    });

    const hover = document.querySelector('#hover') as any;
    const wf = document.querySelector('#waveform') as Element;
    wf.addEventListener('pointermove', (e: any) => (hover.style.width = `${e.offsetX}px`));

    const timeEl = document.querySelector('#time') as Element;
    const durationEl = document.querySelector('#duration') as Element;
    ws.on('decode', (duration) => (durationEl.textContent = formatTime(duration)))
    ws.on('timeupdate', (currentTime) => (timeEl.textContent = formatTime(currentTime)))

    const rewindEl = document.querySelector("#track-card-rewind") as any;
    const ffEl = document.querySelector("#track-card-fastfoward") as any;
    const pp = document.querySelector("#track-card-play-pause") as any;
    rewindEl.onclick = () => {
      ws.skip(-30);
    }
    ffEl.onclick = () => {
      ws.skip(30)
    }
    pp.onclick = () => {
      ws.playPause();
    }

    setWavesurfer(ws);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    async function loadWavesurfer() {
      if (wavesurfer && props.trackId) {
        const jwt = sessionStorage.getItem("jwt");
        const url = `${EnumHost.LOCAL}${EnumEndpoint.TRACK}/${props.trackId}`;
        const res = await axios.get(url, {
          headers: {
            "Authorization": `Bearer ${jwt}`
          },
          responseType: "blob"
        });

        await wavesurfer.loadBlob(res.data);
      }
    }
    loadWavesurfer();
  }, [props.trackId, wavesurfer]);

  return (
    <div id="waveform" onClick={props.onClick}>
      <div id="time">0:00</div>
      <div id="duration">0:00</div>
      <div id="hover"></div>
    </div>
  )
}