import React, {Component} from 'react';
import {View, Dimensions, FlatList, Image, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';

class HomeScreen extends Component {


    render() {
        return (
            <ScrollView style={[styles.container, {
                flexDirection: "column"
            }]}>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <TouchableOpacity style={{flex: 1, justifyContent: "center", alignItems: 'center', margin: 24, aspectRatio: 1}}>
                        <Image source={require('../../assets/tick.png')}/>
                        <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Đề thi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, justifyContent: "center", alignItems: 'center', margin: 24, aspectRatio: 1}}>
                        <Image source={require('../../assets/edit.png')}/>
                        <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Ôn tập theo chương</Text>
                    </TouchableOpacity>

                </View>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <TouchableOpacity style={{flex: 1, justifyContent: "center", alignItems: 'center', margin: 24, aspectRatio: 1}}>
                        <Image source={require('../../assets/fog.png')}/>
                        <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Luyện tập câu sai</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1, justifyContent: "center", alignItems: 'center', margin: 24, aspectRatio: 1}}
                        onPress={() => this.props.navigation.navigate('Situations')}>
                        <Image source={require('../../assets/repair.png')}/>
                        <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>120 tình huống</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
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
