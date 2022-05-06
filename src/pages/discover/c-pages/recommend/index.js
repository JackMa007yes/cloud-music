import React, { memo, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Carousel } from "antd";
import { getTopBannerAction } from "./store/actionCreators";
import TopBanner from "./components/top-banner";
import NewAlbum from "./components/new-album";
import RecommendRanking from "./components/recommend-ranking";
import HotRecomand from "./components/hot-recomand/index";

import {
  RecommendWraper,
  Content,
  RecommendLeft,
  RecommendRight,
} from "./style";

const Recommend = (props) => {
  return (
    <RecommendWraper>
      <TopBanner></TopBanner>
      <Content className="wrap-v2">
        <RecommendLeft>
          <HotRecomand></HotRecomand>
          <NewAlbum></NewAlbum>
          <RecommendRanking></RecommendRanking>
        </RecommendLeft>
        <RecommendRight></RecommendRight>
      </Content>
    </RecommendWraper>
  );
};

export default memo(Recommend);
