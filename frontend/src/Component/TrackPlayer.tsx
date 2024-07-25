import { useEffect, useState } from 'react'
import WaveSurfer from 'wavesurfer.js';
import axios from 'axios';

import "./waveform.css";

type TrackPlayerProps = {
  name: string;
  url: string;
}

export default function TrackPlayer(props: TrackPlayerProps) {
  const [url, setUrl] = useState("");

  const [wavesurfer, setWavesurfer] = useState<WaveSurfer|null>(null)

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secondsRemainder = Math.round(seconds) % 60
    const paddedSeconds = `0${secondsRemainder}`.slice(-2)
    return `${minutes}:${paddedSeconds}`
  }

  useEffect(() => {
    // set once
    const canvas = document.createElement('canvas');
    // canvas.style.cssText = "display:contents;";
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
    });

    // Play/pause on click
    ws.on('interaction', () => {
      ws.playPause()
    });

    const hover = document.querySelector('#hover') as any;
    const wf = document.querySelector('#waveform') as Element;
    wf.addEventListener('pointermove', (e: any) => (hover.style.width = `${e.offsetX}px`));

    const timeEl = document.querySelector('#time') as Element;
    const durationEl = document.querySelector('#duration') as Element;
    ws.on('decode', (duration) => (durationEl.textContent = formatTime(duration)))
    ws.on('timeupdate', (currentTime) => (timeEl.textContent = formatTime(currentTime)))

    setWavesurfer(ws);
  }, []);

  useEffect(() => {
    setUrl(props.url);

    async function fetchSong() {
      const jwt = sessionStorage.getItem("jwt");
      const res = await axios.get(url, {
        headers: {
          "Authorization": `Bearer ${jwt}`
        },
        responseType: "blob"
      });
      if (wavesurfer) {
        await wavesurfer.loadBlob(res.data);
        const cav = document.querySelectorAll('div#waveform > div') as any;
        cav[3].style.display = "none";

      }
    }
    fetchSong();
  }, [props.url, url, wavesurfer]);

  return (
    <div id="waveform">
      <div id="time">0:00</div>
      <div id="duration">0:00</div>
      <div id="hover"></div>
    </div>
  )
}