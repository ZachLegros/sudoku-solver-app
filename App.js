import React from "react";
import BottomBar from "./components/bottomBar/BottomBar";
import TopBar from "./components/topBar/TopBar";
import GlobalStates from "./components/context/GlobalStates";
import Router from "./Router";

export default function App() {
  return (
    <GlobalStates>
      <TopBar />
      <Router />
      <BottomBar />
    </GlobalStates>
  );
}
