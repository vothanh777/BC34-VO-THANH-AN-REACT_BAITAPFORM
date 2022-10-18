import { combineReducers } from "redux";
import { createStore } from "redux";

import { BaiTapFormReducer } from "./reducer/BaiTapFormReducer";

export const rootReducer = combineReducers({
  BaiTapFormReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
