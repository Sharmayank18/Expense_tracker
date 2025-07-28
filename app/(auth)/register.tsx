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

const Register = () => {

    /*
    const nameRef = useRef(" ");
const emailRef = useRef(" ");
const passwordRef = useRef(" ");
*/
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [isLoading,setisLoading] = useState(false);
const router = useRouter();
const {register:registerUser} = useAuth();

const handleSubmit = async() =>{

    if(!email || !password || !name){
    alert("please fill all the fields");
    return;
}
setisLoading(true);
const res = await registerUser(
    email,
    password,
    name
);
setisLoading(false);
console.log("register result:",res);
if(!res.success){
    alert(res.msg);
   console.log("sign up",res.msg);
}
}

  return (
    <ScreenWrapper>
  <View style = {styles.container}>
    {/* back button */}
    <BackButton iconSize={28} />
    <View style ={{gap:5,marginTop:spacingY._20}}>
  <Typo size={30} fontWeight={'800'}>
    Let's,
  </Typo>

  <Typo size={30} fontWeight={'800'}>
    Get Started
  </Typo>

    </View>
    {/* form */}
    <View style = {styles.form}>
  <Typo size={16} color={colors.textLighter}>
    Create an account to track all your expenses
  </Typo>
  {/* input */}

  <Input placeholder='Enter your name' 
  onChangeText={(value) => setName(value)}
  icon = {<Icons.User size = {verticalScale(26)} 
  color= {colors.black} weight="fill"
  />}/>

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




<Button loading = {isLoading} onPress = {handleSubmit}> 
<Typo fontWeight={"700"} color= {colors.black}  size={21}>
    Sign up 
</Typo>
</Button>

    </View>

{/* footer 
push function create new route everytime when call
but navigate function work on the same given route which is declared earlier
*/}

<View style = {styles.footer}>
<Typo size={15} >
    Already have an account ?
    <Pressable onPress={()=> router.navigate("/(auth)/login")}>
        <Typo size={15} fontWeight={"700"} color={colors.primary}>
      Login
        </Typo>
    </Pressable>
</Typo>
</View>
  </View>
    </ScreenWrapper>
  )   
}

export default Register

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