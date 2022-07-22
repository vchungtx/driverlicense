// In App.js in a new project

import * as React from 'react';
import  { useEffect, useState } from 'react';
import {  StyleSheet, ActivityIndicator, SectionList, Button, View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
    return (
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Text>Home Screen</Text>
        //     <Button
        //         title="120 tình huống"
        //         onPress={() => navigation.navigate('Situations')}
        //     />
        // </View>
        <View style={[styles.container, {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column"
        }]}>
            <View style={{ flex: 1, flexDirection: "row" }} >
                <View style={{ flex: 1,  justifyContent: "center" , margin : 24}} >
                    <Image source={require('./assets/tick.png')} />
                    <Text>Đề thi</Text>
                </View>
                <View style={{ flex: 1,  justifyContent: "center" , margin : 24}} >
                    <Image source={require('./assets/edit.png')} />
                    <Text>Ôn tập theo chương</Text>
                </View>

            </View>
            <View style={{ flex: 1, flexDirection: "row" }} >
                <View style={{ flex: 1,  justifyContent: "center" , margin : 24}} >
                    <Image source={require('./assets/fog.png')} />
                    <Text>Luyện tập câu sai</Text>
                </View>
                <View style={{ flex: 1,  justifyContent: "center" , margin : 24}} >
                    <TouchableOpacity style={{backgroundColor: "#E9F2F6", padding: 20}} onPress={() => navigation.navigate('Situations')}>
                    <Image source={require('./assets/repair.png')} />
                    <Text>120 tình huống</Text>
                    </TouchableOpacity>
                </View>

            </View>

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
    let sections = [];
    for (let i = 0; i < data.length; i++){
        let chapter = {"title" : data[i].name, "data" : data[i].simQuestions}
        sections.push(chapter);
    }
    return (
        <View style={{ flex: 1, padding: 24 }}>
            {isLoading ? <ActivityIndicator/> : (

                <SectionList
                    sections={sections}
                    renderItem={({item})=>(
                        <Text style={styles.taskItem}>{item.name}</Text>
                    )}
                    renderSectionHeader={({section})=>(
                        <Text style={styles.taskTitle}>{section.title}</Text>
                    )}
                    keyExtractor={item=>item.id}
                    stickySectionHeadersEnabled
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    taskItem:{
        padding: 10,
        marginVertical: 15,
        fontSize: 16
    },
    taskTitle:{
        backgroundColor: "#ffffff",
        fontSize: 20,
        fontWeight: "bold",
        padding: 10,
        elevation: 4,
        margin: 10,
        marginBottom: 0,
        borderRadius: 10
    }
});
export default App;