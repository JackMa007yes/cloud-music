import React, { memo, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Carousel } from "antd";
import { getTopBannerAction } from "./store/actionCreators";
import TopBanner from "./components/top-banner";

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
    </RecommendWraper>
  );
};

export default memo(Recommend);
