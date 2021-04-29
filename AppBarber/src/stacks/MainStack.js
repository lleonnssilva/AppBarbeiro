import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/Preload';
import Login from '../screens/Login';
import Registrar from '../screens/Registrar';
import MainTab from '../stacks/MainTab';
import Barbeiro from '../screens/Barbeiro';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator
        initialRouteName="Preload"
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registrar" component={Registrar} />
        <Stack.Screen name="MainTab" component={MainTab} />
        <Stack.Screen name="Barbeiro" component={Barbeiro} />
    </Stack.Navigator>
);