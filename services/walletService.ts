import { db } from "@/config/firebase";
import { ResponseType, WalletType } from "@/type";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageservice";

export const createOrUpdateWallet = async(
    walletData : Partial<WalletType>

):Promise<ResponseType>=>{

    try{
  let walletToSave = {...walletData}

  if(walletData.image){
    const imageUploadRes = await uploadFileToCloudinary(walletData.image,"wallets");
    if(!imageUploadRes.success){
        return {success:false,msg:imageUploadRes.msg || "Failed to upload wallet icon"};
    } 
   walletToSave.image = imageUploadRes.data;
}
if(!walletData?.id){
    //new wallet
    walletToSave.amount = 0;
    walletToSave.totalIncome = 0;
    walletToSave.totalExpenses = 0;
    walletToSave.created = new Date();
}
const walletRef = walletData?.id ?
 doc(db,"wallets", walletData?.id) 
: doc(collection(db,"wallets"));

await setDoc(walletRef,walletToSave,{merge:true}); //updates only the data provided
return {success:true,data:{...walletToSave, id:walletRef.id}};
    }
    catch(error:any){
        console.log("error reating or updating wallet",error);
        return {success:false , msg:error.message};
    }
};

export const deleteWallet = async(walletId : string): Promise<ResponseType> => {
try{
const walletRef = doc(db,"wallets",walletId);
await deleteDoc(walletRef);

return {success:true , msg: "wallet Deleted successfully"};
}
catch(error:any){
console.log('error deleting wallet',error);
return {success:false , msg: error.message};
}
}