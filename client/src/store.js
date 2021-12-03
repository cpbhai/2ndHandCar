import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { clientReducer } from "./reducers/clientReducers";
import { designReducer } from "./reducers/designReducers";
import { authReducer } from "./reducers/userReducers";
const reducer = combineReducers({
  client: clientReducer,
  design: designReducer,
  auth: authReducer,
});
let initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
