import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
   Platform
} from 'react-native';

import Colors from "../src/Colors";
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import RNPickerSelect from 'react-native-picker-select';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NetInfo from '../node_modules/@react-native-community/netinfo';
import * as Constants from '../src/Constants';
import { postFunction, getFunction } from '../src/Network';
import Modal from '../node_modules/react-native-modalbox';
import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-community/async-storage';

export default class RegisterScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      loading: false,
      isConnected: Boolean,
      fname: '',
      age: '',
      doj: '',
      selectedDept: '',
      selectedLocality: '',
      selectedSkillset: ''
    };
  }


  validateData() {

    NetInfo.fetch().then(state => {
      this.setState({
        isConnected: state.isConnected,
      });

      setTimeout(() => {
        String.prototype.isNumber = function () { return /^\d+$/.test(this); }
        if (this.state.isConnected == false) {
          Alert.alert("Please check your internet connection")
        }
        else {
          if (this.state.fname == '') {
            Alert.alert("Please enter your name")
          }
          else if (this.state.age == '') {
            Alert.alert("Please enter your age ")
          }
          else if (!this.state.age.isNumber()) {
            Alert.alert("Please enter your age in number")
          }
          else if (this.state.selectedDept == '') {
            Alert.alert("Please select your department")
          }
          else if (this.state.selectedLocality == "") {
            Alert.alert("Please select your locality")
          }



          else if (this.state.doj == "") {
            Alert.alert("Please select your date of joining")
          }

          else if (this.state.selectedSkillset == "") {
            Alert.alert("Please select your skillset")
          }
          else {
            this.registerUser();
          }





        }
      }, 500);
    });

  }

  registerUser = async () => {

    this.setState({ loading: true });
    let url = Constants.BASE_URL + 'registerEmployee';

    let collection = {};
    collection.Name = this.state.name;
    collection.Age = this.state.age;
    collection.DOJ = this.state.doj;
    collection.Department = this.state.selectedDept;
    collection.Locality = this.state.selectedLocality;
    collection.Skillset = this.state.selectedSkillset;

    let response = await postFunction(url, JSON.stringify(collection));

    if (response.success) {
      this.setState({ loading: false });
      if (response.item.hasOwnProperty('message')) {

        if (response.item.message == "Employee registered successfully !") {
          await AsyncStorage.setItem("IsRegistered", "Yes");

          this.props.navigation.reset({
            routes: [{ name: 'HomeScreen' }]
          });
        }
        else {
          Alert.alert(response.item.message)
        }
      }

    } else {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.MAIN_COLOR }}>
        <View style={{ height: 60, width: width, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: Colors.WHITE_COLOR, fontSize: 24, fontWeight: 'bold', padding: 1 }}>REGISTRATION</Text>

        </View>

        <View style={styles.container}>

          <ScrollView>
         
          <View style={{ marginTop: 30,  alignItems: 'center', justifyContent: 'center', marginBottom: 100 }}>

            <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center', width: width - 80, borderRadius: 5, borderWidth: 1 }}>
              <TextInput
                placeholder={"Name"}
                placeholderTextColor={Colors.LIGHT_GRAY_COLOR}
                onChangeText={(value) => {
                  this.setState({ fname: value })
                }}

                keyboardType={'default'}
                maxLength={20}
                style={[styles.inputstyle]}>
              </TextInput>
            </View>

            <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center', width: width - 80, borderRadius: 5, borderWidth: 1 }}>
              <TextInput
                placeholder={"Age (in years)"}
                placeholderTextColor={Colors.LIGHT_GRAY_COLOR}
                onChangeText={(value) => {
                  this.setState({ age: value })
                }}

                keyboardType={'number-pad'}
                maxLength={2}
                style={[styles.inputstyle]}>
              </TextInput>
            </View>

            <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center', width: width - 80, borderRadius: 5, borderWidth: 1 }}>
              <RNPickerSelect
                style={
                  PickerStyle = {
                    width: width - 80,
                    color: '#344953',
                    alignSelf: 'center',
                    paddingLeft: 0,
                    justifyContent: 'center',
                    iconContainer: {
                      right: 10,
                      top: Platform.OS == "android" ? 18 : 25
                    },
                    placeholder: {
                      color: Colors.LIGHT_GRAY_COLOR,
                      fontSize: 15,
                      marginLeft: 0,
                      paddingLeft: 10,

                    },
                    inputIOS: {
                      width: width - 80,
                      // marginVertical: 10,
                      fontSize: 15,
                      borderWidth: 0,
                      height: 45,
                      borderRadius: 5,
                      color: 'black',
                      paddingLeft: 10,
                      paddingRight: 30, // to ensure the text is never behind the icon
                    },
                    inputAndroid: {
                      width: width - 80,
                      // marginVertical: 10,
                      fontSize: 15,
                      borderWidth: 0,
                      height: 45,
                      borderRadius: 5,
                      color: 'black',
                      paddingLeft: 10,
                      paddingRight: 30,// to ensure the text is never behind the icon
                    },
                  }}
                // itemStyle={{ width: width - 110, marginLeft:15, paddingLeft:15 }}
                selectedValue={this.state.selectedDept}
                onValueChange={(label) => {
                  this.setState({ selectedDept: label })
                }}

                placeholder={{ label: 'Select Department', value: '' }}
                items={[
                  { label: "Sales", value: "Sales" },
                  { label: "Human Resources", value: "Human Resources" },
                  { label: "Product Development", value: "Product Development" },
                  { label: "Marketing", value: "Marketing" },
                  { label: "Autodesk Inventor", value: "Autodesk Inventor" },
                  { label: "Network Administration", value: "Network Administration" },
                  { label: "Design for Manufacturing", value: "Design for Manufacturing" },
                ]}

                Icon={() => {
                  return (
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        borderTopWidth: 10,
                        borderTopColor: 'gray',
                        borderRightWidth: 10,
                        borderRightColor: 'transparent',
                        borderLeftWidth: 10,
                        borderLeftColor: 'transparent',
                        width: 0,
                        height: 0,
                      }}
                    />
                  );
                }}
              />
            </View>



            <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center', width: width - 80, borderRadius: 5, borderWidth: 1 }}>
              <RNPickerSelect
                style={
                  PickerStyle = {
                    width: width - 80,
                    color: '#344953',
                    alignSelf: 'center',
                    paddingLeft: 0,
                    justifyContent: 'center',
                    iconContainer: {
                      right: 10,
                      top: Platform.OS == "android" ? 18 : 25
                    },
                    placeholder: {
                      color: Colors.LIGHT_GRAY_COLOR,
                      fontSize: 15,
                      marginLeft: 0,
                      paddingLeft: 10,

                    },
                    inputIOS: {
                      width: width - 80,
                      // marginVertical: 10,
                      fontSize: 15,
                      // borderWidth: 1,
                      height: 45,
                      borderRadius: 5,
                      color: 'black',
                      paddingLeft: 10,
                      paddingRight: 30, // to ensure the text is never behind the icon
                    },
                    inputAndroid: {
                      width: width - 80,
                      // marginVertical: 10,
                      fontSize: 15,
                      borderWidth: 0,
                      height: 45,
                      borderRadius: 5,
                      color: Colors.BLACK_COLOR,
                      paddingLeft: 10,
                      paddingRight: 30,// to ensure the text is never behind the icon
                    },
                  }}
                // itemStyle={{ width: width - 110, marginLeft:15, paddingLeft:15 }}
                selectedValue={this.state.selectedLocality}
                onValueChange={(label) => {
                  this.setState({ selectedLocality: label })
                }}

                placeholder={{ label: 'Locality', value: '' }}
                items={[
                  { label: "Mumbai", value: "Mumbai" },
                  { label: "Pune", value: "Pune" },
                  { label: "Pittsburgh", value: "Pittsburgh" },
                  { label: "Santiago", value: "Santiago" },
                  { label: "Atlanta", value: "Atlanta" },
                  { label: "Petropolis", value: "Petropolis" },
                  { label: "North Shore", value: "North Shore" },
                ]}

                Icon={() => {
                  return (
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        borderTopWidth: 10,
                        borderTopColor: 'gray',
                        borderRightWidth: 10,
                        borderRightColor: 'transparent',
                        borderLeftWidth: 10,
                        borderLeftColor: 'transparent',
                        width: 0,
                        height: 0,
                      }}
                    />
                  );
                }}
              />

            </View>

            <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 80, borderRadius: 5, borderWidth: 1 }}>
              <DatePicker
                date={this.state.doj}
                mode="date"
                placeholder="Date of joining"
                format="DD-MM-YYYY"
                minDate="01-01-1980"
                maxDate="2-11-2020"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    right: 0,
                    top: 4,
                    left: width - 130
                  },

                  dateInput: {
                    marginLeft: -25,
                    width: width - 120,
                    alignSelf: 'flex-start',
                    borderWidth: 0,
                    fontSize: 15,

                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.setState({ doj: date }) }}
              />
            </View>
            <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center', width: width - 80, borderRadius: 5, borderWidth: 1 }}>
              <RNPickerSelect
                style={
                  PickerStyle = {
                    width: width - 80,
                    color: '#344953',
                    alignSelf: 'center',
                    paddingLeft: 0,
                    justifyContent: 'center',
                    iconContainer: {
                      right: 10,
                      top: Platform.OS == "android" ? 18 : 25
                    },
                    placeholder: {
                      color: Colors.LIGHT_GRAY_COLOR,
                      fontSize: 15,
                      marginLeft: 0,
                      paddingLeft: 10,

                    },
                    inputIOS: {
                      width: width - 80,
                      //marginVertical: 10,
                      fontSize: 15,
                      borderWidth: 0,
                      height: 45,
                      borderRadius: 5,
                      color: 'black',
                      paddingLeft: 10,
                      paddingRight: 30, // to ensure the text is never behind the icon
                    },
                    inputAndroid: {
                      width: width - 80,
                      // marginVertical: 10,
                      fontSize: 15,
                      borderWidth: 0,
                      height: 45,
                      borderRadius: 5,
                      color: 'black',
                      paddingLeft: 10,
                      paddingRight: 30,// to ensure the text is never behind the icon
                    },
                  }}
                // itemStyle={{ width: width - 110, marginLeft:15, paddingLeft:15 }}
                selectedValue={this.state.selectedSkillset}
                onValueChange={(label) => {
                  this.setState({ selectedSkillset: label })
                }}

                placeholder={{ label: 'Skillset', value: '' }}
                items={[
                  { label: "React-Native", value: "React-Native" },
                  { label: "DBMS", value: "DBMS" },
                  { label: "Testing", value: "Testing" },
                  { label: "Dev-Ops", value: "Dev-Ops" },
                  { label: "Java", value: "Java" },
                  { label: "Python", value: "Python" },
                ]}

                Icon={() => {
                  return (
                    <View
                      style={{
                        backgroundColor: 'transparent',
                        borderTopWidth: 10,
                        borderTopColor: 'gray',
                        borderRightWidth: 10,
                        borderRightColor: 'transparent',
                        borderLeftWidth: 10,
                        borderLeftColor: 'transparent',
                        width: 0,
                        height: 0,
                      }}
                    />
                  );
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => { this.validateData() }}
              style={{ marginVertical: 10, height: 45, backgroundColor: Colors.MAIN_COLOR, flexDirection: 'row', alignItems: 'center', width: width - 80, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: Colors.WHITE_COLOR, fontSize: 16, fontWeight: 'bold', padding: 1 }}>Register</Text>

            </TouchableOpacity>
          </View>

          <Modal
            ref={"modalLoader"}
            position={"center"}
            isOpen={this.state.loading}
            backdropColor={Colors.WHITE_COLOR}
            transparent={true}
            style={styles.modalStyle}
            animationType={'none'}
          // onRequestClose={
          //   () => { 
          //     console.log('close modal')
          //  }}
          >
            <View style={styles.container2}>
              <ActivityIndicator
                animating={this.state.loading}
                size='large'
                color={Colors.THEME_COLOR}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 80 }} />
            </View>
          </Modal>
         </ScrollView>
         
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
  inputstyle: {
    textAlign: 'left',
    color: Colors.BLACK_COLOR,
    fontSize: 15,
    width: width - 100,//15+(width*2/3), 
    paddingLeft: 5,
    borderBottomColor: Colors.WHITE_COLOR,
    height: 44,
    paddingBottom: Platform.OS == "android" ? 6 : 1,
    borderBottomWidth: 0,
    marginHorizontal: 10,
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

