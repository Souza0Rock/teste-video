import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState, useRef, useEffect } from "react";
import {Teste} from "../service/fetch/index";
import axios from 'axios'

const inter = Inter({ subsets: ["latin"] });

function usePlayerState($videoPlayer) {
  const [playerState, setPlayerState] = useState({
    playing: false,
    percentage: 0,
  });

  useEffect(() => {
    playerState.playing
      ? $videoPlayer.current.play()
      : $videoPlayer.current.pause();
  }, [$videoPlayer, playerState.playing]);

  function toggleVideoPlayer() {
    setPlayerState({
      ...playerState,
      playing: !playerState.playing,
    });
  }

  function handleTimeUpdate() {
    const currentPercentage =
      ($videoPlayer.current.currentTime / $videoPlayer.current.duration) * 100;

    setPlayerState({
      ...playerState,
      percentage: currentPercentage,
    });
  }

  function handlePercentage(e) {
    $videoPlayer.current.currentTime =
      ($videoPlayer.current.duration / 100) * e.target.value;

    setPlayerState({
      ...playerState,
      percentage: e.target.value,
    });
  }

  return {
    playerState,
    toggleVideoPlayer,
    handleTimeUpdate,
    handlePercentage,
  };
}

export default function Home() {

async function Sinistro(){
  try{
    const cachorro = await Teste()
    console.log(cachorro, 'cachorro');
  }
  catch{
    console.log('erro')
  }
}

useEffect(()=> {
  Sinistro() 
},[])
  
  const $videoPlayer = useRef(null);

  const { playerState, toggleVideoPlayer, handleTimeUpdate, handlePercentage } =
    usePlayerState($videoPlayer);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <video
          ref={$videoPlayer}
          src="/teste.mp4"
          onClick={toggleVideoPlayer}
          onTimeUpdate={handleTimeUpdate}
        />

        <div>
          <button onClick={toggleVideoPlayer}>
            {playerState.playing ? "pause" : "play"}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.percentage}
            onChange={(e) => handlePercentage(e)}
          />
        </div>
      </main>
    </>
  );
}
