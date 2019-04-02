import React from 'react';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import Swiper from 'react-native-swiper';
import times from 'lodash.times';
import PinchZoomView from './src/PinchZoomView';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false
    };
  }

  render() {
    const { flag } = this.state;
    return (
      <View style={styles.container}>
        <PinchZoomView>
          <View style={styles.box} />
        </PinchZoomView>
        <Swiper
          showsButtons={true}
          renderPagination={(index, total) => (
            <View
              style={{
                position: 'absolute',
                width: '100%',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center'
              }}
            >
              {times(total).map((num) => (
                <Animatable.View
                  key={num}
                  duration={500}
                  transition={['backgroundColor']}
                  style={[
                    styles.pagination,
                    {
                      backgroundColor: num === index ? 'red' : 'pink'
                    }
                  ]}
                />
              ))}
            </View>
          )}
        >
          <View style={styles.slide1}>
            <Text style={styles.text}>Hello Swiper</Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.text}>Beautiful</Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.text}>And simple</Text>
          </View>
          <View style={styles.slide4}>
            <Text style={styles.text}>Swiper</Text>
          </View>
        </Swiper>
        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({
              flag: !flag
            });
          }}
        >
          <Animatable.View
            duration={3000}
            transition={['backgroundColor']}
            style={[
              styles.touchContainer,
              flag ? styles.pink : styles.lightGreen
            ]}
          />
        </TouchableWithoutFeedback>
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
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  touchContainer: {
    width: '100%',
    height: 200
  },
  pink: {
    backgroundColor: 'pink'
  },
  lightGreen: {
    backgroundColor: 'lightgreen'
  },
  pagination: {
    width: 20,
    height: 20,
    borderRadius: 10
  }
});
