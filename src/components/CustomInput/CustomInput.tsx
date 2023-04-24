import {View, TextInput, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppColors from '../../styling/AppColors';

const CustomInput = (props: any) => {
  const {
    field: {name, onChange, value},
    form: {errors},
    placeholder,
    iconName,
    iconSize,
    isPassword = false,
    ...inputProps
  } = props;

  const [notShown, setNotShown] = useState(true);

  const hasError = errors[name] && value !== '';
  const isCorrect = !errors[name] && value !== '';

  const borderColor = hasError
    ? 'red'
    : isCorrect
    ? AppColors.BUTTON_PRIMARY
    : styles.container.borderBottomColor;

  return (
    <>
      <View style={styles.root}>
        <View
          style={[
            styles.container,
            {
              borderBottomColor: borderColor,
            },
          ]}>
          <TextInput
            value={value}
            onChangeText={text => onChange(name)(text)}
            placeholder={placeholder}
            style={styles.input}
            secureTextEntry={isPassword && notShown}
            {...inputProps}
          />
        </View>
        <View
          style={[
            styles.icon,
            {
              borderBottomColor: borderColor,
            },
          ]}>
          {isPassword === false ? (
            <MaterialIcons.Button
              backgroundColor={AppColors.DEFAULT_BACKGROUND}
              color="gray"
              name={iconName}
              size={iconSize}
              style={{
                paddingRight: 0,
                paddingVertical: 2,
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
                paddingVertical: 2,
              }}
            />
          )}
        </View>
      </View>
      <View style={styles.errorMessage}>
        {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingTop: 15,
    paddingBottom: 2,
    flexDirection: 'row',
  },

  container: {
    width: '90%',
    paddingVertical: 2,
    borderBottomColor: AppColors.INPUT_BORDER_COLOR,
    borderBottomWidth: 1,
  },

  icon: {
    borderBottomColor: AppColors.INPUT_BORDER_COLOR,
    borderBottomWidth: 1,
  },

  input: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  errorMessage: {
    marginTop: 2,
    height: '3%',
  },

  errorText: {
    fontSize: 13,
    color: 'red',
  },
});

export default CustomInput;
