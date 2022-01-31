import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Movies from './Movies';
import MovieDetails from './MovieDetails';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{ headerTitleAlign: 'center', headerStyle: { backgroundColor: '#383A6A' } }}
            defaultScreenOptions={{ title: 'Aligned Center', headerTitleAlign: 'center', headerStyle: { borderColor: '#383A6A' } }}
        >
            <Stack.Screen
                name='Movies'
                component={Movies}
                options={{
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: '#383A6A',
                    },
                    headerShadowVisible: false, // applied here
                    headerBackTitleVisible: false,
                }}
            />

            <Stack.Screen
                name='Details'
                component={MovieDetails}
                options={{
                    headerTintColor: 'white',
                    headerStyle: {
                        backgroundColor: '#383A6A',
                    },
                    headerShadowVisible: false, // applied here
                    headerBackTitleVisible: false,
                }}
            />
        </Stack.Navigator>
    )
}
export default StackNavigator