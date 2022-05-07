import React, { memo } from "react";

import { PlayerWrapper, PlayerLeft, PlayerRight } from "./style";

const index = memo(() => {
  return (
    <PlayerWrapper>
      <div className="content wrap-v2">
        <PlayerLeft>
          <h2>playrt info</h2>
        </PlayerLeft>
        <PlayerRight>
          <h2>songs</h2>
          <h2>content</h2>
        </PlayerRight>
      </div>
    </PlayerWrapper>
  );
});

export default index;
