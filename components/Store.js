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
} from 'react-native';
import Constants from 'expo-constants';
import * as Font from 'expo-font';

export default class Store extends React.Component {
  render() {
    return(
      <View><TouchableOpacity onPress = {() => this.props.pageChange(2)}><Text>Back</Text></TouchableOpacity></View>
    );
  }
}

const styles = StyleSheet.create({
});