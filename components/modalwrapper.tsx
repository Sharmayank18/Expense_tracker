import { colors, spacingY } from '@/constants/theme'
import { ModalWrapperProps } from '@/type'
import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'

const isWeb = Platform.OS === "web"

const ModalWrapper = ({
style,
    children,
    bg = colors.neutral800,

}:ModalWrapperProps) => {
  return (
    <View style= {[styles.container,{backgroundColor:bg},style && style]}>
     {children}
    </View>
  )
}

export default ModalWrapper

const styles = StyleSheet.create({

    container:{
  flex: 1,
  paddingTop: isWeb ? spacingY._15 : 50,
  paddingBottom: isWeb ? spacingY._20 : spacingY._10
    }
})