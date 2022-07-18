// In App.js in a new project

import * as React from 'react';
import  { useEffect, useState } from 'react';
import {  ActivityIndicator, SectionList, Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="120 tình huống"
                onPress={() => navigation.navigate('Situations')}
            />
        </View>
    );
}

function SituationsScreen() {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getSituations = async () => {
        try {
            const response = await fetch('http://192.168.1.17:8080/sim/chapter/all');
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getSituations();
    }, []);
    return (
        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? <ActivityIndicator/> : (

                <SectionList
                    sections={data}
                    keyExtractor={(item, index) => item + index}
                    // renderItem={({ item }) => <Item title={item} />}
                    renderSectionHeader={({ section: { name } }) => (
                        <Text style={styles.header}>{name}</Text>
                    )}
                />


            )}
        </View>
    );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: 'Thi mô phỏng lái xe' }}
            />
            <Stack.Screen
                name="Situations" component={SituationsScreen}
                options={{ title: '120 tình huống' }}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;