import React, { Component } from 'react';
import {View, Dimensions, FlatList, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';

class SituationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: [],
        };
    }


    async getSituations(){
        try {
            const response = await fetch('http://192.168.1.17:8080/sim/question/all');
            const json = await response.json();
            this.setState({
                data: json,
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
    async getListViewItem(item, index){
        this.props.navigation.navigate('SituationsDetail', {
            data: this.state.data,
            name: item.name,
            questionIndex : index
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
                            <TouchableOpacity style={{backgroundColor: "#E9F2F6", padding: 20}}
                                              onPress={this.getListViewItem.bind(this, item, index)}>
                                <Text style={styles.item}> {item.name}</Text>
                                <Text style={styles.item}> {item.detail}</Text>
                            </TouchableOpacity>

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

});

export default SituationScreen;
