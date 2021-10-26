import React, { memo, useEffect, useCallback } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";

import { message } from "antd";

import ThemeHeaderRcm from "@/components/theme-header-rcm";
import HYPagination from "@/components/pagination/index";
import CommentCard from "@/components/theme-comment";
import CommentForm from "@/components/comment-form";
import { RanKingMainWrapper } from "./style";
import {
  getRanKingListItemAction,
  getRanKingHotCommentAction,
  getRanKingNewCommentAction,
  getRankingCommentTotalAction,
} from "../../store/actionCreators";
import SongItem from "../song-item";
import { formatMinuteSecond } from "@/utils/format-utils.js";
import { sendComment } from "@/services/comment";

function RanKingMain() {
  const dispatch = useDispatch();

  const {
    playCount,
    currentRanKingListId,
    currentRanKingList,
    hotCommentList,
    newCommentList,
    commentTotal,
    currentPage,
    cookie,
  } = useSelector(
    (state) => ({
      playCount: state.getIn([
        "ranking",
        "currentRanKingListTitleInfo",
        "playCount",
      ]),
      currentRanKingListId: state.getIn(["ranking", "currentRanKingListId"]),
      currentRanKingList: state.getIn(["ranking", "currentRanKingList"]),
      hotCommentList: state.getIn(["ranking", "hotCommentList"]),
      newCommentList: state.getIn(["ranking", "newCommentList"]),
      commentTotal: state.getIn(["ranking", "commentTotal"]),
      currentPage: state.getIn(["ranking", "currentPage"]),
      cookie: state.getIn(["loginState", "cookie"]),
    }),
    shallowEqual
  );

  // 歌单的id
  const route = window.location.hash;
  const searchId = route.substr(route.lastIndexOf("=") + 1);
  const listId = searchId || currentRanKingListId;
  const targePageCount = (currentPage - 1) * 20;
  // other hooks
  useEffect(() => {
    dispatch(getRanKingListItemAction(listId));
    dispatch(getRanKingHotCommentAction(listId, 2));
    dispatch(getRanKingNewCommentAction(listId, 20, targePageCount));
  }, [dispatch, listId, targePageCount]);

  // other handle
  const rightSlot = (
    <span>
      播放：<em style={{ color: "#c20c0c" }}>{playCount}</em>次
    </span>
  );

  // 翻页
  const changePage = useCallback(
    (currentPage) => {
      dispatch(getRankingCommentTotalAction(currentPage));
    },
    [dispatch]
  );

  // 评论
  const handleClick = useCallback(() => {
    const inputs = document.getElementById("my-input").value;
    sendComment(2, listId, inputs, cookie).then((res) => {
      if (res.code === 200) {
        message.success("评论成功");
        dispatch(getRanKingNewCommentAction(listId, 20, targePageCount));
      }
    });
  }, [dispatch, listId, targePageCount, cookie]);

  return (
    <RanKingMainWrapper>
      <ThemeHeaderRcm title="歌曲列表" showIcon={false} right={rightSlot} />
      <div className="ranking-main">
        <div className="main-header">
          <div className="sprite_table header-item"></div>
          <div className="sprite_table header-item header-title">标题</div>
          <div className="sprite_table header-item header-time">时长</div>
          <div className="sprite_table header-item header-singer">歌手</div>
        </div>
        <div className="main-list">
          {currentRanKingList &&
            currentRanKingList.map((item, index) => {
              return (
                <SongItem
                  key={item.id}
                  currentRanking={index + 1}
                  className="song_item"
                  coverPic={index < 3 ? item.al.picUrl : ""}
                  duration={formatMinuteSecond(item.dt)}
                  songName={item.name}
                  singer={item.ar[0].name}
                  songId={item.id}
                />
              );
            })}
        </div>
      </div>
      <div className="comment">
        <ThemeHeaderRcm title="评论" showIcon={false} right={false} />
        <div className="comment-control">
          <CommentForm handle={(e) => handleClick(e)} />
        </div>
        <div className="comment-list">
          <ThemeHeaderRcm title="精彩评论" showIcon={false} right={false} />
          {hotCommentList &&
            hotCommentList.map((item, index) => {
              return <CommentCard key={index} info={item} />;
            })}
          <ThemeHeaderRcm title="最新评论" showIcon={false} right={false} />
          {newCommentList &&
            newCommentList.map((item, index) => {
              return <CommentCard key={index} info={item} />;
            })}

          {/* 分页 */}
          <HYPagination
            currentPage={currentPage}
            pageSize={20}
            total={commentTotal}
            onPageChange={(currentPage) => changePage(currentPage)}
          />
        </div>
      </div>
    </RanKingMainWrapper>
  );
}

export default memo(RanKingMain);