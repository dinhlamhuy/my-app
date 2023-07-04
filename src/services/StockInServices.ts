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
    var obj={
        Barcode:Barcode,
        User_ID:User_ID
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
    var obj={
        Barcode:Barcode,
        Rack:Rack,
        User_ID:User_ID
    }
    return axios.post('setMaterialRack',obj).then((response: any) => {
      return response.Data;
    });
  } catch (error) {
    console.log(error);
  }
};