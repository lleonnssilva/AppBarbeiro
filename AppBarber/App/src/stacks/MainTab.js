import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBarCustomizado from '../components/TabBarCustomizado';

import Home from '../screens/Home';
import Busca from '../screens/Busca';
import Agendamentos from '../screens/Agendamentos';
import Favoritos from '../screens/Favoritos';
import Perfil from '../screens/Perfil';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

export default () => (

    <Tab.Navigator tabBar={props=><TabBarCustomizado {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Busca" component={Busca} />
        <Tab.Screen name="Agendamentos" component={Agendamentos} />
        <Tab.Screen name="Favoritos" component={Favoritos} />
        <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  
);