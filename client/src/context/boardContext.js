import React, { createContext, useState, useEffect, useReducer } from "react";
import { fetchBoards } from "./actions/boards";
import {
  initialState as boardsInitialState,
  reducer as boardsReducer,
} from "./reducers/boards";
import {
  initialState as uiInitialState,
  reducer as uiReducer,
} from "./reducers/ui";

const BoardContext = createContext(null);

function combineReducers(reducerDict) {
  return function (state = {}, action) {
    return Object.keys(reducerDict).reduce((stateGlobal, curr) => {
      let slice = reducerDict[curr](state[curr], action);
      return { ...stateGlobal, [curr]: slice };
    }, state);
  };
}
/**
 * => {
 *  boards: {boards: [], lists: {}},
 *  ui : {selectedBoard: undefined},
 *  ui : {selectedBoard: undefined},
 *  ui : {selectedBoard: undefined},
 *  ui : {selectedBoard: undefined},
 * }
 */

const reducers = combineReducers({
  boards: boardsReducer,
  ui: uiReducer,
});

const initialState = {
  boards: boardsInitialState,
  ui: uiInitialState,
};

export const BoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducers, initialState);

  useEffect(() => {
    fetchBoards().then((data) => {
      dispatch({
        type: "RECEIVE_BOARDS",
        payload: data,
      });
    });
  }, []);

  return (
    <BoardContext.Provider value={{ state, dispatch }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContext;
