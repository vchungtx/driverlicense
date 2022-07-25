import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, Button, SafeAreaView, Alert, ScrollView, Text, Pressable} from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import FontAwesome from "react-native-vector-icons/FontAwesome";

const {height, width} = Dimensions.get('window');

class SituationDetailScreen extends Component {

    constructor(props) {
        super(props);
        this.onUpdatePosition = this.onUpdatePosition.bind(this);
        console.log('data:' + props.route.params.data);
        this.state = {
            checked: false,
            outOfBoundItems: [],
            questionIndex: props.route.params.questionIndex,
            item: props.route.params.data[props.route.params.questionIndex],

        };

    }

    onUpdatePosition(positionMillis) {
        console.log('onUpdatePosition:' + positionMillis);
        this.setState({positionMillis: positionMillis})
    }

    checkPoint = async () => {
        console.log('checkPoint:');
        if (!this.state.checked) {
            this.setState({checked: true});
            const checkPointPosition = this.state.positionMillis / 1000;
            const item = this.state.item;
            let startPoint = item.startPoint;
            let endPoint = item.endPoint;

            if (checkPointPosition < startPoint || checkPointPosition > endPoint) {
                this.setState({point: 0})
            } else {
                let durationPoint = (endPoint - startPoint) / 5;
                let durationCheck = checkPointPosition - startPoint;
                let pointCheck = Math.trunc(durationCheck / durationPoint);
                this.setState({point: (5 - pointCheck)})
            }
        }

    }

    pressNext = async () => {
        const data = this.props.route.params.data;

        console.log('pressNext:' + this.state.questionIndex);
        if (this.state.questionIndex < data.length - 1) {
            const nextItem = data[this.state.questionIndex + 1];
            this.props.navigation.setOptions({title: nextItem.name});
            this.setState({
                checked: false,
                questionIndex: this.state.questionIndex + 1,
                item: nextItem
            })

        }
    }

    pressPrev = async () => {
        const data = this.props.route.params.data;

        console.log('pressPrev:' + this.state.questionIndex);
        if (this.state.questionIndex >  0) {
            const prevItem = data[this.state.questionIndex - 1];
            this.props.navigation.setOptions({title: prevItem.name});
            this.setState({
                checked: false,
                questionIndex: this.state.questionIndex - 1,
                item: prevItem
            })

        }
    }

    render() {
        const data = this.props.route.params.data;
        return (

            <SafeAreaView style={styles.container}>
                <ScrollView style={{flex: 1}}>
                    <VideoPlayer
                        height={width * 3 / 4}
                        width={width}
                        videoUri={this.state.item.url}
                        item={this.state.item}
                        outOfBoundItems={this.state.outOfBoundItems}
                        onUpdatePosition={this.onUpdatePosition}
                    />
                    <Button
                        style={styles.buttonSpace}
                        title="Space"
                        onPress={this.checkPoint}
                    />
                    <Text>Ấn space khi phát hiện tình huống nguy hiểm</Text>
                    <View style={{
                        flexDirection: "row",
                        height: 50,
                        width: "100%",
                        backgroundColor: "black",
                        marginTop: 20
                    }}>
                        <Pressable style={{backgroundColor: "red", flex: 1, height: "100%"}} onPress={this.pressPrev}>
                            <View>
                                <FontAwesome name="step-backward" size={18} color="#fff"/>
                            </View>
                        </Pressable>
                        <View style={{backgroundColor: "green", flex: 1, height: "100%", justifyContent: "center"}}>
                            <Text>{this.state.questionIndex + 1}/{data.length} </Text>
                        </View>
                        <Pressable style={{backgroundColor: "blue", flex: 1, height: "100%"}} onPress={this.pressNext}>
                            <View>
                                <FontAwesome name="step-forward" size={18} color="#fff"/>
                            </View>
                        </Pressable>

                    </View>
                    <Text>{this.state.checked ? this.state.point + "/5" : ""}</Text>
                </ScrollView>
            </SafeAreaView>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    buttonSpace: {
        margin: 500,
    },

});

export default SituationDetailScreen;
