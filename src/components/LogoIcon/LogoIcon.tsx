import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LogoIcon = () => {
  return (
    <View style={{marginTop: '10%'}}>
      <Text style={styles.text}>Focus</Text>
      <Text style={styles.text}>Feed</Text>
    </View>
  );
};

export default LogoIcon;

const styles = StyleSheet.create({
  text: {
    fontSize: 65,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: 'BentonSansExtraCompBlack',
    fontStyle: 'italic',
  },
});
