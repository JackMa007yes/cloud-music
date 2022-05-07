import React, { memo } from "react";
import TopBanner from "./components/top-banner";
import NewAlbum from "./components/new-album";
import RecommendRanking from "./components/recommend-ranking";
import HotRecomand from "./components/hot-recomand/index";
import UserLogin from './components/user-login';
import SettleSinger from './components/settle-singer';
import HotRadio from './components/hot-radio';

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
        <RecommendRight>
        <UserLogin />
          <SettleSinger />
          <HotRadio />
        </RecommendRight>
      </Content>
    </RecommendWraper>
  );
};

export default memo(Recommend);
