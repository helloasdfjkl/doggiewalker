import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import PlanSetup from './components/PlanSetup';
import Calendar from './components/Calendar';
import Store from './components/Store';
import PedometerExample from './components/PedometerExample';
import { Pedometer } from 'expo-sensors';
import * as Font from 'expo-font';

const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    page: 1,
    introh: 0,
    isPedometerAvailable: 'checking',
    pastStepCount: 0,
    currentStepCount: 0,
    name: "BIRDO",
    char: 1,
    age: 1,
    weight: 1,
    difficulty: 1,
    goal: 0,

    ageTEMP: 0,
    weightTEMP: 0,
    diffTEMP: 0,

    progress2: 1,
    progress3: 1,
  };

  componentDidMount = () => {
    this.getData();
    this._subscribe();
  };

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps,
      });
    });

    const end = new Date();
    const start = new Date();
    start.setHours(0);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: 'Could not get stepCount: ' + error,
        });
      },
      console.log(this.state.pastStepCount)
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  /* this function will dump the entire state into long term storage */
  saveData = async () => {
    let data = JSON.stringify(this.state);
    try {
      await AsyncStorage.setItem('data', data);
    } catch (error) { 
      console.log(error.message);
    }
  };

  /* this function will retrieve the stored information and put it back into state, hence why it is called when the page loads*/
  getData = async () => {
    try {
      let stuff = JSON.parse(await AsyncStorage.getItem('data'));
      Object.keys(stuff).map((key, index) => {
        this.setState({ [key]: stuff[key] });
      });
    } catch (error) {
      console.log(error.message);
    }
  };


  pickPageToRender = () => {
    if (this.state.page === 1) {
      return <Page1 pageChange={pageNum => this.setState({ page: pageNum })} />;
    }
    if (this.state.page === 2) {
      return <Page2 
        pageChange={pageNum => this.setState({ page: pageNum })} 
        getIntro = {this.state.introh}
        isPedometerAvailable = {this.state.isPedometerAvailable}
        pastStepCount = {this.state.pastStepCount}
        currentStepCount = {this.state.currentStepCount}
        saveIntro = {intro => this.setState({introh: intro}, () => this.saveData())}
        goal = {this.state.goal}
        name = {this.state.name}
        progress2 = {this.state.progress2}
        progress3 = {this.state.progress3}
        />;
    }
    if(this.state.page === 3) {
      return <PlanSetup 
        pageChange={pageNum => this.setState({ page: pageNum })}
        age = {this.state.age}
        weight = {this.state.weight}
        difficulty = {this.state.difficulty} 
        saveAge = {value => this.setState({age: value}, () => this.saveData())}
        saveWeight = {value => this.setState({weight: value}, () => this.saveData())}
        saveDifficulty = {value => this.setState({difficulty: value}, () => this.saveData())}
        saveGoal = {value => this.setState({goal: value}, () => this.saveData())}
        saveIntro = {intro => this.setState({introh: intro}, () => this.saveData())}
        />
        
    }
    if(this.state.page === 4) {
      return<Calendar pageChange={pageNum => this.setState({ page: pageNum })}
      saveIntro = {intro => this.setState({introh: intro}, () => this.saveData())}/>
    }
    if(this.state.page === 5) {
      return<Store pageChange={pageNum => this.setState({ page: pageNum })}
      />
    }
  };


  render() {
    return (
        <View style = {styles.container}>{this.pickPageToRender()}</View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    zIndex: -1,
    flex: 1,
    justifyContent: 'center',
  },
});
