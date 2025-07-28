import BackButton from '@/components/backbutton';
import Button from '@/components/button';
import Header from '@/components/Header';
import ImageUpload from '@/components/imageUpload';
import Input from '@/components/input';
import ModalWrapper from '@/components/modalwrapper';
import Typo from '@/components/typo';
import { expenseCategories, transactionTypes } from '@/constants/data';
import { colors, radius, spacingX, spacingY } from '@/constants/theme';
import { useAuth } from '@/contexts/authcontexts';
import useFetchData from '@/hooks/useFetchData';
import { createOrUpdateTransaction } from '@/services/transactionService';
import { deleteWallet } from '@/services/walletService';
import { TransactionType, WalletType } from '@/type';
import { scale, verticalScale } from '@/utils/styling';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { orderBy, where } from 'firebase/firestore';
import * as Icons from "phosphor-react-native";
import React, { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const TransactionModal = () => {

 const {user } = useAuth()
 
  const [transaction,setTransaction] = useState<TransactionType>({
   type:'expense',
   amount : 0,
   description: "",
   date: new Date(),
   walletId : "",
   image : null
    })
    
    const [loading, setLoading] = useState(false);
 const router = useRouter();
 const [showDatePicker , setshowDatePicker] = useState(false);

 const oldTransaction:{name : string , id: string , image: string} = useLocalSearchParams();

 const {
    data: Wallets = [],
    loading: WalletLoading,
    error: WalletError,
  } = useFetchData<WalletType>("wallets", 
    user?.uid?[
    where("uid", "==", user.uid),
    orderBy("created", "desc"),
  ]:[]);

   const onsubmit = async()=>{
    
    const {type,amount,description,date,category,walletId,image} = transaction;

    if(!walletId || !date || !amount ||(type == "expense" && !category)){
        alert("Please fill all the fields");
        return;
    }

    console.log("good to go");

    let transactionData: TransactionType = {
        type,
        amount,
        description,
        category,
        date,
        walletId,
        image,
        uid: user?.uid,
    };
    console.log("Transaction data:",transactionData);

    setLoading(true);
    const res = await createOrUpdateTransaction(transactionData);

    setLoading(false);
    if(res.success){
        router.back();
    }
else{
    alert(res.msg);
}
      }
   
   const onDelete = async()=>{
    
    if(!oldTransaction.id) return;
    setLoading(true);
    const res = await deleteWallet(oldTransaction?.id);
    setLoading(false);
    if(res.success){
        router.back();
    }
    else{
        window.confirm(res.msg);
    }
   }

  

   const onDateChange = (event: any, selectedDate: any) => {
   const currentDate = selectedDate || transaction.date;
   setTransaction({...transaction, date: currentDate});
  };

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
     title = {oldTransaction?.id ? "Update Transaction" : "New Transaction"}
     leftIcon = {<BackButton/>} 
     style = {{marginBottom:spacingY._10}}
     />

     {/* form */}
     <ScrollView contentContainerStyle = {styles.form} showsVerticalScrollIndicator = {false}>
    
    {/* Expense or iccome type */}
    <View style = {styles.inputContainer} >

  <Typo color = {colors.neutral200} size={16}>Type</Typo>
  
  {/* Dropdown here */}

  <Dropdown
          style={styles.dropdownContainer}
          activeColor= {colors.neutral700}
          //placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelectedText}
          iconStyle={styles.dropdownIcon}
          data={transactionTypes}
          maxHeight={300}
          labelField="label"
          valueField="value"
          itemTextStyle = {styles.dropdownItemText}
          itemContainerStyle = {styles.dropdownItemContainer}
          containerStyle = {styles.dropdownListContainer}
          //placeholder={!isFocus ? 'Select item' : '...'}
          
          // transaction tyope is income or expense
          value={transaction.type}
         
          onChange={item => {
            setTransaction({...transaction , type: item.value})
          }}
       
        />
         </View>

{/* Wallet type */}
         <View style = {styles.inputContainer}>
 <Typo color = {colors.neutral200} size={16}>wallet</Typo>
<Dropdown
          style={styles.dropdownContainer}
          activeColor= {colors.neutral700}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelectedText}
          iconStyle={styles.dropdownIcon}
          data={Wallets.map((wallet)=>({
             label: `${wallet?.name} (₹${wallet?.amount})`,
             value: wallet?.id,
          }))}
          
          maxHeight={300}
          labelField="label"
          valueField="value"
          itemTextStyle = {styles.dropdownItemText}
          itemContainerStyle = {styles.dropdownItemContainer}
          containerStyle = {styles.dropdownListContainer}
          placeholder={"Select Wallet"}
          
          // transaction tyope is income or expense
          value={transaction.walletId}
         
          onChange={item => {
            setTransaction({...transaction , walletId: item.value || ""})
          }}
       
        />
    </View>

{/* Expense category */}

{transaction.type == "expense" &&(
 <View style = {styles.inputContainer}>
 <Typo color = {colors.neutral200} size={16}>Expense Category</Typo>
<Dropdown
          style={styles.dropdownContainer}
          activeColor= {colors.neutral700}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelectedText}
          iconStyle={styles.dropdownIcon}
          data={Object.values(expenseCategories)}
          
          maxHeight={300}
          labelField="label"
          valueField="value"
          itemTextStyle = {styles.dropdownItemText}
          itemContainerStyle = {styles.dropdownItemContainer}
          containerStyle = {styles.dropdownListContainer}
          placeholder={"Select Category"}
          
          // transaction tyope is income or expense
          value={transaction.category}
         
          onChange={(item) => {
            setTransaction({...transaction , category: item.value || "",

            })
          }}
       
        />
    </View>

)}

