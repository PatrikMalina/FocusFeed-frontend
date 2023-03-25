import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import AppColors from './src/styling/AppColors';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <SignInScreen />
      {/* <SignUpScreen /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: AppColors.PRIMARY,
  },
});

export default App;
