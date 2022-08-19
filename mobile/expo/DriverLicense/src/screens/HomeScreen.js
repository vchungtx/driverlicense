import React, {Component} from 'react';
import {View, Dimensions, FlatList, Image, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';

class HomeScreen extends Component {


    render() {
        return (
            <ScrollView style={[styles.container, {
                flexDirection: "column"
            }]}>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <TouchableOpacity
                        style={{flex: 1, justifyContent: "center", alignItems: 'center', margin: 24, aspectRatio: 1}}
                        onPress={() => this.props.navigation.navigate('Test')}>
                        <Image source={require('../../assets/tick.png')}/>
                        <Text style={styles.menuText}>Đề thi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1, justifyContent: "center", alignItems: 'center', margin: 24, aspectRatio: 1}}
                        onPress={() => this.props.navigation.navigate('Chapter')}>
                        <Image source={require('../../assets/edit.png')}/>
                        <Text style={styles.menuText}>Ôn tập theo chương</Text>
                    </TouchableOpacity>

                </View>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <TouchableOpacity
                        style={{flex: 1, justifyContent: "center", alignItems: 'center', margin: 24, aspectRatio: 1}}
                        onPress={() => this.props.navigation.navigate('WrongSituations')}>
                        <Image source={require('../../assets/fog.png')}/>
                        <Text style={styles.menuText}>Luyện tập câu sai</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flex: 1, justifyContent: "center", alignItems: 'center', margin: 24, aspectRatio: 1}}
                        onPress={() => this.props.navigation.navigate('Situations')}>
                        <Image source={require('../../assets/repair.png')}/>
                        <Text style={styles.menuText}>120 tình huống</Text>
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
    menuText: {
        fontWeight: 'bold', fontSize: 20, textAlign: 'center', fontFamily: "sans-serif"
    }

});

export default HomeScreen;
