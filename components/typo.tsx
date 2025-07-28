import { colors } from '@/constants/theme'
import { TypoProps } from '@/type'
import { verticalScale } from '@/utils/styling'
import React from 'react'
import { StyleSheet, Text, TextStyle, View } from 'react-native'

const Typo = ({
    size,
    color = colors.text,
    fontWeight = "400",
    children,
    style,
    textProps = {}
  
}:TypoProps) => {
    
  const textStyle: TextStyle ={
    fontSize: size ? verticalScale(size) : verticalScale(18),
   color,
   fontWeight,

};

  return (
    <View>
      <Text style={[textStyle,style]} {...textProps}>{children}</Text>
    </View>
  )
}

export default Typo

//this styling function is unused because of future styling changes
const styles = StyleSheet.create({})