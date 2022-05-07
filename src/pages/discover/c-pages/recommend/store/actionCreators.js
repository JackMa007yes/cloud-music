import * as actionTypes from "./constants";
import { 
  getTopBanners, 
  getHotRecommend,
  getNewAlbum,
  getTopList,
  getArtistList
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

const changeUpListAction = (res) => ({
  type: actionTypes.CHANGE_UP_LIST,
  topUpList: res.playlist
})

const changeNewListAction = (res) => ({
  type: actionTypes.CHANGE_NEW_LIST,
  topNewList: res.playlist
})

const changeOriginListAction = (res) => ({
  type: actionTypes.CHANGE_ORIGIN_LIST,
  topOriginList: res.playlist
})
const changeSettleSingsAction = (res) => ({
  type: actionTypes.CHANGE_SETTLE_SONGER,
  settleSings: res.artists
})


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

export const getTopListAction = (index) => {
  return dispatch => {
    getTopList(index).then(res => {
      switch(index) {
        case 0:
          dispatch(changeNewListAction(res));
          break;
        case 2:
          dispatch(changeOriginListAction(res));
          break;
        case 3:
          dispatch(changeUpListAction(res));
          break;
        default:
          console.log("其他数据处理");
      }
    })
  }
}
export const getSettleSingers = () => {
  return dispath => {
    getArtistList(5, 5001).then(res => {
      dispath(changeSettleSingsAction(res))
    })
  }
}
