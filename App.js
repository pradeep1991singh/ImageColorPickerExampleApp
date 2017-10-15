/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Dimensions } from 'react-native';

import { ImageColorPicker } from 'react-native-image-color-picker';

export default class App extends Component {
  state = {
    palettes: [],
    loadingPalettes: true
  };

  pickerCallback = message => {
    if (message && message.nativeEvent && message.nativeEvent.data) {
      let messageData = JSON.parse(message.nativeEvent.data);
      if (messageData.message === 'imageColorPicker' && messageData.payload) {
        const palettes = messageData.payload;
        this.setState({ palettes, loadingPalettes: false });
      }
    }
  };

  render() {
    const { loadingPalettes, palettes } = this.state;
    let palettesView = [];
    if (palettes.length > 0) {
      palettesView = palettes.map(palette => (
        <View
          key={JSON.stringify(palette)}
          style={{
            flexDirection: 'row',
            backgroundColor: `rgba(${Object.values(palette).join(',')})`,
            width: 25,
            height: 25,
            marginBottom: 10
          }}
        />
      ));
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to ReactNative ImageColorPicker!
        </Text>
        <View style={styles.colorPalette}>
          <Text style={styles.loadingStyle}>
            Loading Color Palettes: {loadingPalettes}
          </Text>
          {palettes.length > 0 && palettesView}
        </View>
        <ImageColorPicker
          imageUrl="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/se/se-icon.png?v=93426798a1d4"
          imageWidth="250"
          imageHeight="250"
          pickerCallback={this.pickerCallback}
          pickerStyle={styles.pickerStyle}
        />
      </View>
    );
  }
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    marginTop: 20
  },
  welcome: {
    fontSize: 20,
    margin: 10
  },
  loadingStyle: {
    margin: 10
  },
  pickerStyle: {
    width: width
  },
  colorPalette: {
    flexDirection: 'row'
  }
});
