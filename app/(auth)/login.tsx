import BackButton from '@/components/backbutton'
import Input from '@/components/input'
import ScreenWrapper from '@/components/screenwrapper'
import Typo from '@/components/typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { useAuth } from '@/contexts/authcontexts'
import { verticalScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Button from '../../components/button'

const Login = () => {

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
const [isLoading,setisLoading] = useState(false);
const router = useRouter();
const {login: loginUser} = useAuth();

const handleSubmit = async() =>{

    if(!email || !password){
    alert("please fill all the fields");
    return;
}
setisLoading(true);
const res = await loginUser (email,password);
setisLoading(false);
if(!res.success){
    alert(res.msg);
}
};

  return (
    <ScreenWrapper>
  <View style = {styles.container}>
    {/* back button */}
    <BackButton iconSize={28} />
    <View style ={{gap:5,marginTop:spacingY._20}}>
  <Typo size={30} fontWeight={'800'}>
    Hey,
  </Typo>

  <Typo size={30} fontWeight={'800'}>
    Welcome Back
  </Typo>

    </View>
    {/* form */}
    <View style = {styles.form}>
  <Typo size={16} color={colors.textLighter}>
    Login now to track all your expenses
  </Typo>
  {/* input */}
  <Input placeholder='Enter your E-mail' 
  onChangeText={(value) => setEmail(value)}
  icon = {<Icons.At size = {verticalScale(26)} 
  color= {colors.black} weight="fill"
  />}/>

{/* for password */}
<Input placeholder='Enter your password' 
secureTextEntry
  onChangeText={(value) => setPassword(value)}
  icon = {<Icons.Lock size = {verticalScale(26)} 
  color= {colors.black} weight="fill"
  />}/>

<Typo size={14} color = {colors.text} style={{alignSelf:"flex-end"}}>
Forgot Password?
</Typo>


<Button loading = {isLoading} onPress = {handleSubmit}> 
<Typo fontWeight={"700"} color= {colors.black}  size={21}>
    Login 
</Typo>
</Button>

    </View>

{/* footer */}

<View style = {styles.footer}>
<Typo size={15} >
    Don't Have an Account? 
    <Pressable onPress={()=> router.navigate("/(auth)/register")}>
        <Typo size={15} fontWeight={"700"} color={colors.primary}>
      Sign Up
        </Typo>
    </Pressable>
</Typo>
</View>
  </View>
    </ScreenWrapper>
  )   
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal: spacingX._20,
        gap:spacingY._30
    },
    welcomeText:{
    fontSize:verticalScale(20),
    fontWeight:"bold",
    color: colors.text,
    },
form:{
    gap:spacingY._20,
},
forgotPassword:{
textAlign:"right",
fontWeight:500,
color:colors.text,
},
footer:{
flexDirection:"row",
justifyContent:"center",
alignItems:"center",
gap: 5,
},
footerText:{
textAlign:"center",
color:colors.text,
fontSize:verticalScale(15),
}
})