'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './AudioPlayer.module.css'
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs'
import { FaPlay, FaPause } from 'react-icons/fa'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const audioPlayer = useRef()
  const progressBar = useRef()
  const animationRef = useRef()

  function togglePlayPause() {
    setIsPlaying(prev => !prev)
    if (!isPlaying) {
      audioPlayer.current.play()
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause()
      cancelAnimationFrame(animationRef.current)
    }
  }

  function whilePlaying() {
    progressBar.current.value = audioPlayer.current.currentTime
    changePlayerCurrentTime()
    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  function calculateTime(secs) {
    const minutes = Math.floor(secs / 60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : seconds
    return `${returnedMinutes}:${returnedSeconds}`
  }

  function changeRange() {
    audioPlayer.current.currentTime = progressBar.current.value
    changePlayerCurrentTime()
  }

  function backThirty() {
    progressBar.current.value = +progressBar.current.value - 30
    changeRange()
  }

  function forwardThirty() {
    progressBar.current.value = +progressBar.current.value + 30
    changeRange()
  }

  function changePlayerCurrentTime() {
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`
    )
    setCurrentTime(progressBar.current.value)
  }

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration)
    setDuration(seconds)
    progressBar.current.max = seconds
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

  return (
    <div className={styles.audioPlayer}>
      <audio
        ref={audioPlayer}
        src='https://www.thinknews.com.ng/wp-content/uploads/2020/09/Juice_Wrld_-_Wishing_Well.mp3'
        preload='metadata'
      ></audio>

      <button className={styles.forwardBackward} onClick={backThirty}>
        <BsArrowLeftShort /> 30
      </button>
      <button onClick={togglePlayPause} className={styles.playPause}>
        {isPlaying ? <FaPause /> : <FaPlay className={styles.play} />}
      </button>
      <button className={styles.forwardBackward} onClick={forwardThirty}>
        <BsArrowRightShort /> 30
      </button>

      <div className={styles.currentTime}>{calculateTime(currentTime)}</div>
      <div>
        <input
          type='range'
          defaultValue='0'
          onChange={changeRange}
          ref={progressBar}
          className={styles.progressBar}
        />
      </div>
      <div className={styles.duration}>
        {duration && !isNaN(duration) && calculateTime(duration)}
      </div>
    </div>
  )
}
