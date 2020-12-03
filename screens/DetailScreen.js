import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    ActivityIndicator,
    StatusBar,
    Dimensions,
    Image,
    FlatList,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from "../src/Colors";


export default class DetailScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            item: {},

        };
    }

    componentDidMount = async () => {
        const { route, navigation } = this.props;
        const { data } = route.params;
        this.setState({ item: data })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.MAIN_COLOR }}>
                <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', width: width, justifyContent: 'flex-start', backgroundColor: Colors.MAIN_COLOR }}>
                    <TouchableOpacity style={{ width: 60, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                        <Image
                            source={require('../Images/back.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>

                    <View style={{ width: width - 60, justifyContent: 'center', alignItems: 'center', paddingRight: 40 }}>
                        <Text style={{ color: Colors.WHITE_COLOR, fontSize: 24, fontWeight: 'bold', padding: 1 }}>EMPLOYEE DETAILS</Text>
                    </View>

                </View>
                <View style={styles.container}>
                    <View style={{ backgroundColor: Colors.LIGHT_WHITE_COLOR, borderRadius: 10, width: width - 20, marginVertical: 10, paddingVertical: 6 }}>
                        <View style={styles.outerView}>

                            <View style={{ flexDirection: 'row', width: (width - 60) * 0.4, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{ color: Colors.BLACK_COLOR, fontSize: 18, fontWeight: 'bold' }}>Name: </Text>
                            </View>

                            <View style={{ flexDirection: 'row', width: (width - 100) * 0.6, justifyContent: 'flex-start', backgroundColor: Colors.WHITE_COLOR, alignItems: 'center' }}>
                                <Text style={{ color: Colors.BLACK_COLOR, fontSize: 16 }}>{this.state.item.name}</Text>
                            </View>


                        </View>

                        <View style={styles.outerView}>

                            <View style={{ flexDirection: 'row', width: (width - 60) * 0.4, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{ color: Colors.BLACK_COLOR, padding: 2, fontSize: 18, fontWeight: 'bold' }}>Age: </Text>
                            </View>

                            <View style={{ flexDirection: 'row', width: (width - 100) * 0.6, justifyContent: 'flex-start', backgroundColor: Colors.WHITE_COLOR, alignItems: 'center' }}>
                                <Text style={{ color: Colors.BLACK_COLOR, padding: 2, fontSize: 16 }}>{String(this.state.item.age)}</Text>
                            </View>

                        </View>

                        <View style={styles.outerView}>
                            <View style={{ flexDirection: 'row', width: (width - 60) * 0.4, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{ color: Colors.BLACK_COLOR, fontSize: 18, padding: 2, fontWeight: 'bold' }}>Date of joining: </Text>
                            </View>

                            <View style={{ flexDirection: 'row', width: (width - 100) * 0.6, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors.WHITE_COLOR, }}>
                                <Text style={{ color: Colors.BLACK_COLOR, padding: 2, fontSize: 16 }}>{this.state.item.doj}</Text>

                            </View>

                        </View>

                        <View style={styles.outerView}>
                            <View style={{ flexDirection: 'row', width: (width - 60) * 0.4, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{ color: Colors.BLACK_COLOR, padding: 2, fontWeight: 'bold', fontSize: 18 }}>Department: </Text>
                            </View>

                            <View style={{ flexDirection: 'row', width: (width - 100) * 0.6, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors.WHITE_COLOR, }}>
                                <Text style={{ color: Colors.BLACK_COLOR, padding: 2, fontSize: 16 }}>{this.state.item.department}</Text>
                            </View>

                        </View>

                        <View style={styles.outerView}>
                            <View style={{ flexDirection: 'row', width: (width - 60) * 0.4, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{ color: Colors.BLACK_COLOR, padding: 2, fontSize: 18, fontWeight: 'bold' }}>City: </Text>
                            </View>

                            <View style={{ flexDirection: 'row', width: (width - 100) * 0.6, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors.WHITE_COLOR, }}>
                                <Text style={{ color: Colors.BLACK_COLOR, padding: 2, fontSize: 16 }}>{this.state.item.locality}</Text>

                            </View>

                        </View>

                        <View style={styles.outerView}>
                            <View style={{ flexDirection: 'row', width: (width - 60) * 0.4, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <Text style={{ color: Colors.BLACK_COLOR, padding: 2, fontWeight: 'bold', fontSize: 18, }}>Skill: </Text>
                            </View>

                            <View style={{ flexDirection: 'row', width: (width - 100) * 0.6, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: Colors.WHITE_COLOR, }}>
                                <Text style={{ color: Colors.BLACK_COLOR, padding: 2, fontSize: 16 }}>{this.state.item.skillset}</Text>

                            </View>

                        </View>



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
    outerView: {
        width: width - 40,
        paddingHorizontal: 20,
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        backgroundColor: Colors.LIGHT_WHITE_COLOR
    }
});


