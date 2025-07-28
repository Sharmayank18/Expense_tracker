import { colors } from '@/constants/theme';
import { ScreenWrapperProps } from '@/type';
import React from 'react';
import { Dimensions, Platform, StatusBar, StyleSheet, View } from 'react-native';

const {height} = Dimensions.get("window");




const ScreenWrapper = ({style,children}:ScreenWrapperProps) => {
    
    // screen wrapper is using to make content below to notch in iphones
    let paddingTop = Platform.OS == "ios" ? height * 0.03 : 50;
  return (
    <View
    style={[
        {
            paddingTop,
            flex:1,
            backgroundColor:colors.neutral900
        },
      style,
    ]}
    >
  <StatusBar barStyle={'light-content'} />
      {children}
    </View>
  )
}

export default ScreenWrapper

const styles = StyleSheet.create({})