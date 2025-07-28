import Loading from '@/components/loading';
import ScreenWrapper from '@/components/screenwrapper';
import Typo from '@/components/typo';
import WalletListItem from '@/components/walletListItem';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { useAuth } from '@/contexts/authcontexts';
import useFetchData from '@/hooks/useFetchData';
import { WalletType } from '@/type';
import { verticalScale } from '@/utils/styling';
import { useRouter } from 'expo-router';
import { orderBy, where } from 'firebase/firestore';
import * as Icons from "phosphor-react-native";
import React, { useMemo } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

const Wallet = () => {

    const router = useRouter();
  const {user} = useAuth();

  if (!user?.uid) {
    return <Loading/>; // Or a <Loading /> spinner if you want
  }

  const {
    data: Wallets = [],
    loading,
    error,
  } = useFetchData<WalletType>("wallets", [
    where("uid", "==", user.uid),
    orderBy("created", "desc"),
  ]);

  console.log("wallets:",Wallets.length);
  console.log("Wallets:", Wallets);


  const getTotalBalance = useMemo(() => {
    const total = Wallets.reduce((sum, item) => {
      return sum + (item.amount || 0);
    }, 0);
    console.log("Total Balance Calculated:", total); // for debug
    return total;
  }, [Wallets]);

  return (
    <ScreenWrapper style={{backgroundColor:colors.black}}>
      <View style = {styles.container}>
     {/* balance view */}
     <View style = {styles.balanceView}>
    <View style = {{alignItems:"center"}}>
    <Typo size={45} fontWeight={"500"}>
        {/* to fixed is the inbuilt function for representing balance in two decimal points */}
    ₹{getTotalBalance.toFixed(2)}
    </Typo>
    <Typo size={16} color = {colors.neutral300}>
        Total Balance
    </Typo>
    </View>
     </View>
    
     {/* Wallets */}
     <View style = {styles.wallets}>
     {/* Header */}
     <View style = {styles.flexRow}>
    <Typo size={16} fontWeight={"500"}>
        MY Wallets
    </Typo>
{/* touchable opacity used for registred an events such as buttons views */}
    <TouchableOpacity onPress={()=> router.push("/(modals)/walletModal")}>
    <Icons.PlusCircle
    weight='fill'
    color= {colors.primary} 
    size={verticalScale(33)}
    />
    </TouchableOpacity>
     </View>
    {loading && <Loading/>}

    <FlatList 
    data = {Wallets}
    renderItem={({item , index})=>{
        return (
        <WalletListItem item = {item} index = {index} router = {router}/>
        );
    }}
   contentContainerStyle = {styles.listStyle}
    />
     </View>
     
      </View>
    </ScreenWrapper>
  )
}

export default Wallet;

const styles = StyleSheet.create({

container:{
flex: 1,
justifyContent:"space-between",
},

balanceView:{
    height:verticalScale(160),
     backgroundColor: colors.black,
     justifyContent:"center",
     alignItems:"center"
},

   flexRow:{
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:spacingY._10,
   },

    wallets:{
    flex:1,
    backgroundColor:colors.neutral900,
borderTopLeftRadius:radius._30,
borderTopRightRadius:radius._30,
padding:spacingX._25,
paddingTop:spacingX._20
    },

    lifestyle:{
        paddingVertical:spacingY._25,
        paddingTop:spacingY._15
    },

    listStyle:{
        paddingVertical:spacingY._25,
        padding:spacingX._25,
    },

})