import {View, Text, Button} from 'react-native';
import React from 'react';

const HomeScreen = () => {
  return (
    <View>
      <Text>Signed in!</Text>
      <Button
        title="Sign out"
        onPress={() => {
          console.log('sign out');
        }}
      />
    </View>
  );
};

export default HomeScreen;
