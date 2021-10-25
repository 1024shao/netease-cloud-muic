import React, { memo } from "react";

import { Pagination } from "antd";
import { PaginationWrapper } from "./style";

export default memo(function HYPagination(props) {
  const { currentPage, total, onPageChange } = props;

  // render function
  function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return (
        <button className="control sprite_button2 prev"> &lt; 上一页</button>
      );
    }
    if (type === "next") {
      return (
        <button className="control sprite_button2 next">下一页 &gt;</button>
      );
    }
    return originalElement;
  }

  return (
    <PaginationWrapper>
      <Pagination
        className="pagination"
        size="small"
        current={currentPage}
        defaultCurrent={1}
        total={total}
        pageSize={20}
        showSizeChanger={false}
        itemRender={itemRender}
        onChange={onPageChange}
      />
    </PaginationWrapper>
  );
});
