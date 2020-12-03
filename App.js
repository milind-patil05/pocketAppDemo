import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Animated,
  TouchableOpacity,
  Dimensions,
  Easing
} from 'react-native';


import Colors from "./src/Colors";
import LoginScreen from './screens/ReportScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DetailScreen from './screens/DetailScreen';
import ReportScreen from './screens/ReportScreen';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

// export default class App extends React.Component{

//   render(){
//     return (
//       <SafeAreaView style={{flex:1, backgroundColor:Colors.MAIN_COLOR}}>
//           <View style={styles.container}>
//               <Text>Hello</Text>      
//           </View>
//       </SafeAreaView>
      
//     );
//   }
// }
const Stack = createStackNavigator();


function App({ navigation }) {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen"
      >
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown: false, //Set Header Title
            ...TransitionPresets.SlideFromRightIOS
          }} />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
        />
        
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            headerShown: false, //Set Header Title                  
            ...TransitionPresets.SlideFromRightIOS
          }} />
          <Stack.Screen
          name="ReportScreen"
          component={ReportScreen}
          options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}
        />
        {/* <Stack.Screen
          name="VerifyOTPScreen"
          component={VerifyOTPScreen}
          options={{
            headerShown: false, //Set Header Title                  
            ...TransitionPresets.SlideFromRightIOS
          }} /> */}
              

      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.WHITE_COLOR
  }
});


//Slide from right animation
let SlideFromRight = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1];
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  })
  const slideFromRight = { transform: [{ translateX }] }
  return slideFromRight
};

// const App = createAppContainer(MainNavigator);
export default App;
