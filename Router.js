import React from "react";
import SolverHome from "./components/solver/SolverHome";
import SolvedPuzzles from "./components/solvedPuzzles/SolvedPuzzles";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./RootNavigation";
import GameScanner from "./components/solver/GameScanner";
import Result from "./components/solver/Result";
import SolvedSudoku from "./components/solvedPuzzles/SolvedSudoku";

const Stack = createStackNavigator();

export default function Router() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="SolverHome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SolverHome" component={SolverHome} />
        <Stack.Screen name="SolvedPuzzlesHome" component={SolvedPuzzles} />
        <Stack.Screen name="GameScanner" component={GameScanner} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="SolvedSudoku" component={SolvedSudoku} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
