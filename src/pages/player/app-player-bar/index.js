import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
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

  const picUrl = currentSong?.al?.picUrl || "";
  const duration = currentSong.dt;
  const formatDuration = formatDate(duration, "mm:ss");
  //   const progress = currentTime / duration * 100

  const playMusic = () => {
    audioRef.current.src = getPlayUrl(currentSong.id);
    setIsPlaying(!isPlaying)
    if (isPlaying){
        audioRef.current.pause()
        audioRef.current.currentTime = currentTime / 1000
    } else {
        audioRef.current.currentTime = currentTime / 1000
        audioRef.current.play();
    } 
  };
  const timeUpdate = (e) => {
    !frozeTimeUpdate && setCurrentTime(e.target.currentTime * 1000);
  };
  const sliderChange = useCallback((value) => {
    setFrozeTimeUpdate(true)
    setCurrentTime(value)
  }, []); 
  const sliderAfterChange = useCallback((value) => {
    setFrozeTimeUpdate(false)
    setCurrentTime(value)
    audioRef.current.currentTime = value / 1000;
  }, []);

  return (
    <PlaybarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button className="sprite_playbar btn prev"></button>
          <button
            className="sprite_playbar btn play"
            onClick={(e) => playMusic()}
          ></button>
          <button className="sprite_playbar btn next"></button>
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
      <audio ref={audioRef} onTimeUpdate={timeUpdate}></audio>
    </PlaybarWrapper>
  );
});

export default index;
