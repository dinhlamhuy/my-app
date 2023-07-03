import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ChangeLanguageservice } from 'services/languageServices'

export const ChangeLanguage = () => {
  const { t, i18n } = useTranslation()
  const changeLanguage = async (lng: 'EN' | 'VN' | 'TW' | 'MM') => {
    i18n.changeLanguage(lng)
    const response = await ChangeLanguageservice(lng)

    const userDataString = localStorage.getItem('userData')
    if (userDataString !== null) {
      const userData = JSON.parse(userDataString)
      userData.TLLanguage = lng
      localStorage.setItem('userData', JSON.stringify(userData))
    }
    console.log('Message: ', response.Message)
  }

  return (
    <div className='h-screen w-screen bg-blue-50'>
        <Helmet>
      <title>{t('btnLanguage')} - WareHouse</title>
      </Helmet>
      <div className='  flex  min-h-full flex-col justify-center '>
        <div className='sm:mx-18 mx-14 rounded-md border bg-white px-8 py-12 drop-shadow-lg sm:px-6 md:mx-32  md:px-12 lg:mx-64 lg:px-20 xl:mx-96 xl:px-28 '>
          <div className='  float-none mx-auto  grid w-full max-w-sm'>
            <h2 className=' text-center text-2xl font-bold leading-8 tracking-tight text-gray-500'>
              {t('btnLanguage')}!
            </h2>
          </div>
          <div className='mx-auto mt-5 grid w-full max-w-sm grid-cols-1 md:grid-cols-4  '>
            <div className='text-center'>
              <button
                style={{ height: '70px', width: '70px', fontSize: '13px' }}
                className='m-3 rounded-full  border-2 border-teal-400 p-0'
                onClick={() => changeLanguage('VN')}
              >
                <img src={require('../assets/img/vietnam.png')} className='w-full ' alt='Vietnamese' />
              </button>
            </div>
            <div className='text-center'>
              <button
                style={{ height: '70px', width: '70px', fontSize: '13px' }}
                className='m-3 rounded-full  border-2 border-teal-400 p-0'
                onClick={() => changeLanguage('EN')}
              >
                <img src={require('../assets/img/english.png')} className='w-full ' alt='English' />
              </button>
            </div>
            <div className='text-center'>
              <button
                style={{ height: '70px', width: '70px', fontSize: '13px' }}
                className='m-3 rounded-full  border-2 border-teal-400 p-0'
                onClick={() => changeLanguage('TW')}
              >
                <img src={require('../assets/img/taiwan.png')} className='w-full ' alt='Taiwan' />
              </button>
            </div>
            <div className='text-center'>
              <button
                style={{ height: '70px', width: '70px', fontSize: '13px' }}
                className='m-3 grid-cols-2 rounded-full   border-2 border-teal-400 p-0'
                onClick={() => changeLanguage('MM')}
              >
                <img src={require('../assets/img/myanmar.png')} className='w-full ' alt='Myanmar' />
              </button>
            </div>
          </div>
          <div className='mt-5 w-full text-center '>
            <Link
              to='/'
              className='mx-auto rounded-lg bg-blue-100  px-10 py-3 font-bold text-teal-700 drop-shadow-md hover:bg-blue-200 hover:drop-shadow-xl'
            >
              {t('btnExit')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
