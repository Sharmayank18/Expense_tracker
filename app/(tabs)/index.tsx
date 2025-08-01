import Button from "@/components/button";
import HomeCard from '@/components/homecard';
import ScreenWrapper from '@/components/screenwrapper';
import TransactionLists from '@/components/transactionLists';
import Typo from '@/components/typo';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { useAuth } from '@/contexts/authcontexts';
import { verticalScale } from '@/utils/styling';
import { router } from "expo-router";
import * as Icons from 'phosphor-react-native';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const Home = () => {

const {user} = useAuth();


  return (
    <ScreenWrapper>
        
     <View style={styles.container}>
      {/* header */}
      <View style = {styles.header}>
       <View style = {{gap:4}}>
      <Typo size={16} color = {colors.neutral400}>
        Hello,
      </Typo>
      <Typo size = {20} fontWeight = {"500"}>
     {user?.name}
      </Typo>
       </View>
       <TouchableOpacity style = {styles.searchIcon}>
      <Icons.MagnifyingGlass 
      size={verticalScale(22)}
      color = {colors.neutral200}
      weight= "bold"
      />
       </TouchableOpacity>
      </View>
      <ScrollView
      contentContainerStyle = {styles.scrollViewStyle}
      showsVerticalScrollIndicator = {false}
      >
     {/* card */}
     <View>
     <HomeCard/>
     </View>
     <TransactionLists 
     data = {[1,2,3]} 
      loading = {false}
      emptyListMessage= {"No transaction added yet"}
     title='Recent Transactions'
     />
      </ScrollView>
      <Button style = {styles.floatingButton} onPress= {()=>router.push("/(modals)/transactionModal") }>
        <Icons.Plus
        color = {colors.black}
        weight="bold"
        size={verticalScale(24)}
        />
      </Button>
     </View>
    </ScreenWrapper>
  )
}

export default Home;

const styles = StyleSheet.create({

container: { 
    flex: 1,
paddingHorizontal: spacingX._20, 
marginTop: verticalScale(8),
},

header: {
flexDirection: "row",
justifyContent: "space-between",
alignItems: "center",
marginBottom: spacingY._10,
},

searchIcon: { 
    backgroundColor: colors.neutral700,
    padding: spacingX._10,
    borderRadius: 50,
    },

    floatingButton: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: 100,
    position: "absolute",
    bottom: verticalScale(30), 
    right: verticalScale(30),
    },

    scrollViewStyle:{
    marginTop: spacingY._10,
    paddingBottom: verticalScale(100),
    gap: spacingY._25,
    },
})