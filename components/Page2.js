import * as React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  TextInput,
  Button,
  ProgressViewIOS,
} from 'react-native';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import { Pedometer } from 'expo-sensors';
import * as Device from 'expo-device';

const { width, height } = Dimensions.get('window');

export default class Page2 extends React.Component {
  state = {
    intro: 0,
    name: '',
    key: 'value', //for data storage
    progress: 0,
    playing: false,

    timer: 1000,
    interval: 500,
  };

  //this function will dump the enitre state into long term storage
  componentDidMount() {
    Font.loadAsync({
      abril: require('../assets/AbrilFatface-Regular.ttf'),
      cute: require('../assets/CuteFont-Regular.ttf'),
      ubuntu: require('../assets/Ubuntu-Light.ttf'),
    });
    this.doUpdates = setInterval(this.update, this.state.interval);
  }

  update = () => {
    let timer = this.state.timer;
    let interval = this.state.interval;
    let playing = this.state.playing;
    if (playing) {
      if (timer > 0) {
        timer -= interval;
      } else {
        playing = false;
        timer = 1000;
      }
    }
    this.setState({ timer, playing });
  };

  playAnimation = () => {
    this.setState({ playing: true });
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/indoor.jpg')}
        style={styles.container}>
        <View style={styles.statusbar} />
        <View
          style={[
            styles.nav,
            {
              top: Constants.statusBarHeight,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              flexDirection: 'row',
              borderTopWidth: 0,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <View><Image style = {styles.icon} source = {require("../assets/watermelon.png")}/></View>
          <TouchableOpacity
            onPress={() => this.props.pageChange(3)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: height / 12,
              width: width - 2 * (height / 12 - 20) - 20,
            }}>
            <View style={{ flexDirection: 'column' }}>
              <Text
                style={[
                  styles.fontsmall,
                  { textAlignVertical: 'center', paddingLeft: 10 },
                ]}>
                {this.props.goal -
                  this.props.pastStepCount -
                  this.props.currentStepCount}{' '}
                steps left today
              </Text>
              <Text
                style={[
                  styles.fontsmall,
                  { color: 'black', fontSize: 12, paddingLeft: 10 },
                ]}>
                Tap for More
              </Text>
            </View>
          </TouchableOpacity>
          <View><Image style = {styles.icon} source = {require("../assets/watermelon.png")}/></View>
        </View>

        {this.props.getIntro > 5 ? (
          <View style={styles.tracker}>
            <View
              style={{
                backgroundColor: 'rgb(255, 251, 143)',
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                padding: 5,
                marginBottom: 5,
              }}>
              <Text style={[styles.fontxs, {}]}>{this.props.name}</Text>
            </View>
            <Text style={styles.fontxs}>
              Happiness - {this.props.progress2 * this.props.progress3 * 100}%
            </Text>
            <View>
              <ProgressViewIOS
                style={styles.progress}
                progressTintColor="rgb(25, 140, 27)"
                progress={this.props.progress2 * this.props.progress3}
              />
              <ProgressViewIOS
                style={styles.progress2}
                progressTintColor="rgb(25, 140, 27)"
                progress={this.props.progress2 * this.props.progress3}
              />
              <ProgressViewIOS
                style={[styles.progress2, { marginBottom: 10 }]}
                progressTintColor="rgb(25, 140, 27)"
                progress={this.props.progress2 * this.props.progress3}
              />
            </View>
            <Text style={styles.fontxs}>
              Hunger - {this.props.progress2 * 100}%
            </Text>
            <View>
              <ProgressViewIOS
                style={styles.progress}
                progressTintColor="rgb(35, 76, 153)"
                progress={this.props.progress2}
              />
              <ProgressViewIOS
                style={styles.progress2}
                progressTintColor="rgb(35, 76, 153)"
                progress={this.props.progress2}
              />
              <ProgressViewIOS
                style={[styles.progress2, { marginBottom: 10 }]}
                progressTintColor="rgb(35, 76, 153)"
                progress={this.props.progress2}
              />
            </View>
            <Text style={styles.fontxs}>
              Activity - {this.props.progress3 * 100}%
            </Text>
            <View>
              <ProgressViewIOS
                style={styles.progress}
                progressTintColor="rgb(131, 54, 194)"
                progress={this.props.progress3}
              />
              <ProgressViewIOS
                style={styles.progress2}
                progressTintColor="rgb(131, 54, 194)"
                progress={this.props.progress3}
              />
              <ProgressViewIOS
                style={[styles.progress2, { marginBottom: 10 }]}
                progressTintColor="rgb(131, 54, 194)"
                progress={this.props.progress3}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgb(255, 251, 143)',
                borderBottomLeftRadius: 3,
                borderBottomRightRadius: 3,
                padding: 5,
                marginTop: 5,
              }}
              onPress={() => this.reset()}>
              <Text style={styles.fontxs}>RESET</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View
          style={[
            styles.intro,
            { top: Constants.statusBarHeight + height / 12, padding: 20 },
          ]}>
          <View>
            {this.props.getIntro == 0 ? (
              <View>
                <Text style={[styles.font, {}]}>
                  Hi! Welcome to my world, my name is Eddie! What about you?
                </Text>
                <TextInput
                  style={styles.input}
                  value={this.state.name}
                  onChangeText={(name) => this.setState({ name })}
                  ref={(ref) => {
                    this._nameInput = ref;
                  }}
                  placeholder="Name"
                  autoCapitalize="none"
                  autoFocus={true}
                  returnKeyType="send"
                  onSubmitEditing={this._submit}
                  blurOnSubmit={false}
                />
              </View>
            ) : null}
            {this.props.getIntro == 1 ? (
              <View style={styles.center}>
                <Text style={[styles.font, {}]}>
                  So {this.state.name}...you want a pet?
                </Text>
                <TouchableOpacity onPress={this._submit} style={styles.button}>
                  <Text style={styles.font}>Yes!</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {this.props.getIntro == 2 ? (
              <View style={styles.center}>
                <Text style={[styles.font, {}]}>
                  Well, you're stuck with me for now! You can stop by the
                  adoption center whenever you feel like and adopt a pet of your
                  choice. Though there are adoption fees...
                </Text>
                <TouchableOpacity onPress={this._submit} style={styles.button}>
                  <Text style={styles.font}>Got It</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {this.props.getIntro == 3 ? (
              <View style={styles.center}>
                <Text style={[styles.font, {}]}>
                  You don't have money? You're in luck because this world
                  doesn't need money. We operate on movement. The more you walk,
                  the happier I am, and the happier you are ($_$)
                </Text>
                <TouchableOpacity onPress={this._submit} style={styles.button}>
                  <Text style={styles.font}>Got It</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {this.props.getIntro == 4 ? (
              <View style={styles.center}>
                <Text style={[styles.font, {}]}>
                  You have to take care of me, okay?
                </Text>
                <TouchableOpacity onPress={this._submit} style={styles.button}>
                  <Text style={styles.font}>Got It</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {this.props.getIntro == 5 ? (
              <View style={styles.center}>
                <TouchableOpacity
                  onPress={this.goToMyPlan}
                  style={styles.button2}>
                  <Text style={styles.font}>Set Up My Plan</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>

        <TouchableOpacity
          onPress={() => this.playAnimation(this.props.char)}
          activeOpacity={1}>
          {this.state.playing ? (
            <Image source={require('../assets/birb.gif')} style={styles.char} />
          ) : (
            <Image source={require('../assets/birb.png')} style={styles.char} />
          )}
        </TouchableOpacity>

        <View
          style={[
            styles.nav,
            {
              top: (11 * height) / 12,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              
            },
          ]}>
          <TouchableOpacity onPress={() => this.props.pageChange(1)}>
            <Image source={require('../assets/home.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style = {{width: width/2, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}onPress={() => this.props.pageChange(5)}>
            <Image
              source={require('../assets/store.png')}
              style={[styles.icon, {}]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../assets/calendar.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          
          
        </View>
      </ImageBackground>
    );
  }

  _submit = () => {
    this.setState({ intro: this.state.intro + 1 });
    this.props.saveIntro(this.state.intro + 1);
  };

  reset = () => {
    this.setState({ intro: 0 });
    this.props.saveIntro(0);
  };

  goToMyPlan = () => {
    this.props.pageChange(3);
    this.props.saveIntro(5);
  };
}

const styles = StyleSheet.create({
  statusbar: {
    zIndex: 10,
    backgroundColor: 'white',
    width: width,
    height: Constants.statusBarHeight,
    position: 'absolute',
  },
  container: {
    flex: 1,
    backgroundColor: '#f6ffb3',
    padding: 8,
  },
  nav: {
    position: 'absolute',
    width: width,
    height: height / 12,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
  font: {
    fontFamily: 'ubuntu',
    textAlign: 'center',
    fontSize: 28,
  },
  fontsmall: {
    fontFamily: 'ubuntu',
    fontSize: 18,
    textAlign: 'center',
  },
  fontxs: {
    fontFamily: 'ubuntu',
    fontSize: 14,
    textAlign: 'center',
  },
  intro: {
    zIndex: 100,
  },
  char: {
    position: 'absolute',
    top: height * 0.7 - width / 2 + 20,
    left: width / 4,
    width: width / 2 + 20,
    resizeMode: 'contain',
  },
  icon: {
    width: height / 12 - 20,
    resizeMode: 'contain',
  },
  input: {
    margin: 20,
    marginBottom: 0,
    height: 34,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
  center: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  button: {
    zIndex: 105785785,
    position: 'absolute',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    top: (8 * height) / 12,
    borderRadius: 2,
    borderColor: 'black',
    borderWidth: 2,
  },
  button2: {
    zIndex: 1209381,
    position: 'absolute',
    top: height / 4 - Constants.statusBarHeight,
    width: width - 40,
    padding: 40,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
  },
  stop: {
    position: 'absolute',
    top: 500,
  },

  tracker: {
    width: width / 3,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderRadius: 3,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    position: 'absolute',
    top: height / 12 + Constants.statusBarHeight + 10,
    left: 10,
  },

  progress: {
    marginHorizontal: 10,
    marginTop: 5,
  },

  progress2: {
    marginHorizontal: 10,
  },
});
