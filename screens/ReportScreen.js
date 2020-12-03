import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';

import Colors from "../src/Colors";
const width = Dimensions.get('window').width;
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";


export default class ReportScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      graphData: [],
      labelsData: []
    };
  }

  componentDidMount = async () => {
    const { route, navigation } = this.props;
    const { wholeData } = route.params;
    // this.setState({ data: wholeData });
    let allDepartments = [];    // array of all the departments

    for (let a of wholeData) {
      allDepartments.push(a.department)
    }

    let data1 = [];                    // array with the percentages of departmnets
    let labels = [];
    labels = allDepartments;
    labels = Array.from(new Set(labels));  // removed duplicates

    for (let i = 0; i < labels.length; i++) {

      var count = allDepartments.reduce(function (n, val) {
        return n + (val === labels[i]);
      }, 0);

      count = (count / allDepartments.length) * 100   //calculated percentage of the departmentNumbers
      data1.push(count);
    }


    //  let arr={};
    //  arr.data= data1;
    //  let datasets= [];
    //  datasets.push(arr)
    //  let tempArr={};
    //  tempArr.labels= labels;
    //  tempArr.datasets= datasets

    //  const a=[9,11,9,9,8,11,12,2,5,6,8,10];
    this.setState({
      graphData: data1,
      labelsData: labels
    });

    // setTimeout(() => {
    //   console.warn(JSON.stringify(this.state.graphData))
    // }, 1000);

    // 9,11,9,9,8,11,12,2,5,6,8,10
    // Business Development, Sles, Accounting, Marketing, Human Resources, Research and Development, Services, Legal, Support, Training, Production Management, Engineering

  }

  render() {

    const data = this.state.graphData;
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
            <Text style={{ color: Colors.WHITE_COLOR, fontSize: 24, fontWeight: 'bold', padding: 1 }}>REPORT</Text>
          </View>

        </View>

        <View style={styles.container}>
          <View>


            <LineChart
              data={{
                labels: ["Business Development", "Sales", "Accounting", "Marketing", "Human Resources", "Research and Development", "Services", "Legal", "Support", "Training", "Production Management", "Engineering"],// this.state.labelsData
                datasets: [
                  {
                    data: [9,11,9,9,8,11,12,2,5,6,8,10]   //this.state.graphData
                  }
                ]
              }}
              width={width} // from react-native
              height={290}
              yAxisLabel=""
              yAxisSuffix=""
              verticalLabelRotation={40}
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                //  decimalPlaces: 1, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />

            <View style={{ width: width, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Departmentwise data analysis using Bezier Line Chart</Text>
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
  }
});


