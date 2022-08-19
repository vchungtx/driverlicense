import React, {Component} from 'react';
import {View, Dimensions, FlatList, Image, Text, BackHandler, StyleSheet, ActivityIndicator} from 'react-native';
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
        BackHandler.addEventListener('hardwareBackPress', ()=>{
            this.props.route.params.onGoBack();
            this.props.navigation.pop();
            return true;
        });
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
                        <Text style={styles.result}>Kết quả: {this.state.totalPoint >= 35 ? 'Đạt' : 'Không đạt'}</Text>
                        <Text style={styles.point}>Tổng điểm: {this.state.totalPoint}/50 </Text>
                        <FlatList
                            data={this.state.data}
                            renderItem={({item, index}) =>
                                <View style={{width: '50%', marginTop: 5}}>
                                    <Text style={styles.title}>Câu {index + 1} </Text>
                                    <View style={{flexDirection: 'row' , alignItems : 'center'}}>
                                        <View style={{width: 50, height : 50, backgroundColor: 'white', justifyContent : 'center', alignItems: 'center',}}>
                                        <Image source={item > 0 ? require('../../assets/right.png') : require('../../assets/wrong.png')}
                                               style={{width: 20, height : 20}} />
                                        </View>
                                        <Text style={styles.desc}>{item}/5</Text>
                                    </View>
                                    <View style={{height: 15}}/>
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
    result: {
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: "sans-serif"
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        fontFamily: "sans-serif",
        marginBottom : 5
    },
    desc: {
        fontSize: 16,
        fontFamily: "sans-serif",
        marginStart : 10
    },
    point: {
        fontSize: 16,
        fontFamily: "sans-serif",
        marginTop : 5,
        marginBottom : 5
    },


});

export default TestResultScreen;
