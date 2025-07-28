import ScreenWrapper from '@/components/screenwrapper'
import Typo from '@/components/typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import Button from '../../components/button'


//we are using dynamically styling in this
const welcome = () => {

    const router = useRouter();

  return (
    <ScreenWrapper>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
   <View style = {styles.container}>
  {/* login button and image */}
  <View>

    <TouchableOpacity  onPress={()=> router.push("/(auth)/login")} style ={styles.loginButton} >
<Typo fontWeight={"500"}> Sign in</Typo>
    </TouchableOpacity>
    
<Animated.Image
entering = {FadeIn.duration(1000)}
source={require("../../assets/images/welcome.png")}
style = {styles.welcomeImage}
resizeMode="contain"
/>
  </View>
  {/* footer */}
  
 <View style = {styles.footer}>
    <Animated.View 
    entering = {FadeInDown.duration(1000).springify().damping(12)}
    style = {{alignItems:"center"}}>

   <Typo size={25} fontWeight={"600"}>
   Always take control
   </Typo>
   <Typo size ={25} fontWeight={"600"}>
     of your finances
   </Typo>
    </Animated.View>

    <Animated.View 
    entering = {FadeInDown.duration(1000).delay(100).springify().damping(12)}
    style = {{alignItems:"center", gap: 2}} >
    <Typo size={15} color = {colors.textLight}>
   finances must be arranged to set a better
   </Typo>
   <Typo size ={15} color = {colors.textLight}>
     lifestyle in future
   </Typo>
    </Animated.View>

    <Animated.View 
    entering = {FadeInDown.duration(1000).delay(200).springify().damping(12)}
    style = {styles.buttonContainer} >
   {/* button container*/}
  <Button onPress={()=> router.push("/(auth)/register")}>
    <Typo size={22} color=  {colors.neutral900} fontWeight={"600"}>Get Started</Typo>
  </Button>
    </Animated.View>
 </View>
   </View>
   </ScrollView>
    </ScreenWrapper>
     
   
  )
}

export default welcome

const styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent:'center',
    position: "relative",
    paddingTop:spacingY._7,
},
scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
welcomeImage:{
    width:"100%",
    height:verticalScale(300),
    alignSelf:"center",
    marginTop:verticalScale(100),
},
/*
loginButton: {
    alignSelf: 'flex-end',
    paddingRight: spacingX._20,
    paddingTop: spacingY._10, // or verticalScale(20)
    zIndex: 10, // to stay on top
  },
  */
//this is for sign in button css

loginButton:{
    alignSelf:"flex-end",
    position:"absolute",
    right:20,
    top:60,
    marginRight:spacingX._20,
},

footer:{
    backgroundColor:colors.neutral900,
    alignItems:"center",
    paddingTop:verticalScale(30),
    paddingBottom:verticalScale(45),
    gap:spacingY._20,
    shadowColor:"white",
    shadowOffset:{width:0,height:-10},
   elevation:10,
   shadowRadius:25,
   shadowOpacity:0.15,
},
/*
footer: {
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    gap: spacingY._20,
    shadowColor: "white",
    shadowOffset: { width: 0, height: -10 },
    elevation: 10,
    shadowRadius: 25,
    shadowOpacity: 0.15,
    minHeight: verticalScale(200), // Add this
  },
  */
buttonContainer:{
    width:"100%",
    paddingHorizontal: spacingX._25,
}
})