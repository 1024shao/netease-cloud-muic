import { Map } from "immutable";
import * as actionTypes from "./actionTypes";
const defaultState = Map({
  isVisible: false,
  isLogin: false, // 登录状态
  profile: "",
  token: "",
  cookie: "",
  userDetails: {},
  playRecord: [],
});

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_IS_VISIBLE_STATE:
      return state.set("isVisible", action.isVisible);
    case actionTypes.CHANGE_USER_LOGIN_STATE:
      return state.set("isLogin", action.isLogin);
    case actionTypes.CHANGE_PROFILE_INFO:
      return state.set("profile", action.profile);
    case actionTypes.CHANGE_PROFILE_TOKEN:
      return state.set("token", action.token);
    case actionTypes.CHANGE_PROFILE_COOKIE:
      return state.set("cookie", action.cookie);
    case actionTypes.CHANGE_USER_DETAIL_INFO:
      return state.set("userDetails", action.uid);
    case actionTypes.CHANGE_USER_PLAY_RECORD:
      return state.set("playRecord", action.uid);
    default:
      return state;
  }
}

export default reducer;
