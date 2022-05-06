import * as actionTypes from "./constants";
import { 
  getTopBanners, 
  getHotRecommend,
  getNewAlbum
} from "@/services/recommend";

const changeTopBannerAction = (res) => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.banners,
});

const changeHotRecommendAction = (res) => ({
  type: actionTypes.CHANGE_HOT_RECOMMENDS,
  hotRecommends: res.result,
});

const changeNewAlbumsAction = (res) => ({
  type: actionTypes.CHANGE_NEW_ALBUMS,
  newAlbums: res.albums,
});

export const getTopBannerAction = () => {
  return (dispatch) => {
    getTopBanners().then(res => dispatch(changeTopBannerAction(res)));
  };
};

export const getHotRecommendsAction = (limit) => {
  return (dispatch) => {
    getHotRecommend(limit).then(res => dispatch(changeHotRecommendAction(res)));
  };
};

export const getNewAlbumsAction = (limit, offset) => {
  return (dispatch) => {
    getNewAlbum(limit, offset).then(res => dispatch(changeNewAlbumsAction(res)));
  };
};

