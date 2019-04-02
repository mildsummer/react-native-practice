import React, { Component } from 'react';
import { Font } from 'expo';
import { createIconSet } from '@expo/vector-icons';
import iconsMap from './assets/fonts/icons.json';

// revise JSON which is created by icon-font-generator
const map = {};
Object.keys(iconsMap).forEach((name) => {
  map[name] = parseInt(iconsMap[name].replace(/\\/g, ''), 16);
});

//　load font file, then create an Iconset component
let IconSet = null;
const promise = Font.loadAsync({
  'icons': require('./assets/fonts/icons.ttf')
}).then(() => {
  IconSet = createIconSet(map, 'icons', 'icons.ttf');
});

export default class Icon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Component: IconSet
    };
    if (!IconSet) {
      promise.then(() => {
        this.setState({ Component: IconSet });
      });
    }
  }

  render() {
    const { Component } = this.state;
    return Component ? (
      <Component {...this.props} />
    ) : null;
  }
}
