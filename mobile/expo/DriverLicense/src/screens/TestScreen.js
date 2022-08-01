import React, {Component} from 'react';
import {View, Dimensions, FlatList, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from "../config/constants";

class TestScreen extends Component {
    constructor(props) {

        super(props);
        this.state = {
            isLoading: true,
            data: [],
            questions: [],
        };
    }


    async getSituations() {
        try {
            const response = await fetch(constants.BASE_URL + 'sim/test/all');
            const json = await response.json();
            this.setState({
                data: json.testList,
                questions: json.questionList,
            });
            const testResult = await AsyncStorage.getItem('testResult');
            console.log('testResult:' + JSON.stringify(testResult));
            if (testResult != null) {
                let objResult = JSON.parse(testResult);
                this.setState({
                    testResult: objResult,
                });
            } else {
                let testResult = [];
                json.testList.forEach(element => {
                    let initResult = {
                        'totalDone': [],
                        'correct': [],
                        'wrong': [],
                        'point': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    }
                    testResult.push(initResult);
                });
                await AsyncStorage.setItem('testResult', JSON.stringify(testResult));
                this.setState({
                    testResult: testResult,
                });


            }
        } catch (error) {
            console.error(error);
        } finally {
            this.setState({
                isLoading: false,
            })
            console.log('isLoading done');
        }
    }

    //handling onPress action
    async getListViewItem(item, index) {
        const questions = this.state.questions;
        console.log('questions:' + JSON.stringify(questions));
        console.log('item:' + JSON.stringify(item));
        let questionId = item.questions.split(',');
        const questionIdNumb = [];
        questionId.forEach(str => {
            questionIdNumb.push(Number(str));
        });
        console.log('questionId:' + questionId);
        let questionToTest = [];
        questions.forEach(element => {
            console.log('element:' + JSON.stringify(element));
            if (questionIdNumb.includes(element.id)) {

                questionToTest.push(element)
            }

        });
        console.log('questionToTest:' + questionToTest.toString());
        this.props.navigation.navigate('SituationsDetail', {
            data: questionToTest,
            name: item.name,
            questionIndex: 0,
            testIndex: index
        })
    }

    componentDidMount() {
        console.log('componentDidMount');
        this.getSituations();
    }


    render() {
        return (
            <View style={{flex: 1, padding: 24}}>
                {this.state.isLoading ? <ActivityIndicator/> : (
                    <FlatList
                        data={this.state.data}
                        renderItem={({item, index}) =>
                            <View>
                                <TouchableOpacity style={{
                                    padding: 10, borderRadius: 10,
                                    backgroundColor: "#EDEDED" // invisible color
                                }}
                                                  onPress={this.getListViewItem.bind(this, item, index)}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={{flex: 9}}>
                                            <Text style={styles.title}> {item.name}</Text>
                                            <View style={{flexDirection : 'row'}}>
                                                <Text
                                                    style={styles.desc}> {this.state.testResult[index].totalDone.length}/{item.questions.split(',').length} câu</Text>
                                                <View style={{flex: 1, flexDirection : 'row', justifyContent : 'center', alignItems : 'center'}}>
                                                    <Image source={require('../../assets/right.png')}
                                                    style={{width: 20, height : 20}}/>
                                                    <Text style={styles.desc}> {this.state.testResult[index].correct.length} </Text></View>
                                                <View  style={{flex: 1, flexDirection : 'row', justifyContent : 'center', alignItems : 'center'}}>
                                                    <Image source={require('../../assets/wrong.png')}
                                                           style={{width: 20, height : 20}}/>
                                                    <Text style={styles.desc}> {this.state.testResult[index].wrong.length} </Text></View>
                                            </View>
                                        </View>
                                        <View style={{flex: 1, flexDirection: 'row-reverse', alignItems: 'center'}}>
                                            <FontAwesome name="angle-right" size={30}/>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{height: 20}}/>
                            </View>
                        }
                        keyExtractor={item => item.id}
                    />

                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily : "sans-serif"
    },
    desc: {
        flex: 1,
        fontSize: 16,
        // fontWeight: "bold",
        fontFamily : "sans-serif"
    },


});

export default TestScreen;
