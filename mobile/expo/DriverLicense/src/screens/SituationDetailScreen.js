import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Button,
    SafeAreaView,
    Alert,
    ScrollView,
    Text,
    Pressable,
    Image, TouchableOpacity
} from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const {height, width} = Dimensions.get('window');

const LeftQuestionView = (props) => {
    if (props.display) {
        return <TouchableOpacity style={{ flex: 1, height: "100%" , justifyContent : 'center' , marginStart : 20}}
            onPress={props.onPress}>
            <View>
                <FontAwesome name="angle-double-left" size={40}/>
            </View>
        </TouchableOpacity>
    }else {
        return <View style={{ flex: 1, height: "100%" , justifyContent : 'center' , marginStart : 20}}/>
    }
}

class SituationDetailScreen extends Component {

    constructor(props) {
        super(props);
        // this.onUpdatePosition = this.onUpdatePosition.bind(this);
        // this.onFinished = this.onFinished.bind(this);
        this.data = props.route.params.data;
        this.questionIndex = props.route.params.questionIndex;
        this.testIndex = props.route.params.testIndex;
        this.changeTitle = props.route.params.changeTitle;
        this.title = props.route.params.name;
        console.log('data:' + this.data.length);
        console.log('data uri:' + this.data[this.questionIndex].url);

        this.state = {
            checked: false,
            outOfBoundItems: [],
            questionIndex: this.questionIndex,
            item: this.data[this.questionIndex],

        };
        this.playbackInstance = React.createRef();

    }

