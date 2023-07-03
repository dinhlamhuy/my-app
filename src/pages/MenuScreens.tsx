import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from 'store'
import { selectuser } from 'store/authSelectors'
import { ChangeLanguageservice } from 'services/languageServices'
import i18n from 'i18n/i18n'
import CustomModal from 'components/CustomModal2'
import { LogUser } from 'services/AuthServices'
import { useNavigate } from 'react-router-dom'

const MenuScreens = () => {
  const { t } = useTranslation()
  // const userData = useSelector((state: RootState) => state.account.user);
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const userDataJSON = localStorage.getItem('userData')
  const userDatas = userDataJSON ? JSON.parse(userDataJSON) : ''
  const navigate = useNavigate()
  const openModal = async () => {
    setModalIsOpen(true)
    await LogUser(userDatas.User_ID, 'Function: frmLanguages()')
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }
  const handleLogout = async () => {
    const langs = t('msgLeaving')
    const confirmed = window.confirm(langs)
    if (confirmed) {
      await LogUser(userDatas.User_ID, 'Function: frmLogout()')
      localStorage.removeItem('userData')
      // window.location.href = '/login'
      navigate('/login')
    }
  }
  const HandleStockOut = async () => {
    await LogUser(userDatas.User_ID, 'Function: frmStockOut()')
    // window.location.href = '/stock-out'

    navigate('/stock-out')
  }

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
    <div className='background-container h-screen w-screen'>
      <Helmet>
        <title>WareHouse</title>
      </Helmet>
      <div className=' grid min-h-full  grid-cols-2 flex-col  justify-center py-4 sm:grid-cols-3 '>
        <div className='mx-auto my-auto  grid grid-rows-1 '>
          <Link
            to='/stock-in'
            className=' buttonMenuStockIn mx-auto  rounded-2xl  bg-white  drop-shadow-md    hover:opacity-75 '
          ></Link>

          <label className='mt-1 text-center font-medium text-white'>{t('btnStock_In')}</label>
        </div>
        <div className='mx-auto my-auto grid grid-rows-1  '>
          <button
            onClick={HandleStockOut}
            // to='/stock-out'
            className=' buttonMenuStockOut mx-auto  rounded-2xl  bg-white drop-shadow-md   hover:opacity-75'
          ></button>
          <label className='mt-1 text-center font-medium text-white'>{t('btnStock_Out')}</label>
        </div>
        <div className='mx-auto my-auto grid grid-rows-1  '>
          <Link
            to='/'
            className=' buttonMenuPassword mx-auto  rounded-2xl  bg-white drop-shadow-md   hover:opacity-75'
          />

          <label className='mt-1 text-center font-medium text-white'>{t('btnChangepassword')}</label>
        </div>
        <div className='mx-auto my-auto grid grid-rows-1  '>
          <button
            onClick={openModal}
            className='buttonMenu buttonMenuTranslate  mx-auto rounded-2xl   bg-white drop-shadow-md  hover:opacity-75'
          ></button>
          <label className='mt-1 text-center font-medium text-white'>{t('btnLanguage')}</label>
        </div>
        <div className='mx-auto my-auto grid grid-rows-1  '>
          <button
            onClick={handleLogout}
            className=' buttonMenu buttonMenuLogout  mx-auto rounded-2xl   bg-white drop-shadow-md  hover:opacity-75'
          ></button>
          <label className='mt-1 text-center font-medium text-white'>{t('btnLogout')}</label>
        </div>
      </div>

      <CustomModal
        isOpen={modalIsOpen}
        onClose={closeModal}
       
      >
        <div className='mx-auto grid h-full w-full max-w-sm  grid-cols-2 md:grid-cols-4  '>
          <div
            className=' col-span-2 text-center text-2xl font-bold tracking-tight text-white md:col-span-4'
            style={{ fontSize: '30px' }}
          >
            {t('btnLanguage')}!
          </div>

          <div className='text-center'>
            <button
              style={{ height: '60px', width: '60px', fontSize: '13px' }}
              className='m-3 rounded-full  border-2 border-teal-400 p-0'
              onClick={() => changeLanguage('VN')}
            >
              <img src={require('../assets/img/vietnam.png')} className='w-full ' alt='Vietnamese' />
            </button>
          </div>
          <div className='text-center'>
            <button
              style={{ height: '60px', width: '60px', fontSize: '13px' }}
              className='m-3 rounded-full  border-2 border-teal-400 p-0'
              onClick={() => changeLanguage('EN')}
            >
              <img src={require('../assets/img/english.png')} className='w-full ' alt='English' />
            </button>
          </div>
          <div className='text-center'>
            <button
              style={{ height: '60px', width: '60px', fontSize: '13px' }}
              className='m-3 rounded-full  border-2 border-teal-400 p-0'
              onClick={() => changeLanguage('TW')}
            >
              <img src={require('../assets/img/taiwan.png')} className='w-full ' alt='Taiwan' />
            </button>
          </div>
          <div className='text-center'>
            <button
              style={{ height: '60px', width: '60px', fontSize: '13px' }}
              className='m-3 grid-cols-2 rounded-full   border-2 border-teal-400 p-0'
              onClick={() => changeLanguage('MM')}
            >
              <img src={require('../assets/img/myanmar.png')} className='w-full ' alt='Myanmar' />
            </button>
          </div>
        </div>

        <div className=' w-full text-center '>
          <button
            onClick={closeModal}
            className='mx-auto rounded-lg text-white hover:outline  px-10 py-2 font-bold hover:bg-teal-700 drop-shadow-md  hover:drop-shadow-xl'
          >
            {t('btnExit')}
          </button>
        </div>
      </CustomModal>
    </div>
  )
}

export default MenuScreens