{/* date picker */}

<View style = {styles.inputContainer}>
<Typo color = {colors.neutral200} size={16}>Date</Typo>

{!showDatePicker &&(
    <Pressable 
    style = {styles.dateInput}
    onPress={()=>setshowDatePicker(false)}
    >
 <Typo size={14}>
{(transaction.date as Date ).toLocaleDateString()}
 </Typo>
    </Pressable>
)}

{showDatePicker &&(
<View style = {Platform.OS == "web" && styles.iosDatePicker}>
<DateTimePicker
value={transaction.date as Date}
mode='date'
display='spinner'
onChange={onDateChange}
/>

</View>
)}
  </View>

   {/* amount */}
   <View style = {styles.inputContainer}>
  <Typo color = {colors.neutral200} size={16}>Amount</Typo>
  <Input
  //placeholder = "Wallet-Name"
  keyboardType="numeric"
  value={transaction.amount?.toString()}
  onChangeText={(value)=> 
    setTransaction({...transaction,
        amount: Number(value.replace(/[^0-9]/g,""))})}
  />
  
    </View>

{/*Description */}
    <View style = {styles.inputContainer}>
    <View style = {styles.flexRow}>
    <Typo color = {colors.neutral200} size={16}>Description</Typo>
    <Typo color = {colors.neutral500} size={14}>(optional)</Typo>
    </View>
  
  <Input
  //placeholder = "Wallet-Name"
  
  value={transaction.description}
  multiline
  containerStyle={{
flexDirection: "row",
height : verticalScale(100),
alignItems : "flex-start",
paddingVertical : 15,
  }
  }
  onChangeText={(value)=> 
    setTransaction({...transaction,
       description: value,})
    }
  />
    </View>

<View style = {styles.inputContainer}>
    <View style = {styles.flexRow}>
<Typo color = {colors.neutral200} size={16}>Receipt</Typo>
<Typo color = {colors.neutral500} size={14}>(optional)</Typo>
</View>
{/* image input */}
<ImageUpload 
file={transaction.image}
onClear={()=> setTransaction({...transaction, image: null})}
onSelect={(file)=> setTransaction({...transaction, image : file})}
placeholder='Upload Image'
/>
 
  </View>
     </ScrollView>
      </View>

      {/* footer */}
      <View style = {styles.footer}>
        {
            oldTransaction.id && !loading &&(
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
       {oldTransaction?.id ? "Update" : "Submit"}
        </Typo>
     </Button>
      
     </View>
    </ModalWrapper>
  )
}

export default TransactionModal;

const styles = StyleSheet.create({
    
    container:{
        flex: 1,
        paddingHorizontal:spacingY._20,
    },

    form: {
        gap: spacingY._20,
    paddingVertical: spacingY._15, 
    paddingBottom: spacingY._40,
    },
    
    footer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center", paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingY._15,
    borderTopColor: colors.neutral700, marginBottom: spacingY._5,
    borderTopWidth: 1,
    },
    
    inputContainer: {
        gap: spacingY._10,
    },
    
    iosDropDown: {
    flexDirection: "row",
    height: verticalScale(54),
    alignItems: "center",
    justifyContent: "center",
    fontSize: verticalScale (14),
    borderWidth: 1,
    color: colors.white,
    borderColor:colors.neutral300,
    borderRadius:radius._17,
    borderCurve: "continuous",
    },

    androidDropDown:{
    // flexDirection: "row", 
    height: verticalScale(54), 
    alignItems: "center", 
    justifyContent: "center", 
    borderWidth: 1,
    fontSize: verticalScale(14),
     color: colors.white,
    borderColor: colors.neutral300,
     borderRadius: radius._17, 
     borderCurve: "continuous",
    // paddingHorizontal: spacingX._15,
    },

    flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._5,
    },
    
    dateInput: {
        flexDirection: "row",
        height: verticalScale(54),
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.neutral300,
        borderRadius: radius._17, 
        borderCurve: "continuous",
        paddingHorizontal: spacingX._15,
    },
    
    iosDatePicker: {
 // backgroundColor: "red",
    },
    
    datePickerButton: {
        backgroundColor: colors.neutral700, 
        alignSelf: "flex-end",
        padding: spacingY._7,
        marginRight: spacingX._7,
        paddingHorizontal: spacingY._15,
        borderRadius: radius._10,
    },
    
    dropdownContainer: {
        height: verticalScale (54), 
        borderWidth: 1,
        borderColor: colors.neutral300, 
        paddingHorizontal: spacingX._15,
        borderRadius: radius._15,
        borderCurve: "continuous",
    },
    
    dropdownItemText: { 
        color: colors.white 
    }, 
       
    dropdownSelectedText: {
        color: colors.white,
        fontSize: verticalScale(14),
    },
    
    dropdownListContainer: {
    backgroundColor:
    colors.neutral900,
    borderRadius: radius._15,
    borderCurve: "continuous",
    paddingVertical: spacingY._7,
    top: 5,
    borderColor: colors.neutral500,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
    },

    dropdownPlaceholder: { 
        color: colors.white,
    },
    
    dropdownItemContainer: {
        borderRadius: radius._15, 
        marginHorizontal: spacingX._7,
    },
    
    dropdownIcon: {
        height: verticalScale(30),
        tintColor: colors.neutral300,
    },
    
   
})