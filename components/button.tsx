import { colors, radius } from '@/constants/theme'
import { CustomButtonProps } from '@/type'
import { verticalScale } from '@/utils/styling'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Loading from './loading'

const Button = ({
style,
onPress,
loading = false,
children,

}:CustomButtonProps) => {

    if(loading){
        return (
            <View style = {[styles.button,style,{backgroundColor: "transparent"}]}> 
          {/* loading component*/}
          <Loading/>
            </View>
        )
  }

  return (
    <TouchableOpacity onPress={onPress} style = {[styles.button, style]}>
        {children}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    button:{
    backgroundColor:colors.primary,
    borderRadius: radius._17,
    borderCurve:"continuous",
    height: verticalScale(52),
    justifyContent: "center",
    alignItems: "center",
    }
})