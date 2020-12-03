import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    Alert,
    ActivityIndicator,
    StatusBar,
    Dimensions,
    Image,
    FlatList,
    TextInput, Platform
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from "../src/Colors";
import NetInfo from '../node_modules/@react-native-community/netinfo';
import * as Constants from '../src/Constants';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { postFunction, getFunction } from '../src/Network';
import Modal from '../node_modules/react-native-modalbox';



export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            loading: false,
            isConnected: Boolean,
            dataSource: [],
            value: '',
            newData: []
        };
    }

    componentDidMount = async () => {

            NetInfo.fetch().then(state => {
                this.setState({
                  isConnected: state.isConnected,
                });

                setTimeout(() => { 
                  if (this.state.isConnected == false) {
                    this._toastWithDurationGravityOffsetHandler("Please check your internet connection")
                  } else {
                    this.callgetDataAPI();
                  }
                }, 400);
              });

    }

    callgetDataAPI = async () => {

        let url = Constants.BASE_URL + 'getEmployeeData';

        let response = await getFunction(url);
        this.setState({ loading: false });


        if (response.success) {

            this.setState({ loading: false });

            if (response.item != null) {

                this.setState({
                    dataSource: response.item,
                    newData: response.item
                })

            }
            else {
                this._toastWithDurationGravityOffsetHandler(JSON.stringify(response.item));
            }

        } else {
            this.setState({ loading: false });

        }
    };

    getSelectedItem = (item) => {

        const pushActions = StackActions.push('DetailScreen', { transition: 'horizontal', 'data': item });
        this.props.navigation.dispatch(pushActions);

    }

    goToReportScreen = () => {
        const pushActions = StackActions.push('ReportScreen', { transition: 'horizontal', 'wholeData': this.state.dataSource });
        this.props.navigation.dispatch(pushActions);
    }

    searchItems = text => {

        let tracks = this.state.newData;

        let newData = tracks.filter(item => {
            if (item.name.toUpperCase().match(text.toUpperCase())) {
                return item
            }
        });
        this.setState({
            dataSource: newData,
            value: text,
        });
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.MAIN_COLOR }}>
                <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', width: width, justifyContent: 'flex-start', backgroundColor: Colors.MAIN_COLOR }}>
                    <View style={{ width: width - 60, justifyContent: 'center', alignItems: 'center', paddingLeft: 40 }}>
                        <Text style={{ color: Colors.WHITE_COLOR, fontSize: 24, fontWeight: 'bold', padding: 1 }}>HOME</Text>
                    </View>
                    <TouchableOpacity style={{ width: 60, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => {
                            this.goToReportScreen()
                        }}>
                        <Image
                            source={require('../Images/report.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>

                </View>
                <View style={styles.container}>

                    <View style={styles.searchImgView}>
                        <Image
                            source={require('../Images/search.png')}
                            resizeMode='cover'
                            style={styles.searchImg}
                        >
                        </Image>
                    </View>

                    <TextInput
                        placeholder="Search by name"
                        placeholderTextColor={Colors.GRAY_COLOR}
                        onChangeText={text => this.searchItems(text)}
                        value={this.state.value}
                        maxLength={30}
                        style={styles.inputstyle}>

                    </TextInput>


                    <View style={styles.flatListView}>
                        {
                            this.state.dataSource.length == 0 ?
                                null
                                :
                                <FlatList
                                    style={{ marginTop: Platform.OS=="ios" ? 30 : 20 }}
                                    data={this.state.dataSource}
                                    renderItem={({ item }) => (
                                        <View>
                                            <TouchableOpacity
                                                onPress={() => this.getSelectedItem(item)}
                                            >

                                                <View style={{ backgroundColor: Colors.LIGHT_WHITE_COLOR, borderRadius: 10, width: width - 20, marginVertical: 10, paddingVertical: 6 }}>
                                                    <View style={{ width: width, paddingHorizontal: 40, alignItems: 'flex-start', justifyContent: 'flex-start', backgroundColor: Colors.LIGHT_WHITE_COLOR }}>
                                                        <View style={{ flexDirection: 'row', width: width - 60, marginVertical: 2, justifyContent: 'flex-start' }}>
                                                            <View style={{ flexDirection: 'row', width: (width - 60) * 0.4, justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                <Text style={{ color: Colors.BLACK_COLOR, fontWeight: 'bold' }}>Name: </Text>
                                                            </View>

                                                            <View style={{ flexDirection: 'row', width: (width - 60) * 0.6, justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                <Text style={{ color: Colors.BLACK_COLOR }}>{item.name}</Text>
                                                            </View>
                                                        </View>

                                                    </View>

                                                    <View style={{ width: width, paddingHorizontal: 40, width: width - 60, alignItems: 'flex-start', backgroundColor: Colors.LIGHT_WHITE_COLOR }}>
                                                        <View style={{ flexDirection: 'row', width: width - 60, marginVertical: 2 }}>
                                                            <View style={{ flexDirection: 'row', width: (width - 60) * 0.4, justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                <Text style={{ color: Colors.BLACK_COLOR, fontWeight: 'bold' }}>Department: </Text>
                                                            </View>

                                                            <View style={{ flexDirection: 'row', width: (width - 60) * 0.6, justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                <Text style={{ color: Colors.BLACK_COLOR }}>{item.department}</Text>
                                                            </View>
                                                        </View>

                                                    </View>

                                                    <View style={{ width: width, paddingHorizontal: 40, width: width - 60, alignItems: 'flex-start', backgroundColor: Colors.LIGHT_WHITE_COLOR }}>
                                                        <View style={{ flexDirection: 'row', width: width - 60, marginVertical: 2 }}>
                                                            <View style={{ flexDirection: 'row', width: (width - 60) * 0.4, justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                <Text style={{ color: Colors.BLACK_COLOR, fontWeight: 'bold' }}>Skill: </Text>
                                                            </View>

                                                            <View style={{ flexDirection: 'row', width: (width - 60) * 0.6, justifyContent: 'flex-start', alignItems: 'center' }}>
                                                                <Text style={{ color: Colors.BLACK_COLOR }}>{item.skillset}</Text>

                                                            </View>

                                                        </View>

                                                    </View>

                                                </View>

                                            </TouchableOpacity>

                                        </View>)}
                                    keyExtractor={(item, index) => index}
                                />
                        }

                        <Modal
                            ref={"modalLoader"}
                            backdropColor={Colors.WHITE_COLOR}
                            isOpen={this.state.loading}
                            position={"center"}
                            transparent={true}
                            style={styles.modalStyle}
                            animationType={'none'}
                            onRequestClose={() => { console.log('close modal') }}>
                            <View style={styles.container2}>
                                <ActivityIndicator
                                    animating={this.state.loading}
                                    size='large'
                                    color={Colors.MAIN_COLOR}
                                    style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 80 }} />
                            </View>
                        </Modal>

                    </View>
                </View>
            </SafeAreaView>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.WHITE_COLOR
    },
    modalStyle: {
        height: height,
        width: width,
        position: 'absolute',
        paddingBottom: 70,
        backgroundColor: Colors.WHITE_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputstyle: {
        color: Colors.BLACK_COLOR,
        fontSize: 16,
        paddingLeft: 10,
        marginTop:  Platform.OS == "ios" ? 30 : 15,
        width: width - 100,
        paddingLeft: 5,
        borderBottomColor: '#898989',
        borderBottomColor: '#000',
        borderBottomWidth: 0,

    },
    searchImgView: {
        position: 'absolute',
        alignSelf: 'center',
        width: width - 40,
        height: 50,
        borderRadius: 5,
        borderColor: Colors.BLACK_COLOR,
        borderWidth: 1,
        padding: 5,
        marginTop: 15
    },
    searchImg: {
        width: 15,
        height: 15,
        marginTop: Platform.OS == "ios" ? 10 : 12,
        marginEnd: 30,
        padding: 4
    },

});

