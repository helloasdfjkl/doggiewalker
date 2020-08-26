import * as React from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  TextInput,
  Picker
} from 'react-native';
import Constants from 'expo-constants';
import * as Font from 'expo-font';

const { width, height } = Dimensions.get('window');

export default class PlanSetup extends React.Component {
  state = {
    age: 1,
    weight: 1,
    difficulty: 1,
  };
  
  componentDidMount() {
    Font.loadAsync({
      abril: require('../assets/AbrilFatface-Regular.ttf'),
      cute: require('../assets/CuteFont-Regular.ttf'),
      ubuntu: require('../assets/Ubuntu-Light.ttf'),
    });
  }

  render() {
    return(<ImageBackground style = {styles.container} source = {require("../assets/catwallpaper.gif")}>
    <Text style = {[styles.font, {fontSize: 64, textAlign: 'center', color: 'white', shadowColor: '#ffa3a3', shadowOpacity: 1, shadowOffset: {width: 2, height: 2,}}]}>My Plan</Text>
    <TouchableOpacity style = {styles.stop} onPress={() => this.props.pageChange(2)}>
      <Text style = {styles.font}>BACK</Text>
    </TouchableOpacity>
    <View style = {styles.questions}>
        <View style = {styles.sameLine}><Text style={[styles.font,{fontSize: 36, fontWeight: 'bold', marginTop: 20, marginBottom: 10,paddingTop: 0}]}>Age: </Text>
        <Picker
          style={styles.twoPickers} itemStyle={styles.twoPickerItems}
          selectedValue={this.props.age}
          onValueChange={(itemValue) => this.props.saveAge(itemValue)}
        >
          <Picker.Item  label="< 18" value="1" />
          <Picker.Item  label="18-25" value="2" />
          <Picker.Item label="25-55" value="3" />
          <Picker.Item label="55+" value="4" />
        </Picker></View>

        <View style = {styles.sameLine}><Text style={[styles.font,{fontSize: 36, fontWeight: 'bold', marginTop: 20, marginBottom: 10,paddingTop: 0}]}>Weight (LBS): </Text>
        <Picker
          style={styles.twoPickers} itemStyle={styles.twoPickerItems}
          selectedValue={this.props.weight}
          onValueChange={(itemValue) => this.props.saveWeight(itemValue)}
        >
          <Picker.Item  label="< 100" value="1" />
          <Picker.Item  label="100-150" value="2" />
          <Picker.Item label="150-200" value="3" />
          <Picker.Item label="> 200" value="4" />
        </Picker></View>

        <View style = {styles.sameLine}><Text style={[styles.font,{fontSize: 36, fontWeight: 'bold', marginTop: 20, marginBottom: 10, paddingTop: 0}]}>Difficulty: </Text>
        <Picker
          style={styles.twoPickers} itemStyle={styles.twoPickerItems}
          selectedValue={this.props.difficulty}
          onValueChange={(itemValue) => this.props.saveDifficulty(itemValue)}
        >
          <Picker.Item  label="easy" value="1" />
          <Picker.Item  label="normal" value="2" />
          <Picker.Item label="hard" value="3" />
          <Picker.Item label="intense" value="4" />
        </Picker></View>
        
        <View style = {styles.goal}>
          <Text style = {[styles.font, {textAlign: 'center'}]}>Your are changing your goal to {4000 - this.props.age*500 + this.props.weight * 500 + this.props.difficulty*2000} steps per day.</Text>
          <TouchableOpacity onPress = {() => this.confirm()} style = {styles.button}><Text style = {[styles.font,{textAlign: 'center', paddingTop: 5}]}>CONFIRM</Text></TouchableOpacity>
        </View>
    </View></ImageBackground>
    )
  }

  confirm = () => {
    this.props.saveGoal(4000 - this.props.age*500 + this.props.weight * 500 + this.props.difficulty*2000)
    this.props.saveIntro(6)
    this.props.pageChange(2)
  }
  reset = () => {
    this.props.saveAge(1)
    this.props.saveWeight(1)
    this.props.saveDifficulty(1)
  }
}

const styles = StyleSheet.create({
  button: {
    width: width/3,
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOffset: 0,
    shadowOpacity: .5,
    borderRadius: 3,
  },
  container: {
    top: Constants.statusBarHeight,
    padding: 10,
    width: width,
    height: height,
    alignItems: 'center',
  },
  font: {
    paddingTop: 10,
    fontFamily: 'cute',
    fontSize: 36,
  },
  goal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sameLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  twoPickers: {
    width: width/3,
    height: 50,
    backgroundColor: 'rgb(237, 237, 237)',
    shadowRadius: 3,
    shadowOpacity: .5,
    shadowOffset: 0,
    borderRadius: 3,
  },
  twoPickerItems: {
    height: 50,
    color: 'black',
    fontFamily: 'cute',
    fontSize: 36,
  },
});