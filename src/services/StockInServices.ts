import axios from "../axios";
import {  internalIpV4 } from 'internal-ip'
export const getStockInByRack = async (Rack: string) => {
  try {
    return axios.get(`listStockInByRack/${Rack}`).then((response: any) => {
      return response.Data;
    });
  } catch (error) {
    console.log(error);
  }
};
export const setOutRack = async (Barcode: string, User_ID:string) => {
  try {
    const IPv4=await internalIpV4()
    var obj={
        Barcode:Barcode,
        User_ID:User_ID,
        IP4_Address:IPv4
    }
    return axios.post('OutRack',obj).then((response: any) => {
      return response.Data;
    });
  } catch (error) {
    console.log(error);
  }
};
export const setMaterialRack = async (Barcode: string,Rack:string, User_ID:string) => {
  try {
    const IPv4=await internalIpV4()
    var obj={
        Barcode:Barcode,
        Rack:Rack,
        User_ID:User_ID,
        IP4_Address:IPv4

    }
    return axios.post('setMaterialRack',obj).then((response: any) => {
      return response.Data;
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchExportInList = async (Status:string,Order_No:string, Material_No: string, Supplier: string, Date_Start: string, Date_End:string) => {
  try {
    var obj = {
      Status:Status,
      Order_No : Order_No,
      Material_No : Material_No,
      Supplier : Supplier,
      Date_Start: Date_Start,
      Date_End: Date_End
    }
    return axios.post('GetExportInList', obj).then((response: any) => {
      return response.Data;
    });
  } catch (error) {
    console.log(error);

  }
} 