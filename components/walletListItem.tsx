import { colors, radius, spacingX } from '@/constants/theme'
import { WalletType } from '@/type'
import { verticalScale } from '@/utils/styling'
import { Image } from 'expo-image'
import { Router } from 'expo-router'
import * as Icon from 'phosphor-react-native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Typo from './typo'

const WalletListItem = ({
index,
item,
router
}:{
item: WalletType,
index : number,
router: Router,
}) => {

    const openWallet = () => {
    router.push({
        pathname:"/(modals)/walletModal",
        params:{
            id: item?.id,
            image: item?.image,
            name: item?.name
        }

    })
    }
  return (
    <View>
     <TouchableOpacity style = {styles.container} onPress={openWallet}>
    <View style = {styles.imageContainer}>
    <Image
    style = {{flex: 1}}
    source = {item?.image}
    contentFit = "cover"
    transition = {100}
    />
    </View>
    <View style = {styles.nameContainer}>
        <Typo size={16} >
            {item?.name}
        </Typo>
        <Typo size={14} color= {colors.neutral300}>
        ₹ {item?.amount}
        </Typo>
       
    </View>
    <Icon.CaretRight
        size={verticalScale(20)}
        color={colors.white}
        weight= "bold"
        />

     </TouchableOpacity>
    </View>
  )
}

export default WalletListItem

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: verticalScale(17),
      // padding: spacingX._15,
    },
    imageContainer: {
      height: verticalScale(45),
      width: verticalScale(45),
      borderWidth: 1,
      borderColor: colors.neutral600,
      borderRadius: radius._12,
      borderCurve: "continuous",
      overflow: "hidden",
    },
    nameContainer: {
      flex: 1,
      gap: 2,
      marginLeft: spacingX._10,
    },
  });
  