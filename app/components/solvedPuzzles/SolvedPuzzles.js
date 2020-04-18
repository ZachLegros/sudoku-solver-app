import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
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
        <FlatList
          data={grids}
          renderItem={({ item, index }) => (
            <View
              key={index}
              style={{
                flex: 1,
                width: 150,
                height: 150,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Sudoku
                width={125}
                original={item.original}
                solved={item.solved}
              />
            </View>
          )}
        />
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
