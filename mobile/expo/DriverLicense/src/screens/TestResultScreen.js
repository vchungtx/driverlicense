import React, {Component} from 'react';
import {View, Dimensions, FlatList, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

class TestResultScreen extends Component {
    constructor(props) {
        super(props);
        this.testIndex = props.route.params.testIndex;
        this.state = {
            isLoading: true,
            data: [],
        };
    }

    async componentDidMount() {
        try {
            const testResult = await AsyncStorage.getItem('testResult');
            let result = JSON.parse(testResult)[this.testIndex];
            let totalPoint = 0;
            result.point.forEach(element => {
                totalPoint += element;
            });

            this.setState({data: result.point, totalPoint: totalPoint});
        } catch (error) {
            console.error(error);
        } finally {
            this.setState({
                isLoading: false,
            })
            console.log('isLoading done');
        }

    }


    render() {
        return (
            <View style={{flex: 1, padding: 24}}>
                {this.state.isLoading ? <ActivityIndicator/> : (
                    <View>
                        <Text>Kết quả: {this.state.totalPoint >= 35 ? 'Đạt' : 'Không đạt'}</Text>
                        <Text>Tổng điểm: {this.state.totalPoint}/50 </Text>
                        <FlatList
                            data={this.state.data}
                            renderItem={({item, index}) =>
                                <View>
                                    <Text>Câu {index + 1} </Text>
                                    <View>
                                        <Image source={item > 0 ? require('../../assets/right.png') : require('../../assets/wrong.png')}
                                               style={{width: 20, height : 20}}/>
                                        <Text>{item}/5</Text>
                                    </View>
                                    <View style={{height: 20}}/>
                                </View>
                            }
                            numColumns={2}
                            // keyExtractor={item => item.id}
                        />
                    </View>
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
        fontWeight: "bold"
    },
    desc: {
        fontSize: 14,
        fontWeight: "bold"
    },


});

export default TestResultScreen;
