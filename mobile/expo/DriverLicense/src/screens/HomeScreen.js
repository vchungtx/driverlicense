import React, { Component } from 'react';
import {View, Dimensions, FlatList, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';

class HomeScreen extends Component {



    render() {
        return (
            <View style={[styles.container, {
                flexDirection: "column"
            }]}>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <View style={{flex: 1, justifyContent: "center", margin: 24}}>
                        <Image source={require('../../assets/tick.png')}/>
                        <Text>Đề thi</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: "center", margin: 24}}>
                        <Image source={require('../../assets/edit.png')}/>
                        <Text>Ôn tập theo chương</Text>
                    </View>

                </View>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <View style={{flex: 1, justifyContent: "center", margin: 24}}>
                        <Image source={require('../../assets/fog.png')}/>
                        <Text>Luyện tập câu sai</Text>
                    </View>
                    <View style={{flex: 1, justifyContent: "center", margin: 24}}>
                        <TouchableOpacity style={{backgroundColor: "#E9F2F6", padding: 20}}
                                          onPress={() => this.props.navigation.navigate('Situations')}>
                            <Image source={require('../../assets/repair.png')}/>
                            <Text>120 tình huống</Text>
                        </TouchableOpacity>
                    </View>

                </View>

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

export default HomeScreen;
