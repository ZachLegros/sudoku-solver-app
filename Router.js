import React from 'react';
import Solver from "./components/solver/SolverHome";
import SolvedPuzzles from "./components/solvedPuzzles/SolvedPuzzles";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from "./RootNavigation";
import GameScanner from './components/solver/GameScanner';

const Stack = createStackNavigator();

export default function Router() {
  return (
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="SolverHome"  screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SolverHome" component={Solver} />
            <Stack.Screen name="SolvedPuzzlesHome" component={SolvedPuzzles} />
            <Stack.Screen name="GameScanner" component={GameScanner} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
