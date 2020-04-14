import React, { useState } from "react";
import Context from "./Context";

const GlobalStates = props => {


  return (
    <Context.Provider
      value={{
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default GlobalStates;
