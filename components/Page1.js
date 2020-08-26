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

const { width, height } = Dimensions.get('window');

export default class Page1 extends React.Component {
  state = {
    fontsLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      abril: require('../assets/AbrilFatface-Regular.ttf'),
      lato: require('../assets/Lato-Black.ttf'),
      passionOne: require('../assets/PassionOne-Regular.ttf'),
      baloobhai2: require('../assets/BalooBhai2-Regular.ttf'),
      cute: require('../assets/CuteFont-Regular.ttf'),
    });
  }

  render() {
    return (
      <View
        style={styles.container}>
        <Image style = {styles.walkingman} source = {require('../assets/walkingman.gif')}/>
        <View>
          <Text style = {[styles.font, {position: 'relative', padding: 35, top: height/6, lineHeight: 35, textAlign: 'center'}]}>WELCOME TO DOGGIE WALKER</Text>
        </View>
        <Text
          style={[
            styles.font,
            {position: 'absolute', top: height - 40, letterSpacing: -2, fontSize: '30', textAlign: 'center',  },
          ]}>
          please switch pages if font doesn't update :)
        </Text>
        <TouchableOpacity
          style={[styles.button, {position: 'relative', top: height/6}]}
          onPress={() => this.props.pageChange(2)}>
          <Text style={styles.font}>PLAY</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 8 + Constants.statusBarHeight,
    alignItems: 'center',
    backgroundColor: '#B1E2FA',
  },
  walkingman: {
    width: width,
    height: 3*width/4,
    position: 'absolute',
    top: 14*height/15 - .75*width
  },
  button: {
    width: 170,
    height: 60,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  font: {
    fontFamily: 'cute',
    fontSize: 50,
    color: 'white',
  },
  font2: {
    fontFamily: 'passionOne',
    fontSize: 30,
    color: 'white',
  },
});
