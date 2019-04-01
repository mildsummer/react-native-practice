import React from 'react';
import { StyleSheet, View } from 'react-native';
import PinchZoomView from './src/PinchZoomView';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <PinchZoomView>
          <View style={styles.box} />
        </PinchZoomView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
});
