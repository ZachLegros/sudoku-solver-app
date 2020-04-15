import React, { useState } from "react";
import Context from "./Context";

const GlobalStates = props => {
  const [solverActive, setSolverActive] = useState(false);

  return (
    <Context.Provider
      value={{
        solverActive: [solverActive, setSolverActive]
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default GlobalStates;
