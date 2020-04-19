import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import ActionButton from "../actionButton/ActionButton";
import Context from "../context/Context";
import Sudoku from "../sudoku/Sudoku";
import Spinner from "../spinner/Spinner";

function Item({ id, title, solved, original, onSelect }) {
  return (
    <TouchableOpacity onPress={() => onSelect(id)} style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Sudoku solved={solved} original={original} width={150} />
    </TouchableOpacity>
  );
}

export default function SolvedPuzzles() {
  const context = useContext(Context);
  const [grids, setGrids] = useState(null);

  useEffect(() => {
    const getGrids = async () => {
      const fetched = await context.getAllSudokus();
      setGrids(fetched.reverse());
    };
    getGrids();
  }, []);

  if (grids === null) {
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  }

  if (grids.length === 0) {
    return (
      <View style={styles.container}>
        <Text>There are no saved Sudokus.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={grids}
        renderItem={({ item }) => (
          <Item
            id={item.grid_id}
            solved={item.solved}
            original={item.original}
            title={`Sudoku ${item.grid_id}`}
          />
        )}
        keyExtractor={(item) => item.grid_id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 52.5,
    paddingBottom: 65,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
  },
  item: {
    backgroundColor: "#fff",
    flexWrap: "wrap",
    padding: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12.5,
    marginHorizontal: 25,
  },
  title: {
    fontSize: 20,
  },
});
