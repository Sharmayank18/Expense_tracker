import BackButton from '@/components/backbutton';
import Button from '@/components/button';
import Header from '@/components/Header';
import ImageUpload from '@/components/imageUpload';
import Input from '@/components/input';
import ModalWrapper from '@/components/modalwrapper';
import Typo from '@/components/typo';
import { colors, spacingX, spacingY } from '@/constants/theme';
import { useAuth } from '@/contexts/authcontexts';
import { createOrUpdateWallet, deleteWallet } from '@/services/walletService';
import { WalletType } from '@/type';
import { scale, verticalScale } from '@/utils/styling';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Icons from "phosphor-react-native";
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';


const WalletModal = () => {

 const {user , updateUserData} = useAuth()
 
  const [wallet,setWallet] = useState<WalletType>({
    name:" ",
    image: null
    })
    
    const [loading, setLoading] = useState(false);
 const router = useRouter();

 const oldWallet:{name : string , id: string , image: string} = useLocalSearchParams();
 
 useEffect(()=>{
    if(oldWallet?.id){
        setWallet({
       name: oldWallet?.name,
       image: oldWallet?.image
        });
    }
 },[]);

    const onsubmit = async()=>{
      let {name,image} = wallet;

      if(!name.trim() || !image){
        alert("Please fill all the fields");
      }
      else{
        console.log("Good to go");
      }

    const data: WalletType= {
    name,
    image,
    uid: user?.uid
    };
    
    if(oldWallet?.id){
        data.id = oldWallet?.id
    }

      setLoading(true);
      const res = await createOrUpdateWallet( data );
      setLoading(false);
      console.log('result',res);
      if(res.success){
        router.back();
      }
      else{
        alert(res.msg);
      }
      }
    
   const onDelete = async()=>{
    
    if(!oldWallet.id) return;
    setLoading(true);
    const res = await deleteWallet(oldWallet?.id);
    setLoading(false);
    if(res.success){
        router.back();
    }
    else{
        window.confirm(res.msg);
    }
   }


   const showDeleteAlert = () => {
    const confirmed = window.confirm(
      "Are you sure you want to do this?\nThis action will remove all the transactions related to this wallet."
    );
    if (confirmed) {
      onDelete();
    } else {
      console.log("cancel delete");
    }
  };
  
   /* this will work on mobile / ios
   const showDeleteAlert = () =>{
    Alert.alert("confirm",
        "Are you sure you want to do this? \n This action will remove all the transactions related to this wallet",
        [
            {
               text: "Cancel",
               onPress: ()=> console.log("cancel delete"),
               style:'cancel'
            },
            {
                text: "Delete",
                onPress: ()=> onDelete(),
                style:'destructive'
             },
        ]
    );
   }
    */
    
  return (
    <ModalWrapper>
      <View style = {styles.container}>
     <Header 
     title = {oldWallet?.id ? "Update Wallet" : "New Wallet"}
     leftIcon = {<BackButton/>} 
     style = {{marginBottom:spacingY._10}}
     />

     {/* form */}
     <ScrollView contentContainerStyle = {styles.form}>
    
    <View style = {styles.inputContainer}>

  <Typo color = {colors.neutral200}>Wallet Name</Typo>
  
  <Input
  placeholder = "Wallet-Name"
  
  value={wallet.name}
  onChangeText={(value)=> 
    setWallet({...wallet,name: value})}
  />
  
    </View>

    <View style = {styles.inputContainer}>

<Typo color = {colors.neutral200}>Wallet icon</Typo>

{/* image input */}
<ImageUpload 
file={wallet.image}
onClear={()=> setWallet({...wallet, image: null})}
onSelect={(file)=> setWallet({...wallet, image : file})}
placeholder='Upload Image'
/>

  </View>
     </ScrollView>
      </View>

      {/* footer */}
      <View style = {styles.footer}>
        {
            oldWallet.id && !loading &&(
                <Button onPress={showDeleteAlert}
                style={{
                    backgroundColor: colors.rose,
                    paddingHorizontal:spacingX._15,
                }}>
                    <Icons.Trash 
                    color= {colors.white}
                    size={verticalScale(24)}
                    weight="bold"
                    />
                </Button>
            )
        }
     <Button onPress={onsubmit} loading = {loading} style={{flex : 1}}>
    <Typo color={colors.black} fontWeight={'700'}>
       {oldWallet?.id ? "Update Wallet" : "Add Wallet"}
        </Typo>
     </Button>
      
     </View>
    </ModalWrapper>
  )
}

export default WalletModal;

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