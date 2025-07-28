import { db } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/type";
import { doc, updateDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageservice";

export const updateUser = async(
 uid: string,
 UpdatedData: UserDataType

):Promise<ResponseType> =>{

try{

    if(UpdatedData.image && UpdatedData?.image?.uri){
        const imageUploadRes = await uploadFileToCloudinary(UpdatedData.image,"users");
        if(!imageUploadRes.success){
            return {success:false,msg:imageUploadRes.msg || "Failed to upload image"};
        } 
        UpdatedData.image = imageUploadRes.data;
    }


   const userRef = doc(db,"users",uid);
  await updateDoc(userRef,UpdatedData);

    return {success:true, msg: "user data Updated successfully"};
}
catch(error: any){
console.log("error Updating User",error);
return { success:false, msg: error?.message};
}
};

