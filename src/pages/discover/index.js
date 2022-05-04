import React, { memo, useEffect } from "react";

import { dicoverMenu } from "@/const/local-data";
import { DiscoverWrapper, TopMenu } from "./style.js";
import { NavLink } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import request  from "../../services/axios.js";

const discover = memo((props) => {
  const { route } = props;

  useEffect(() => {
      request({
          url: '/banner'
      })
  }, [])

  return (
    <DiscoverWrapper>
      <div className="top">
        <TopMenu className="wrap-v1">
          {dicoverMenu.map((item, index) => {
            return (
              <div className="item" key={item.title}>
                <NavLink to={item.link}>{item.title}</NavLink>
              </div>
            );
          })}
        </TopMenu>
      </div>
      {renderRoutes(route.routes)}
    </DiscoverWrapper>
  );
});

export default discover;
