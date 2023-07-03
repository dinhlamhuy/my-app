import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translation_VN from '../translations/VN.json';
import translation_EN from '../translations/EN.json';
import translation_TW from '../translations/TW.json';
import translation_MM from '../translations/MM.json';


const resources = {
  EN: {
    all: translation_EN,
  },
  VN: {
    all: translation_VN,
  },
  TW: {
    all: translation_TW,
  },
  MM: {
    all: translation_MM,
  },
}
const defaultNS= 'all';
const lngDefault = localStorage.userData ? JSON.parse(localStorage.userData).TLLanguage :   'EN';


i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: lngDefault,
    ns:['all'],
    fallbackLng: lngDefault,
    defaultNS,
    interpolation: {
      escapeValue: false
    }
  });


export default i18n;