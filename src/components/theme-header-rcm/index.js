import React, { memo } from "react";
import { HeaderWrapper } from "./style";
import PropTypes from "prop-types"

const index = memo((props) => {
  const { title, keywords = [] } = props;
  return (
    <HeaderWrapper className="sprite_02">
      <div className="left">
        <h3 className="title">{title}</h3>
        <div className="keyword">
            {
                keywords.map((item, index) => {
                    return (
                        <div className="item" key={index}>
                            <a className="link" href="todo">{item}</a>
                            <span className="divider">|</span>
                        </div>
                    )
                })
            }
        </div>
      </div>
      <div className="right">
        <a href="todo">更多</a>
        <i className="icon sprite_02"></i>
      </div>
    </HeaderWrapper>
  );
});

index.propTypes = {
    title: PropTypes.string.isRequired,
    keywords: PropTypes.array
}
index.defaultProps = {
    keywords: []
}

export default index;
