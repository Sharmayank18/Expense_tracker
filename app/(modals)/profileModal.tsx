import BackButton from '@/components/backbutton';
import Button from '@/components/button';
import Header from '@/components/Header';
import Input from '@/components/input';
import ModalWrapper from '@/components/modalwrapper';
import Typo from '@/components/typo';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { useAuth } from '@/contexts/authcontexts';
import { getProfileImage } from '@/services/imageservice';
import { updateUser } from '@/services/userservice';
import { UserDataType } from '@/type';
import { scale, verticalScale } from '@/utils/styling';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import * as Icons from "phosphor-react-native";
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';



const ProfileModal = () => {

 const {user , updateUserData} = useAuth()
 const [loading, setLoading] = useState(false);
 const router = useRouter();

  const [userData,setuserData] = useState<UserDataType>({
    name:" ",
    image: null
    })
    
    // edit profile content should be save in firebase
useEffect(()=>{

  setuserData({
    name:user?.name || "",
    image: user?.image || "",
  })

},[user]);

const onPickimage = async()=>{
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    //allowsEditing: true,
    aspect: [4, 3],
    quality: 0.5,
  });

  

  if (!result.canceled) {
    setuserData({...userData, image: result.assets[0]});
  }
}

    const onsubmit = async()=>{
      let {name,image} = userData;

      if(!name.trim()){
        alert("Please fill all the fields");
      }
      else{
        console.log("Good to go");
      }
      setLoading(true);
      const res = await updateUser(user?.uid as string , userData );
      setLoading(false);

      if(res.success){
        updateUserData(user?.uid as string)
        router.back();
      }
      else{
        alert(res.msg);
      }
      }
    

    
    
  return (
    <ModalWrapper>
      <View style = {styles.container}>
     <Header title = " Update Profile"  leftIcon = {<BackButton/>} 
     style = {{marginBottom:spacingY._10}}
     />
     {/* form */}
     <ScrollView contentContainerStyle = {styles.form}>
    <View style = {styles.avatarContainer}>
   <Image
   style = {styles.avatar}
   source={getProfileImage(userData.image)}
   contentFit = "cover"
   transition={100}

   />
   <TouchableOpacity onPress={onPickimage} style = {styles.editIcon}>
   <Icons.Pencil
   size = {verticalScale(20)}
   color = {colors.neutral800}
   />
   </TouchableOpacity>
    </View>
    <View style = {styles.container}>

  <Typo color = {colors.neutral200}>Name</Typo>
  
  <Input
  placeholder = "Name"
  value={userData.name}
  onChangeText={(value)=>
    setuserData({...userData,name: value})}
  />
  
    </View>
     </ScrollView>
      </View>

      {/* footer */}
      <View style = {styles.footer}>
     <Button onPress={onsubmit} loading = {loading} style={{flex : 1}}>
    <Typo color={colors.black} fontWeight={'700'}>Update</Typo>
     </Button>
      
     </View>
    </ModalWrapper>
  )
}

export default ProfileModal;

const styles = StyleSheet.create({
 
  container:{
  flex: 1,
  justifyContent:"space-between",
  paddingHorizontal:spacingY._20
  },

  footer:{
alignItems:"center",
justifyContent:"center",
flexDirection:"row",
paddingHorizontal:spacingX._20,
gap:scale(12),
paddingTop: spacingY._15,
borderTopColor:colors.neutral700,
marginBottom:spacingY._5,
  },

  form:{
gap: spacingY._30,
marginTop:spacingY._15,
  },

avatarContainer:{
  position:"relative",
  alignSelf:"center",
},

avatar:{
  alignSelf:"center",
  backgroundColor:colors.neutral300,
  height:verticalScale(135),
  width:verticalScale(135),
  borderRadius:200,
  borderWidth:1,
  borderColor:colors.neutral500,
},

editIcon:{
position:"absolute",
bottom:spacingY._7,
right:spacingY._5,
borderRadius:100,
backgroundColor:colors.neutral100,
shadowColor:colors.black,
shadowOffset: {width:0 , height:0},
shadowOpacity: 0.25,
shadowRadius: 10,
elevation: 4,
padding:spacingY._7,
},

inputContainer:{
  gap:spacingY._10
}
})