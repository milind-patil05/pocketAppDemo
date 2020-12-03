import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Dimensions,
    ActivityIndicator
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Colors from '../src/Colors';
import { StackActions, NavigationActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from '../node_modules/react-native-modalbox';


export default class WelcomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    constructor(props) {
        super(props);
        this.state={
            loading:true
        }
    }

    componentDidMount = async () => {

        const isRegistered = await AsyncStorage.getItem("IsRegistered", '');
        // console.warn(isRegistered);
        if (isRegistered == "Yes") {
            this.setState({loading:false});
            this.props.navigation.dispatch(
                StackActions.replace('HomeScreen')
            );
        }
        else {
            this.setState({loading:false});
            this.props.navigation.dispatch(StackActions.replace('RegisterScreen'));
        }
       
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.MAIN_COLOR }}>
                <View style={styles.container}>
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
});


