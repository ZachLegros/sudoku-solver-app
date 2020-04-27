import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import Context from "../context/Context";
import Sudoku from "../sudoku/Sudoku";
import Spinner from "../spinner/Spinner";

function Item({ id, title, solved, original, onSelect }) {
  return (
    <TouchableOpacity
      key={id}
      onPress={() => onSelect({ id, title, solved, original })}
      style={styles.item}
    >
      <Text style={styles.title}>{title}</Text>
      <Sudoku solved={solved} original={original} width={150} />
    </TouchableOpacity>
  );
}

export default function SolvedPuzzles({ navigation }) {
  const context = useContext(Context);
  const [grids, setGrids] = useState(null);

  function onSelect(item) {
    navigation.navigate("SolvedSudoku", item);
  }

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
        <Text style={{ color: "#3e4a4f" }}>There are no saved Sudokus.</Text>
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
            onSelect={(item) => {
              onSelect(item);
            }}
          />
        )}
        keyExtractor={(item) => item.grid_id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 65,
    marginBottom: 65,
    justifyContent: "center",
    alignItems: "flex-start",
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
    color: "#3e4a4f",
  },
});
