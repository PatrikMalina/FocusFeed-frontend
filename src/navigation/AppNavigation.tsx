import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {Screens} from '../util/enums';

const Stack = createNativeStackNavigator();

const screenOptions = {headerShown: false};

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.HOME}
      screenOptions={screenOptions}>
      <Stack.Screen name={Screens.HOME} component={HomeScreen} />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.SIGN_IN}
      screenOptions={screenOptions}>
      <Stack.Screen name={Screens.SIGN_IN} component={SignInScreen} />
      <Stack.Screen name={Screens.SIGN_UP} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

const AppNavigation = () => {
  useEffect(() => {}, []);

  return (
    <NavigationContainer>
      {/* {currentUser ? <AppStack /> : <AuthStack />} */}
      <AuthStack />
    </NavigationContainer>
  );
};

export default AppNavigation;
