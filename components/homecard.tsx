import { colors, spacingX, spacingY } from '@/constants/theme';
import { scale, verticalScale } from '@/utils/styling';
import * as Icons from "phosphor-react-native";
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import Typo from './typo';

const HomeCard = () => {
  return (
   
    <ImageBackground
    source={require("../assets/images/card.png")}
    resizeMode= "stretch"
    style = {styles.bgImage}
    >
        <View style={styles.container}>
            <View>
         {/* Total Balance */}
         <View style={styles.totalBalanceRow}>
           <Typo color = {colors.neutral800} size = {17} fontWeight = {"500"}>
          Total Balance
           </Typo>
         <Icons.DotsThreeOutline 
         size={verticalScale(23)}
            color = {colors.black}
         weight='fill'
         />
         </View>
         <Typo color = {colors.black}   fontWeight="bold" size={30} >
         ₹ 5000
         </Typo>
        </View>

        {/* total expense and income */}
        <View style = {styles.stats}>
         {/* income */}
         <View style = {{gap:verticalScale(5)}}>
         <View style = {styles.inconeExpense}>
         <View style = {styles.statsIcon}>
         <Icons.ArrowDown
         size={verticalScale(15)}
         color= {colors.black}
         weight='bold'
         />
         </View>
         <Typo size={16} color = {colors.neutral700} fontWeight = {"500"}>
            Income
         </Typo>
         </View>
         <View style = {{alignSelf:"center"}}>
         <Typo color= {colors.green} size={17} fontWeight={"600"}>
            ₹ 5000
         </Typo>
         </View>
         </View>

          {/* Expenses */}
          <View style = {{gap:verticalScale(5)}}>
         <View style = {styles.inconeExpense}>
         <View style = {styles.statsIcon}>
         <Icons.ArrowUp
         size={verticalScale(15)}
         color= {colors.black}
         weight='bold'
         />
         </View>
         <Typo size={16} color = {colors.neutral700} fontWeight = {"500"}>
            Expense
         </Typo>
         </View>
         <View style = {{alignSelf:"center"}}>
         <Typo color= {colors.rose} size={17} fontWeight={"600"}>
            ₹ 5000
         </Typo>
         </View>
         </View>
        </View>
        </View>
    </ImageBackground>
   
  )
}

export default HomeCard;

const styles = StyleSheet.create({

bgImage:{
    height: scale(210),
width: "100%",
},

container: {
padding: spacingX._20, 
paddingHorizontal: scale(23),
height: "87%",
width: "100%",
justifyContent: "space-between",
},

totalBalanceRow: {
flexDirection: "row",
justifyContent: "space-between", alignItems: "center",
marginBottom: spacingY._5,
},

stats: {
flexDirection: "row",
justifyContent: "space-between",
alignItems: "center",
},

statsIcon: {
backgroundColor: colors.neutral350,
padding: spacingY._5,
borderRadius: 50,
},

inconeExpense: {
flexDirection: "row", 
alignItems: "center",
gap: spacingY._7 ,
},

})