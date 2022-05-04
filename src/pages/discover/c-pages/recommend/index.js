import React, { memo, useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getTopBannerAction } from "./store/actionCreators";

const Recommend = (props) => {
  const dispatch = useDispatch();
  const { topBanners } = useSelector((state) => ({
    topBanners: state.recommend.topBanners,
  }), shallowEqual);

  useEffect(() => {
    dispatch(getTopBannerAction());
  }, [dispatch]);

  return <h1>{JSON.stringify(topBanners)}</h1>;
};

export default memo(Recommend);
