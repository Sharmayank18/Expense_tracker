import { AuthContextType, UserType } from "@/type";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";

const AuthContext = createContext<AuthContextType | null >(null);

// FC is functional component

export const AuthProvider:React.FC<{children: React.ReactNode} >= ({
    children,
})=> {

const [user,setUser] = useState<UserType>(null);
const router = useRouter();

//it will tell whether is user is login or logout
useEffect(()=>{
    
const unsub = onAuthStateChanged(auth,(firebaseUser)=>{
    console.log("firebase user:",firebaseUser);

    //user login
if(firebaseUser){
    setUser({
uid:firebaseUser?.uid,
email:firebaseUser?.email,
name: firebaseUser?.displayName,
    });
    updateUserData(firebaseUser.uid);
    router.replace("/(tabs)");
}

//user logout
else{
    //no User (logout)
    setUser(null);
    router.replace("/(auth)/welcome");
    
}
});
return() => unsub();
},[]);

const login = async(email: string , password: string) =>{

try{
await signInWithEmailAndPassword(auth,email,password);
return {success:true};
}
catch(err:any){
let msg = err.message;
console.log("error message:",msg);

if(msg.includes("(auth/invalid-credential)")) msg = "wrong credentials"; 
if(msg.includes("(auth/invalid-email)")) msg = "Invalid email"; 
return {success:false,msg};
}
};

const register = async(email: string , password: string,name:string) =>{

    try{
  let response = await createUserWithEmailAndPassword(
auth,
email,
password
  );
  await setDoc(doc(db,"users",response?.user?.uid),{
    name,
    email,
    uid:response?.user?.uid,
  });
  return {success:true};
    }
    catch(err:any){
    let msg = err.message;
    console.log("error message:",msg);

    if(msg.includes("(auth/email-already-in-use)")) msg = "This email is already in use"; 

    return {success:false,msg};
    }
    };

    const updateUserData = async(uid : string)=>{
        try{
      const docRef = doc(db,"users",uid);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
    const data = docSnap.data();
    const userData: UserType ={
 uid:data?.uid,
 email: data.email || null,
 name: data.name || null,
 image: data.image || null,

    };
    setUser({...userData});
      }
        }
        catch(error:any){
            let msg = error.message;
            //return {success:false,msg};
            console.log('error:',error);
            }
    }
    const contextvalue:AuthContextType = {
        user,
        setUser,
        login,
        register,
       updateUserData

    }
    return(
        <AuthContext.Provider value= {contextvalue}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType =>{
    const context = useContext(AuthContext);
    if(!context){
throw new Error ("useAuth must be wrapped within an AuthProvider");

    }
    return context;
}