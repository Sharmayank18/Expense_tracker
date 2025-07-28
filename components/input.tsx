import { colors, radius, spacingX } from '@/constants/theme';
import { InputProps } from '@/type';
import { verticalScale } from '@/utils/styling';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const Input = (props: InputProps) => {
  return (
    <View style = {[styles.container,props.containerStyle && props.containerStyle]}>
        {
            props.icon && props.icon
        }
      <TextInput
       style ={[styles.input,
        props.inputStyle]}
        placeholderTextColor={colors.neutral400}
        ref = {props.inputRef && props.inputRef}
        {...props}
/>
    </View>
  )
}

export default Input;

const styles = StyleSheet.create({
    
    container:{
  flexDirection:"row",
  height:verticalScale(35),
  justifyContent:"center",
  alignItems:"center",
  borderWidth:1,
  backgroundColor:colors.neutral300,
  borderRadius:radius._10,
borderCurve:"continuous",
paddingHorizontal:spacingX._15,
gap: spacingX._10,
    },

input:{
    flex:8,
color:colors.black,
fontSize:verticalScale(18),
},
})