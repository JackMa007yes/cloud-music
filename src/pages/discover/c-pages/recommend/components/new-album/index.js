import React, { memo, useEffect, useRef } from "react";
import { Carousel } from "antd";
import ThemeHeaderRCM from "@/components/theme-header-rcm/index";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getNewAlbumsAction } from "../../store/actionCreators";
import AlbumCover from "@/components/album-cover";


import { AlbumWrapper } from "./style";

const index = memo(() => {
  const { newAlbums } = useSelector(
    (state) => ({
      newAlbums: state.getIn(["recommend", "newAlbums"]),
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const carouselRef = useRef();
  useEffect(() => {
    dispatch(getNewAlbumsAction(10, 1));
  }, [dispatch]);

  return (
    <AlbumWrapper>
      <ThemeHeaderRCM title="新碟上架"></ThemeHeaderRCM>
      <div className="content">
        <div
          className="arrow arrow-left sprite_02"
          onClick={(e) => carouselRef.current.prev()}
        ></div>
        <div className="album">
          <Carousel dots={false} ref={carouselRef}>
            {[0, 1].map((item) => {
              return (
                <div key={item} className="page">
                  {newAlbums.slice(item * 5, (item + 1) * 5).map((item) => {
                    return (
                        <AlbumCover key={item.id} info={item}/>
                    );
                  })}
                </div>
              );
            })}
          </Carousel>
        </div>
        <div
          className="arrow arrow-right sprite_02"
          onClick={(e) => carouselRef.current.next()}
        ></div>
      </div>
    </AlbumWrapper>
  );
});

export default index;
