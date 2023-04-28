import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import AppColors from '../../styling';
import {CustomTypes} from '../../util/enums';
import {TailSpin} from 'react-loading-icons';

type CustomButton = {
  onPress: () => void;
  text: string;
  type?: CustomTypes;
  disabled?: boolean;
  isLoading?: boolean;
};

const CustomButton = ({
  onPress,
  text,
  type = CustomTypes.PRIMARY,
  disabled = false,
  isLoading = false,
}: CustomButton) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        {opacity: disabled ? 0.6 : 1},
      ]}>
      {isLoading ? (
        <ActivityIndicator
          color={AppColors.BUTTON_LOADING}
          size={25}
          style={{paddingHorizontal: 10}}
        />
      ) : (
        <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginVertical: 15,
    alignItems: 'center',
    borderRadius: 100,
  },

  container_primary: {
    backgroundColor: AppColors.BUTTON_PRIMARY,
  },
  container_secondary: {},
  container_tertiary: {
    marginVertical: 5,
  },

  text: {
    fontWeight: '400',
    fontSize: 18,
  },

  text_primary: {
    color: AppColors.BUTTON_PRIMARY_TEXT,
  },
  text_secondary: {},
  text_tertiary: {
    color: AppColors.BUTTON_TERTIARY_TEXT,
    fontSize: 15,
  },
});

export default CustomButton;
