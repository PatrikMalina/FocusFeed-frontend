import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {Screens} from '../util/enums';
import {RootState} from '../state';
import {useSelector} from 'react-redux';
import {Token} from '../util/interface';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommentScreen from '../screens/CommentScreen';
import FriendsScreen from '../screens/FriendsScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import ContactsScreen from '../screens/ContactsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {headerShown: false};

const TabScreens = () => {
  return (
    <Tab.Navigator
      initialRouteName={Screens.HOME}
      screenOptions={({route}): any => ({
        headerShown: false,
        tabBarIcon: ({focused, size}: any) => {
          let iconName = '';
          let routName = route.name;

          if (routName === Screens.HOME) {
            iconName = focused ? 'home' : 'home-outline';
          }

          if (routName === Screens.CONTACTS) {
            iconName = focused ? 'message' : 'message-outline';
          }
          return <Icons name={iconName} size={size} color={'black'} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name={Screens.HOME} component={HomeScreen} />
      <Tab.Screen name={Screens.CONTACTS} component={ContactsScreen} />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.TAB_SCREENS}
      screenOptions={screenOptions}>
      <Stack.Screen name={Screens.TAB_SCREENS} component={TabScreens} />
      <Stack.Screen name={Screens.FRIENDS} component={FriendsScreen} />
      <Stack.Screen name={Screens.COMMENT} component={CommentScreen} />
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
  const [currentToken, setCurrentToken] = useState<Token | null | undefined>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  const token = useSelector((state: RootState) => state.session);

  useEffect(() => {
    setCurrentToken(token);
  }, [token]);

  return (
    <NavigationContainer>
      {isLoading ? (
        <SplashScreen setLoading={setIsLoading} />
      ) : currentToken ? (
        <AppStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;
