import axios from "../axios";

export const Languageservice = async (lang: string) => {
  try {

    return axios.get(`getLanguage/${lang}`).then((response: any) => {
      return response;
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const ChangeLanguageservice = async (lang: string) => {
  try {
    const obj = {
      User_ID: JSON.parse(localStorage.userData).User_ID,
      TLLanguage:lang
    }
    return axios.post('changeLang',  obj ).then((response: any) => {
      console.log(response);
      return response;
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};