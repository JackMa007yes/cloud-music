import React, { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import { RecommendWrapper } from "./style";
import ThemeHeaderRCM from "@/components/theme-header-rcm/index";
import SongCover from "@/components/song-cover";
import { getHotRecommendsAction } from "../../store/actionCreators";

const index = memo(() => {
  const { hotRecommends } = useSelector(
    (state) => ({
      hotRecommends: state.getIn(["recommend", "hotRecommends"]),
    }),
    shallowEqual
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHotRecommendsAction(8));
  }, [dispatch]);

  return (
    <RecommendWrapper>
      <ThemeHeaderRCM
        title="热门推荐"
        keywords={["华语", "流行", "摇滚", "民谣", "电子"]}
      ></ThemeHeaderRCM>
      <div className="recommend-list">
        {hotRecommends.map((item, index) => {
          return <SongCover info={item} key={item.id}></SongCover>;
        })}
      </div>
    </RecommendWrapper>
  );
});

export default index;
