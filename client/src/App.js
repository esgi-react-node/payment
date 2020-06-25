import React, { useState, useCallback, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button, { ButtonV2 } from "./components/Button";
import ThemeWrapper from "./components/ThemeWrapper";
import BoardList from "./components/Board";
import BoardContext, { BoardProvider } from "./context/boardContext";

function App() {
  //
  //
  //
  //
  //
  //
  //

  return (
    <div className="App">
      <ThemeWrapper>
        <BoardProvider>
          <BoardList />
        </BoardProvider>
      </ThemeWrapper>
    </div>
  );
}

export default App;
