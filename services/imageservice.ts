
// this is used for react-native web and below commented one code used for react native mobile or ios
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { ResponseType } from "@/type";
import { Platform } from 'react-native';


const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

//promise are used for to perform asynchronous operations effectively like fetching data from api , accessing local storage , handling user 
//input and output
export const uploadFileToCloudinary = async (
  file: { uri?: string } | string,
  folderName: string
): Promise<ResponseType> => {
  try {
    if(!file) return {success:true,data:null};
    if (typeof file === 'string') {
      return { success: true, data: file };
    }

    if (file && file.uri) {
      const formData = new FormData();

      if (Platform.OS === 'web') {
        const response = await fetch(file.uri!);
        const blob = await response.blob();
        formData.append("file", blob, "file.jpg");
      } else {
        formData.append("file", {
          uri: file.uri,
          type: "image/jpeg",
          name: file.uri.split("/").pop() || "file.jpg",
        } as any);
      }

      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      formData.append("folder", folderName);

      const uploadResponse = await fetch(CLOUDINARY_API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await uploadResponse.json();

      console.log("Upload image result", data);

      return { success: true, data: data.secure_url };
    }

    return { success: true };
  } catch (error: any) {
    console.log("Error uploading file", error);
    return { success: false, msg: error.message || "Could not upload file" };
  }
};


export const getProfileImage = (file:any) =>{

    if(file && typeof file == 'string') return file;
  if(file && typeof file == 'object') return file.uri;

  return require('../assets/images/defaultAvatar.png');

};

export const getFilePath = (file:any) =>{

    if(file && typeof file == 'string') return file;
  if(file && typeof file == 'object') return file.uri;

  return null;

};


/*
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { ResponseType } from "@/type";
import axios from "axios";

const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`


export const uploadFileToCloudinary = async(
    file: {uri?:string} | string,
    folderName : string
): Promise<ResponseType> =>{

    try{
      
        if(typeof file == 'string'){
            return {success:true , data:file};
        }
// append means to add something after existing ones
        if(file && file.uri){
            const formData = new FormData();
            formData.append("file",{
                uri :file?.uri,
                type : "image/jpeg",
                name : file?.uri?.split("/").pop() || "file.jpg"
            }as any);
           formData.append("upload_preset",CLOUDINARY_UPLOAD_PRESET);
           formData.append("folder",folderName);
         
           //axios used for api calling
           const response = await axios.post(CLOUDINARY_API_URL,formData,{
            headers:{
           "Content-Type":"multipart/form-data"
           },
           });
           console.log('upload image result',response?.data);
           return {success:true,data : response?.data?.secure_url};
        }

        return {success:true};
    }
    catch(error:any){
        console.log("got error uploading file",error);
        return { success:false, msg:error.message || "could not upload a file"};
    }
} 
*/