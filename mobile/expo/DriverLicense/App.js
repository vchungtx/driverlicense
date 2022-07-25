// In App.js in a new project

import * as React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import SituationScreen from './src/screens/SituationScreen';
import SituationDetailScreen from './src/screens/SituationDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: 'Thi mô phỏng lái xe' }}
                />
                <Stack.Screen
                    name="Situations" component={SituationScreen}
                    options={{ title: '120 tình huống' }}/>
                <Stack.Screen
                    name="SituationsDetail" component={SituationDetailScreen} options={({ route }) => ({ title: route.params.name })}
                />
            </Stack.Navigator>
        </NavigationContainer>

    );
}
