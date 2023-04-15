import {View, TextInput, StyleSheet} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppColors from '../../styling/AppColors';

type CustomInput = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
  iconName: string;
  iconSize: number;
  isPassword?: boolean;
};

const CustomInput = ({
  value,
  setValue,
  placeholder,
  iconName,
  iconSize,
  isPassword = false,
}: CustomInput) => {
  const [notShown, setNotShown] = useState(true);
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          style={styles.input}
          secureTextEntry={isPassword && notShown}
        />
      </View>
      <View style={styles.icon}>
        {isPassword === false ? (
          <MaterialIcons.Button
            backgroundColor={AppColors.DEFAULT_BACKGROUND}
            color="gray"
            name={iconName}
            size={iconSize}
            style={{
              paddingRight: 0,
              paddingBottom: 2,
              paddingTop: 2,
            }}
          />
        ) : (
          <MaterialIcons.Button
            backgroundColor={AppColors.DEFAULT_BACKGROUND}
            color={notShown ? 'gray' : 'black'}
            name={iconName}
            size={iconSize}
            onPress={() => setNotShown(!notShown)}
            style={{
              paddingRight: 0,
              paddingBottom: 2,
              paddingTop: 2,
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingVertical: 15,
    flexDirection: 'row',
  },

  container: {
    width: '90%',
    paddingVertical: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 0.8,
  },

  icon: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.8,
  },

  input: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

export default CustomInput;
