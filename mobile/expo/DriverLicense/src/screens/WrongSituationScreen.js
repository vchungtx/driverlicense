import React, {Component} from 'react';
import {View, Dimensions, FlatList, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import constants from "../config/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

class WrongSituationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
        };
    }


    async getSituations() {
        try {
            const response = await fetch(constants.BASE_URL + '/sim/question/all');
            const json = await response.json();
            const filteredData = [];
            await AsyncStorage.getItem('questionFalse').then(
                data => {
                    // the string value read from AsyncStorage has been assigned to data
                    console.log("data:" + data);
                    // transform it back to an object
                    data = JSON.parse(data);
                    for (let item of json) {
                        if (data.includes(item.id)) {
                            filteredData.push(item);
                        }
                    }

                }
            );
            this.setState({
                data: filteredData,
            });

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
        this.props.navigation.navigate('SituationsDetail', {
            data: this.state.data,
            name: item.name,
            questionIndex: index,
            changeTitle : true
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
                                    backgroundColor : "#EDEDED" // invisible color
                                }}
                                                  onPress={this.getListViewItem.bind(this, item, index)}>
                                    <View style={{flexDirection : 'row'}}>
                                        <View style={{ flex: 9}}>
                                            <Text style={styles.title}> {item.name}</Text>
                                            <Text style={styles.desc}> {item.detail}</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection : 'row-reverse', alignItems: 'center'}}>
                                            <FontAwesome name="angle-right" size={30} />
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
        fontSize: 24,
        fontWeight: "bold",
        fontFamily: "sans-serif"
    },
    desc: {
        fontSize: 16,
        fontFamily: "sans-serif"
    },


});

export default WrongSituationScreen;
