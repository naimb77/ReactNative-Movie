import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import Favorites from './Components/Favorites'
import StackNavigator from './Components/StackNavigator';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export default function App(){
  return (
      <NavigationContainer>
        <StatusBar
          hidden
        />
        <Tab.Navigator
          initialRouteName='Home Page'
          barStyle={{backgroundColor: 'whitesmoke'}}>
          <Tab.Screen
            name="Home Page"
            component={HomePage}
            options={
              {
                tabBarIcon: () => (<MaterialCommunityIcons name='home-outline' color='black' size={24}/>)
              }
            }
          />
          <Tab.Screen
            name="Movies Page"
            component={StackNavigator}
            options={
              {
                tabBarIcon: () => (<MaterialCommunityIcons name='movie' color='black' size={24}/>)
              }
            }
          />
          <Tab.Screen
            name="Favorite Page"
            component={Favorites}
            options={
              {
                tabBarIcon: () => (<MaterialCommunityIcons name='star' color='black' size={24}/>)
              }
            }
          />
          <Tab.Screen
            name="About Page"
            component={AboutPage}
            options={
              {
                tabBarIcon: () => (<MaterialCommunityIcons name='information-outline' color='black' size={24}/>)
              }
            }
          />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
