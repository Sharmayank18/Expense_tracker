import Header from '@/components/Header';
import ScreenWrapper from '@/components/screenwrapper';
import Typo from '@/components/typo';
import { auth } from '@/config/firebase';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { useAuth } from '@/contexts/authcontexts';
import { getProfileImage } from '@/services/imageservice';
import { accountOptionType } from '@/type';
import { verticalScale } from '@/utils/styling';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import * as Icons from 'phosphor-react-native';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const Profile = () => {

    const {user} = useAuth();
    const router = useRouter();
    const accountOptions:accountOptionType[]= [
{
    title : "Edit - Profile",
    icon:<Icons.User  size = {26}  color = {colors.white} weight = "fill" />,
        routeName: "/(modals)/profileModal",
        bgColor:"#6366f1",
    
},
{
    title : "Settings",
    icon:<Icons.GearSix  size = {26}  color = {colors.white} weight = "fill" />,
       // routeName: "/(modals)/profileModal",
        bgColor:colors.rose,
    
},
{
    title : "Privacy Policy",
    icon:<Icons.Lock  size = {26}  color = {colors.white} weight = "fill" />,
        routeName: "/(modals)/profileModal",
        bgColor: colors.neutral600,
    
},
{
    title : "LogOut",
    icon:<Icons.Power  size = {26}  color = {colors.white} weight = "fill" />,
       // routeName: "/(modals)/profileModal",
        bgColor: colors.green,
    
},
]

const handleLogout = async () =>{
    await signOut(auth);
};

// Alert.alert work only in ios/android but doesn't gurantee to work in web browser so it's need to use native
//javascript function window.confirm
const showLogoutAlert = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      handleLogout();
    } else {
      console.log("Cancelled logout");
    }
  };
  
 


const handlePress = (item:accountOptionType) => {
    if(item.title == 'LogOut'){
     showLogoutAlert();
    }
    if(item.routeName) router.push(item.routeName);
};

  return (
    <ScreenWrapper>

<ScrollView 
    contentContainerStyle={styles.scrollContainer} 
    showsVerticalScrollIndicator={false}
  >

      <View style = {styles.container}>
     <Header title='Profile'  style={{marginVertical:spacingY._10}}/>


     {/*userinfo*/}
     <View style = {styles.userInfo}>
{/*avatar*/}
<View>
{/*User Image */}

<Image source={getProfileImage(user?.image)}
style = {styles.avatar}
contentFit='cover'
transition={100}
/>

</View>


{/*name and email*/}
<View style ={styles.namecontainer}>
    <Typo fontWeight={"600"} size={24} color = {colors.neutral100}>
    {user?.name}
    </Typo>
    <Typo  size={15} color = {colors.neutral400}>
    {user?.email}
    </Typo>
</View>
     </View>

     {/* account options */}
     <View style = {styles.accountOptions}>
        {
            accountOptions.map((item,index)=>{
                return(
                   <View  style = {styles.listItem}>
                    <TouchableOpacity style = {styles.flexRow} 
                   
                    onPress = {()=>handlePress(item)}>
                   {/* icon*/}
                   <View style={[
                    styles.listIcon,
                  {
                    backgroundColor:item?.bgColor,
                  },
                ]}
                   >
                   {item.icon && item.icon}
                   </View>
                   <Typo size={16} style={{flex:1}} fontWeight={"500"}>
                   {item.title}
                   </Typo>
                   <Icons.CaretRight
                   size={verticalScale(20)}
                   weight='bold'
                   color = {colors.white}
                   />
                    </TouchableOpacity>
                
                   </View>
                )
            }
        )
        }
     </View>
        </View>
        </ScrollView >
    </ScreenWrapper>
  )
}

export default Profile;

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:spacingX._20
    },
    userInfo:{
        marginTop: verticalScale(30),
        alignItems:"center",
        gap:spacingY._15
    },
    avatarContainer:{
        position:"relative",
        alignSelf:"center"
    },
    avatar:{
        alignSelf:"center",
        backgroundColor:colors.neutral300,
        height: verticalScale(135),
        width: verticalScale(135),
        borderRadius:200,
    },
    editIcon:{
        position:"absolute",
        bottom: 5,
        right: 8,
        borderRadius:50,
        backgroundColor:colors.neutral100,
        shadowColor:colors.black,
        shadowOffset:{width:0,height:0},
 shadowOpacity:0.25,
 shadowRadius:10,
 padding:5,
 elevation:4
    },
    namecontainer:{
        gap:verticalScale(4),
        alignItems:"center",
    },
    listIcon:{
      
            height:verticalScale(44),
            width:verticalScale(44),
            backgroundColor:colors.neutral500,
            alignItems:"center",
            justifyContent:"center",
            borderRadius:radius._15,
            borderCurve:"continuous",
    },
    listItem:{
        marginBottom: verticalScale(17),
    },
    accountOptions:{
        marginTop:spacingY._35,
    },
    flexRow:{
        flexDirection:"row",
        alignItems:"center",
        gap:spacingX._10,
    },
    scrollContainer: {
        paddingBottom: 100, // Gives space so last items are not hidden behind tab bar
      },
});