    async componentDidMount() {
        if (this.props.route.params.testIndex != null){
            this.props.navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity onPress={async ()=>{
                        if (!this.state.checked){
                            await this.checkPoint(0);
                        }
                        this.props.navigation.replace('TestResult', {
                            testIndex: this.testIndex,
                            name: this.title,
                            onGoBack: () => this.props.route.params.onGoBack(),
                        });
                    }}
                    ><Text style={styles.finishBtn}>Kết thúc</Text></TouchableOpacity>
                )})
        }
    }

    onUpdatePosition = async (positionMillis) => {
        console.log('onUpdatePosition:' + positionMillis);
        this.setState({positionMillis: positionMillis})
    }

    onFinished = async () => {
        console.log('onFinished:');
        if (this.testIndex != null) {
            this.pressNext();
        }
    }

    componentWillUnmount() {
        console.log('componentWillUnmount:');
    }

    checkCurrentPoint = async () => {

        if (!this.state.checked) {
            this.setState({checked: true});
            const checkPointPosition = this.state.positionMillis / 1000;
            this.setState({checkPoint : checkPointPosition});
            await this.checkPoint(checkPointPosition);
        }

    }

    checkPoint = async (checkPointPosition) => {
        const index = this.state.questionIndex;
        console.log('checkPointPosition:' + checkPointPosition);
        const item = this.state.item;
        let startPoint = item.startPoint;
        let endPoint = item.endPoint;
        let point = 0;
        if (checkPointPosition < startPoint || checkPointPosition > endPoint) {
            point = 0;

        } else {
            let durationPoint = (endPoint - startPoint) / 5;
            let durationCheck = checkPointPosition - startPoint;
            let pointCheck = Math.trunc(durationCheck / durationPoint);
            point = 5 - pointCheck;
        }
        this.setState({point: point})
        if (this.testIndex != null) {
            await AsyncStorage.getItem('testResult').then(
                data => {
                    // the string value read from AsyncStorage has been assigned to data
                    console.log("data:" + data);
                    // transform it back to an object
                    data = JSON.parse(data);
                    data[this.testIndex].point[index] = point;
                    if (!data[this.testIndex].totalDone.includes(item.id)) {
                        data[this.testIndex].totalDone.push(item.id);
                    }
                    if (point == 0) {
                        if (!data[this.testIndex].wrong.includes(item.id)) {
                            data[this.testIndex].wrong.push(item.id);
                        }
                        if (data[this.testIndex].correct.includes(item.id)) {
                            data[this.testIndex].correct = data[this.testIndex].correct.filter(function (element) {
                                return element !== item.id
                            })
                        }
                    } else {
                        if (!data[this.testIndex].correct.includes(item.id)) {
                            data[this.testIndex].correct.push(item.id);
                        }
                        if (data[this.testIndex].wrong.includes(item.id)) {
                            data[this.testIndex].wrong = data[this.testIndex].wrong.filter(function (element) {
                                return element !== item.id
                            })
                        }
                    }
                    //save the value to AsyncStorage again
                    AsyncStorage.setItem('testResult', JSON.stringify(data));

                }
            );
        }

        await AsyncStorage.getItem('questionFalse').then(
            data => {
                // the string value read from AsyncStorage has been assigned to data
                console.log("data:" + data);
                if (data == null){
                    data = [];
                }else{
                    // transform it back to an object
                    data = JSON.parse(data);
                }
                if (point == 0) {
                    if (!data.includes(item.id)) {
                        data.push(item.id);
                    }
                } else {
                    if (data.includes(item.id)) {
                        data = data.filter(function (element) {
                            return element !== item.id
                        })
                    }
                }
                //save the value to AsyncStorage again
                AsyncStorage.setItem('questionFalse', JSON.stringify(data));

            }
        );
    }
    pressNext = async () => {
        console.log('pressNext:' + this.state.questionIndex);
        if (!this.state.checked){
            await this.checkPoint(0);
        }
        if (this.state.questionIndex < this.data.length - 1) {
            const nextItem = this.data[this.state.questionIndex + 1];
            if (this.changeTitle){
                this.props.navigation.setOptions({title: nextItem.name});
            }

            this.setState({
                checked: false,
                questionIndex: this.state.questionIndex + 1,
                item: nextItem
            })
            try {
                await this.playbackInstance.current.stopAsync();
                await this.playbackInstance.current.unloadAsync();
                return await this.play(this.playbackInstance.current, nextItem.url);
            } catch (error) {
                console.log('error inside playNext helper method', error.message);
            }
        }else{
            if (this.testIndex != null){
                this.props.navigation.replace('TestResult', {
                    testIndex: this.testIndex,
                    name: this.title,
                    onGoBack: () => this.props.route.params.onGoBack(),
                });
            }
        }
    }

    pressPrev = async () => {
        console.log('pressPrev:' + this.state.questionIndex);
        if (this.state.questionIndex > 0) {
            const prevItem = this.data[this.state.questionIndex - 1];
            if (this.changeTitle){
                this.props.navigation.setOptions({title: prevItem.name});
            }
            this.setState({
                checked: false,
                questionIndex: (this.state.questionIndex - 1),
                item: prevItem
            })
            try {
                await this.playbackInstance.current.stopAsync();
                await this.playbackInstance.current.unloadAsync();
                return await this.play(this.playbackInstance.current, prevItem.url);
            } catch (error) {
                console.log('error inside playNext helper method', error.message);
            }
        }
    }

    // play audio
    play = async (playbackObj, uri) => {
        try {
            return await playbackObj.loadAsync(
                {uri},
                {shouldPlay: true, progressUpdateIntervalMillis: 200}
            );

            return await playbackObj.playFromPositionAsync(0);
        } catch (error) {
            console.log('error inside play helper method', error.message);
        }
    };

    render() {
        return (

            <SafeAreaView style={styles.container}>
                <ScrollView style={{flex: 1}}>
                    <VideoPlayer
                        playbackInstance={this.playbackInstance}
                        height={width * 9 / 16}
                        width={width}
                        videoUri={this.data[this.questionIndex].url}
                        // item={this.state.item}
                        outOfBoundItems={this.state.outOfBoundItems}
                        onUpdatePosition={this.onUpdatePosition}
                        onFinished={this.onFinished}
                    />
                    <TouchableOpacity style={styles.spaceButtonView} onPress={this.checkCurrentPoint}>
                        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Space</Text>
                    </TouchableOpacity>
                    <Text style={{marginStart: 100, marginEnd: 100, marginTop: 10, textAlign: 'center'}}>Ấn space khi
                        phát hiện tình huống nguy hiểm</Text>
                    {this.state.checked ?
                        <View>
                            <View style={{
                                flexDirection: "row",
                                height: 50,
                                width: "100%",
                                marginTop: 20
                            }}>
                                <LeftQuestionView
                                display={this.testIndex == null}
                                onPress={this.pressPrev}/>
                                <View style={{
                                    flex: 2,
                                    height: "100%",
                                    justifyContent: "center",
                                    alignItems: 'center'
                                }}>
                                    <Text>{this.state.questionIndex + 1}/{this.data.length} </Text>
                                </View>
                                <TouchableOpacity style={{
                                    flex: 1,
                                    height: "100%",
                                    marginStart: 20,
                                    flexDirection: 'row-reverse',
                                    alignItems: 'center'
                                }}
                                                  onPress={this.pressNext}>
                                    <View>
                                        <FontAwesome name="angle-double-right" size={40}/>
                                    </View>
                                </TouchableOpacity>

                            </View>

                            <View style={styles.answerView}>
                                <Text>Điểm: {this.state.point + "/5"}</Text>
                                <Text>Thời điểm bắt đầu: {this.state.item.startPoint}</Text>
                                <Text>Thời điểm kết thúc: {this.state.item.endPoint}</Text>
                                <Text>Thời điểm bấm: {this.state.checkPoint}</Text>
                                <Text>{this.state.item.answer}</Text>
                                <Image source={{uri: this.state.item.answerImg}} style={styles.answerImg}/>
                            </View>
                        </View>
                        : <View/>

                    }

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
    spaceButtonView: {
        marginStart: 20,
        marginEnd: 20,
        height: 50,
        backgroundColor: '#815DFF',
        borderRadius: 9,
        justifyContent: "center",
        alignItems: "center"
    },
    answerView: {
        margin: 20
    },
    answerImg: {
        width: "100%",
        aspectRatio: 4 / 3,
        resizeMode: "contain"

    },
    finishBtn:{
        fontSize: 18,
    }

});

export default SituationDetailScreen;
