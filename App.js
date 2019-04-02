import React from 'react';
import * as Animatable from 'react-native-animatable';
import {
  StyleSheet, View, Text, FlatList, TouchableWithoutFeedback, AsyncStorage, Button
} from 'react-native';
import Swiper from 'react-native-swiper';
import times from 'lodash.times';
import PinchZoomView from './src/PinchZoomView';
import Icon from './src/Icon';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.clear = this.clear.bind(this);
    this.syncListItems = this.syncListItems.bind(this);
    this.state = {
      flag: false,
      listItems: []
    };
    this.loadListItems();
  }

  addItem() {
    const { listItems } = this.state;
    this.setState({
      listItems: listItems.concat({ key: `アイテム${listItems.length}` })
    }, this.syncListItems);
  }

  clear() {
    AsyncStorage.removeItem('listItems').then(() => {
      this.setState({ listItems: [] });
    }).catch((e) => {
      console.log(e);
    });
  }

  loadListItems() {
    AsyncStorage.getItem('listItems').then((data) => {
      if (data) {
        try {
          this.setState({ listItems: JSON.parse(data) });
        } catch (e) {
          console.log(e);
        }
      }
    }).catch((e) => {
      console.log(e);
    });
  }

  syncListItems() {
    const { listItems } = this.state;
    AsyncStorage.setItem('listItems', JSON.stringify(listItems))
      .catch((e) => {
      console.log(e);
    });
  }

  render() {
    const { flag, listItems } = this.state;
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
        <Icon name="login" color="white" size={30} />
        <FlatList
          data={listItems}
          renderItem={({item}) => <Text>{item.key}</Text>}
        />
        <Button
          title="add item"
          onPress={this.addItem}
        />
        <Button
          title="clear items"
          onPress={this.clear}
        />
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
