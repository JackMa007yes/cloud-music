import styled from 'styled-components';

export const BannerWrapper = styled.div`
  background: url(${props => props.bgImage}) center center/6000px;

  .banner {
    height: 285px;
    background-color: red;

    display: flex;
    position: relative;
  }
`

export const BannerLeft = styled.div`
  width: 730px;
  .banner-item {
    overflow: hidden;
    height: 285px;
    .image {
      width: 100%;
      height: 285px;
    }
  }
  .slick-dots li {
    display: inline-block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    &:hover {
      button {
        background-color: red;
      }
    }
    button {
      margin-top: 8px;
      margin-left: 8px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
  }
  .slick-dots > .slick-active {
    button {
      background-color: red !important;
    }
  }
`

export const BannerRight = styled.a.attrs({
  href: "https://music.163.com/#/download",
  target: "_blank"
})`
  width: 254px;
  height: 285px;
  background: url(${require("@/assets/img/download.png")});
`

export const BannerControl = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  .btn {
    position: absolute;
    top: -30px;
    width: 37px;
    height: 63px;
    background-image: url(${require("@/assets/img/banner_sprite.png")});
    background-color: transparent;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, .1);
    }
  }

  .left {
    left: -68px;
    background-position: 0 -360px;
  }

  .right {
    right: -68px;
    background-position: 0 -508px;
  }
`
