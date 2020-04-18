import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import ActionButton from "../actionButton/ActionButton";
import Context from "../context/Context";
import Sudoku from "../sudoku/Sudoku";

export default function SolvedPuzzles() {
  const context = useContext(Context);
  const [grids, setGrids] = useState([]);

  useEffect(() => {
    const getGrids = async () => {
      const fetched = await context.getAllSudokus();
      setGrids(fetched);
    };
    getGrids();
  }, []);

  return (
    <View style={styles.container}>
      {!grids ? (
        <Text>There are no saved Sudokus.</Text>
      ) : (
        grids.map((grid) => {
          return (
            <React.Fragment>
              <Text>{grid.grid_id}</Text>
            </React.Fragment>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6f7",
    alignItems: "center",
    justifyContent: "center",
  },
});
