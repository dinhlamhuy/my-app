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
import CustomModalPass from 'components/CustomModalPass'
import { LogUser } from 'services/AuthServices'
import { useNavigate } from 'react-router-dom'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
const MenuScreens = () => {
  const { t } = useTranslation()
  // const userData = useSelector((state: RootState) => state.account.user);
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalIsOpenPass, setModalIsOpenPass] = useState(false)

  const userDataJSON = localStorage.getItem('userData')
  const userDatas = userDataJSON ? JSON.parse(userDataJSON) : ''
  const [oldpassword, setOldPassword] = useState('')
  const [newpassword, setNewPassword] = useState('')
  const [repassword, setRePassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const navigate = useNavigate()
  const openModal = async () => {
    setModalIsOpen(true)
    await LogUser(userDatas.User_ID, 'Function: frmLanguages()')
  }
  const openModalPass = async () => {
    setModalIsOpenPass(true)
    await LogUser(userDatas.User_ID, 'Function: frmForm_Change_Pass()')
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }
  const closeModalPass = () => {
    setModalIsOpenPass(false)
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
  const HandleStockIn = async () => {
    await LogUser(userDatas.User_ID, 'Function: frmStock_In()')
    navigate('/stock-in')
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
          <button
            onClick={HandleStockIn}
            className=' buttonMenuStockIn mx-auto  rounded-2xl  bg-white  drop-shadow-md    hover:opacity-75 '
          ></button>

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
          <button
            onClick={openModalPass}
            className=' buttonMenuPassword mx-auto  rounded-2xl  bg-white drop-shadow-md   hover:opacity-75'
          ></button>

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

      <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
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
            className='mx-auto rounded-lg px-10 py-2  font-bold text-white drop-shadow-md hover:bg-teal-700 hover:outline  hover:drop-shadow-xl'
          >
            {t('btnExit')}
          </button>
        </div>
      </CustomModal>
      {/* Change password */}
      <CustomModalPass isOpen={modalIsOpenPass} onClose={closeModalPass}>
        <div className='mx-auto grid h-full w-full max-w-sm  grid-cols-1  '>
          <div className='text-center text-2xl font-bold tracking-tight text-white ' style={{ fontSize: '30px' }}>
            {t('btnChangepassword')}!
          </div>
          <div className=' relative font-bold tracking-tight text-white' style={{ fontSize: '30px' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Mật khẩu cũ'
              className=' w-full max-w-sm rounded-full border border-slate-300 bg-transparent p-2 text-sm font-medium leading-6 placeholder:italic focus:outline-red-500'
            />
            <button
              type='button'
              className='absolute inset-y-0 right-0 -top-5 flex cursor-pointer items-center pr-3'
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
          <div className=' relative font-bold tracking-tight text-white' style={{ fontSize: '30px' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Mật khẩu mới'
              className=' w-full max-w-sm rounded-full border border-slate-300 bg-transparent p-2 text-sm font-medium leading-6 placeholder:italic focus:outline-red-500'
            />
            <button
              type='button'
              className='absolute inset-y-0 right-0 -top-5 flex cursor-pointer items-center pr-3'
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
          <div className=' relative font-bold tracking-tight text-white' style={{ fontSize: '30px' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Nhập lại mật khẩu mới'
              className=' w-full max-w-sm rounded-full border border-slate-300 bg-transparent p-2 text-sm font-medium leading-6 placeholder:italic focus:outline-red-500'
            />
            <button
              type='button'
              className='absolute inset-y-0 right-0 -top-5 flex cursor-pointer items-center pr-3'
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
        </div>
        <div className=' w-full text-center my-3'>
          <button
            // onClick={closeModal}
            className='mx-auto rounded-lg px-10 py-2  font-bold text-white drop-shadow-md hover:bg-green-700 hover:outline  hover:drop-shadow-xl'
          >
            {t('btnChangepassword')}
          </button>
          <button
            onClick={closeModal}
            className='mx-auto rounded-lg px-10 py-2  font-bold text-white drop-shadow-md hover:bg-teal-700 hover:outline  hover:drop-shadow-xl'
          >
            {t('btnExit')}
          </button>
        </div>
      </CustomModalPass>
    </div>
  )
}

export default MenuScreens
