import { HeaderProps } from '@/type';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typo from './typo';

const Header = ({title = "" , leftIcon,style}:HeaderProps) => {
  return (
    <View style = {[styles.container,style]}>
     {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
     {
        title &&
        <Typo
        size = {22}
        fontWeight={"600"}
        >
            {title}

        </Typo>
     }
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50, // Or any other height that fits  needs
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      },
      leftIcon: {
        position: "absolute",
        left: 16, // Or any margin i  want
        zIndex: 1,
      },
      title: {
        textAlign: "center",
      },
})