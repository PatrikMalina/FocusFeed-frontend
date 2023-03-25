import {View, TextInput, StyleSheet} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';

type CustomInput = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
  isPassword?: boolean;
};

const CustomInput = ({
  value,
  setValue,
  placeholder,
  isPassword = false,
}: CustomInput) => {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          style={styles.input}
          secureTextEntry={isPassword}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 15,
  },

  container: {
    width: '100%',
    paddingVertical: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 0.8,
  },

  input: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

export default CustomInput;
