import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { message } from "antd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Slider } from "antd";
import { PlaybarWrapper, Control, PlayInfo, Operator } from "./style";
import {
  getSongDetailAction,
  changeCurrentLyricIndexAction,
  changePlaySequenceAction,
  changePlaySongAction,
} from "../store/actionCreators";
import {
  getSizeImage,
  formatDate,
  formatMinuteSecond,
  getPlayUrl,
} from "@/utils/format-utils";

const index = memo(() => {
  const [currentTime, setCurrentTime] = useState(0);
  const [frozeTimeUpdate, setFrozeTimeUpdate] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    currentSong,
    currentLyrics,
    currentLyricIndex,
    playList,
    playSequence,
  } = useSelector(
    (state) => ({
      currentSong: state.getIn(["player", "currentSong"]),
      currentLyrics: state.getIn(["player", "currentLyrics"]),
      currentLyricIndex: state.getIn(["player", "currentLyricIndex"]),
      playList: state.getIn(["player", "playList"]),
      playSequence: state.getIn(["player", "playSequence"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const audioRef = useRef();

  useEffect(() => {
    dispatch(getSongDetailAction(167876));
  }, [dispatch]);
  useEffect(() => {
    audioRef.current.src = getPlayUrl(currentSong.id);
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => setIsPlaying(false)); // 浏览器不允许用户操作页面前播放音频，如果播放失败则将isPlaying置为false
    setIsPlaying(true);
  }, [currentSong]);

  const picUrl = currentSong?.al?.picUrl || "";
  const duration = currentSong.dt;
  const formatDuration = formatDate(duration, "mm:ss");
  //   const progress = currentTime / duration * 100

  const playMusic = () => {
    // audioRef.current.src = getPlayUrl(currentSong.id);
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = currentTime / 1000;
    } else {
      audioRef.current.currentTime = currentTime / 1000;
      audioRef.current.play();
    }
  };
  const timeUpdate = (e) => {
    const currentTime = e.target.currentTime;
    !frozeTimeUpdate && setCurrentTime(currentTime * 1000);

    let lrcLength = currentLyrics.length;
    let i = 0;
    for (; i < lrcLength; i++) {
      const lrcTime = currentLyrics[i].time;
      if (currentTime * 1000 < lrcTime) {
        break;
      }
    }
    const finalIndex = i - 1;
    if (finalIndex !== currentLyricIndex) {
      dispatch(changeCurrentLyricIndexAction(finalIndex));
      currentLyrics[finalIndex].content &&
        message.open({
          content: currentLyrics[finalIndex].content,
          key: "lyric",
          duration: 0,
          className: "lyric-message",
        });
    }
  };
  const sliderChange = useCallback((value) => {
    setFrozeTimeUpdate(true);
    setCurrentTime(value);
  }, []);
  const sliderAfterChange = useCallback((value) => {
    setFrozeTimeUpdate(false);
    setCurrentTime(value);
    audioRef.current.currentTime = value / 1000;
  }, []);
  const changeMusic = (tag) => {
    dispatch(changePlaySongAction(tag));
  };
  const handleMusicEnded = () => {
    if (playSequence === 2) {
      setTimeout(() => {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }, 2000);
    } else {
      dispatch(changePlaySongAction(1));
    }
    message.destroy();
  };

  return (
    <PlaybarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button
            className="sprite_playbar btn prev"
            onClick={(e) => changeMusic(-1)}
          ></button>
          <button
            className="sprite_playbar btn play"
            onClick={(e) => playMusic()}
          ></button>
          <button
            className="sprite_playbar btn next"
            onClick={(e) => changeMusic(1)}
          ></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <a href="/#">
              <img src={getSizeImage(picUrl, 35)} alt="" />
            </a>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.name}</span>
              <span className="singer-name">
                {currentSong && currentSong.ar && currentSong.ar[0].name}
              </span>
            </div>
            <div className="progress">
              <Slider
                value={currentTime}
                min={0}
                max={duration}
                tooltipVisible={false}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange}
              />
              <div className="time">
                <span className="now-time">
                  {formatMinuteSecond(currentTime)}
                </span>
                <span className="divider">/</span>
                <span className="total-time">{formatDuration}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={playSequence}>
          <div className="left">
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button
              className="sprite_playbar btn loop"
              onClick={(e) =>
                dispatch(changePlaySequenceAction(playSequence + 1))
              }
            ></button>
            <button className="sprite_playbar btn playlist">
              {playList.length}
            </button>
          </div>
        </Operator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={timeUpdate}
        onEnded={handleMusicEnded}
      ></audio>
    </PlaybarWrapper>
  );
});

export default index;
