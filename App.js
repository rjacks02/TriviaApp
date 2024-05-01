import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen.js';
import TriviaScreen from './TriviaScreen.js';
import {useFonts} from "expo-font";

const Stack = createStackNavigator();

const App = () => {
    useFonts({'RobotoMono-Bold': require('./assets/fonts/RobotoMono-Bold.ttf')});
    useFonts({'RobotoMono-Regular': require('./assets/fonts/RobotoMono-Regular.ttf')});

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Trivia" component={TriviaScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;