
import axios from "../axios";
import {  internalIpV4 } from 'internal-ip'
export const getMaterial = async (BarCode: string) => {
  try {
    return axios.get(`getMaterial/${BarCode}`).then((response: any) => {
      return response.Data;
    });
  } catch (error) {
    console.log(error);
  }
};

export const stockOutAll = async (Barcode: string, User_ID: string) => {
  try {
    const IPv4=await internalIpV4()
    var obj = {
      Barcode: Barcode,
      User_ID: User_ID,
      IP4_Address:IPv4,
    }
    return axios.post('stockoutall', obj).then((response: any) => {
      return response.Data;
    });
  } catch (error) {
    console.log(error);

  }
} 
export const ReBackstockOutAll = async (Barcode: string, User_ID: string) => {
  try {
    const IPv4=await internalIpV4()
    var obj = {
      Barcode: Barcode,
      User_ID: User_ID,
      IP4_Address:IPv4,
    }
    return axios.post('rebackstockoutall', obj).then((response: any) => {
      return response.Data;
    });
  } catch (error) {
    console.log(error);

  }
} 



export const stockOutTSL = async (Barcode: string, QTY: number, Tong_QTY:number, User_ID: string) => {
  try {
    const IPv4=await internalIpV4()
    var obj = {
      Barcode: Barcode,
      QTY: QTY,
      User_ID: User_ID,
      Tong_QTY:Tong_QTY,
      IP4_Address:IPv4,
    }
    return axios.post('stockout', obj).then((response: any) => {
      return response.Data;
    });
  } catch (error) {
    console.log(error);

  }
} 
export const searchMaterialNo = async (Material_No: string, Date_Start: string, Date_End:string) => {
  try {
    var obj = {
      Material_No : Material_No,
      Date_Start: Date_Start,
      Date_End: Date_End
    }
    return axios.post('getMaterialNo', obj).then((response: any) => {
      return response.Data;
    });
  } catch (error) {
    console.log(error);

  }
} 

export const searchExportList = async (Order_No:string, Material_No: string, Supplier: string, Date_Start: string, Date_End:string) => {
  try {
    var obj = {
      Order_No : Order_No,
      Material_No : Material_No,
      Supplier : Supplier,
      Date_Start: Date_Start,
      Date_End: Date_End
    }
    return axios.post('GetExportList', obj).then((response: any) => {
      return response.Data;
    });
  } catch (error) {
    console.log(error);

  }
} 


export const ghiLogStockOut=async(BarCode: string,  Program_Log:string)=>{
  try{
    const IPv4=await internalIpV4()
    var obj = {
      BarCode : BarCode,
      IP4_Address:IPv4,
      Program_Log:Program_Log
    }
    return axios.post('LogStockOut', obj).then((response: any) => {
      return response.Data;
    });
  }catch(error){
    console.log(error)
  }
}

export const ghiLogMaterial=async(BarCode: string,  Program_Log:string)=>{
  try{
    const IPv4=await internalIpV4()
    var obj = {
      BarCode : BarCode,
      IP4_Address:IPv4,
      Program_Log:Program_Log
    }
    return axios.post('LogMaterial', obj).then((response: any) => {
      return response.Data;
    });
  }catch(error){
    console.log(error)
  }
}