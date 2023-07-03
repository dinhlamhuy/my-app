// import axios from "axios";
// import md5 from "util/md5";
import { Md5 } from 'ts-md5';
import axios from "../axios";
import {  internalIpV4 } from 'internal-ip'

export const Loginservice = async (User_ID: string, Password: string) => {
  try {
    const passmd5 = Md5.hashStr(Password);
    const obj = {
      User_ID: User_ID,
      User_Password: passmd5,
    };

    return axios.post('Login', obj).then((response: any) => {
      return response;
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const Registerservice = async (User_ID: string, Password: string, User_Name: string, TLLanguage:string ) => {
  const passmd5 = Md5.hashStr(Password);
  try {
    const IPv4=await internalIpV4()
    const obj = {
      User_ID: User_ID,
      User_Password: passmd5,
      User_Name:User_Name,
      TLLanguage:TLLanguage,
      IP4_Address:IPv4
    }
    return axios.post('register', obj).then((response: any) => {
      //console.log("Kết quả trả về" , response)
      return response;
    });
    
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const LogUser= async(User_ID: string,Program_Log: string)=>{
  try{
    const IPv4=await internalIpV4()
    const obj = {
      User_ID: User_ID,
      IP4_Address:IPv4,
      Program_Log:Program_Log
    }
    return axios.post('LogUser', obj).then((response: any) => {
      console.log("Kết quả trả về" , response)
      return response;
    });
  }catch(error){
    console.log(error);
  }
}



