import axios from 'axios'
import React, { ChangeEvent, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation, withTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Registerservice } from 'services/AuthServices'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
export const RegisterScreen = () => {
  const { t, i18n } = useTranslation()
  const [language, setLanguage] = useState('EN')
  const changeLanguage = (lng: 'EN' | 'VN' | 'TW' | 'MM') => {
    i18n.changeLanguage(lng)
    setLanguage(lng)
  }
  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  const placeholderUserID = t('dcmUser_ID')
  const placeholderPassword = t('lblPassword')
  const placeholderRePassword = t('lblConfirmNewPassword')
  const placeholderFullName = t('lblUser_Name')

  const [User_ID, setUser_ID] = useState('')
  const [MessageUser_ID, setMessageUser_ID] = useState('')
  const [Password, setPassword] = useState('')
  const [RePassword, setRePassword] = useState('')
  const [FullName, setFullName] = useState('')
  const [MessageFullName, setMessageFullName] = useState('')
  const [MessagePass, setMessagePass] = useState('')
  const [MessageRePass, setMessageRePass] = useState('')
  const [Message, setMessage] = useState('')
  var chuoi = ''

  function isInputValid(input: string): boolean {
    const regex = /^[^\\+{}[\]()*&^%$#@!`~|:;"'<>?=_-]*$/ // Biểu thức chính quy chỉ cho phép chữ cái, số và khoảng trắng
    return regex.test(input)
  }
  const handleFullName = (e: ChangeEvent<HTMLInputElement>) => {
    if (isInputValid(e.target.value)) {
      setMessageFullName('')
      setFullName(e.target.value)
    } else {
      const txtx = t('batfulname')
      // setMessageFullName("Name cannot contain special characters")
      setMessageFullName(txtx)
    }
  }

  const handleUser_ID = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    if (password.indexOf(' ') === -1) {
      setMessageUser_ID('')
      setUser_ID(e.target.value)
    } else {
      const txt = t('tsmuserid')
      setMessageUser_ID(txt)
    }
  }
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    if (password.indexOf(' ') === -1) {
      setMessagePass('')
      setPassword(e.target.value)
    } else {
      const txt = t('tsmpassword')
      setMessagePass(txt)
    }
  }
  const handleRePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value
    if (password.indexOf(' ') === -1) {
      setMessageRePass('')
      setRePassword(e.target.value)
    } else {
      const txt = t('tsmpassword')
      setMessageRePass(txt)
    }
  }
  const [isLoading, setisLoading] = useState(false)
  const handleRegister = async () => {
    try {
      if (Password !== '' && RePassword !== '' && FullName !== '' && User_ID !== '') {
        if (Password === RePassword && Password != '' && RePassword != '') {
          setMessagePass('')
          setisLoading(true)
          const response = await Registerservice(User_ID, Password, FullName, language)

          if (response.Message == 'Success') {
            chuoi = t('msgUpdateSuccesful')
            window.location.href = '/login'
          } else if (response.Message == 'Account already exists') {
            chuoi = t('mscExistingAccount')
            setisLoading(false)
          } else {
            chuoi = 'Error'
            setisLoading(false)
          }
          setMessage(chuoi)
        } else if (Password !== RePassword) {
          const string = t('msgComfirmNotCorrect')
          setMessage(string)
        }
      } else {
        const string = t('msgCompleteInformation')
        setMessage(string)
      }
      setisLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='h-screen w-screen bg-blue-50'>
      <Helmet>
        <title>{t('btnRegister')} - WareHouse</title>
      </Helmet>
      <div className='  bgLogin  flex min-h-full flex-col justify-center'>
        <div className='sm:mx-18 bgcontentLogin mx-14 rounded-md border px-8 py-10 drop-shadow-lg sm:px-6 md:mx-32  md:px-12 lg:mx-64 lg:px-20 xl:mx-96 xl:px-28 '>
          <div className='  mx-auto grid  w-full max-w-sm '>
            <h2 className=' text-center text-3xl font-bold leading-8 tracking-tight text-white'>{t('btnRegister')}!</h2>
          </div>
          <div className='mx-auto mt-5  w-full max-w-sm space-y-5'>
            <div>
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleFullName(e)}
                type='text'
                value={FullName}
                className='block  w-full max-w-sm rounded-md border border-slate-300 bg-transparent p-2 text-sm font-medium leading-6 placeholder:italic focus:outline-yellow-500'
                placeholder={placeholderFullName}
                maxLength={50}
              />
              <label htmlFor='' className='text-xs text-white'>
                {MessageFullName}
              </label>
            </div>

            <div>
              <input
                onChange={handleUser_ID}
                type='text'
                value={User_ID}
                className='block  w-full max-w-sm rounded-md border border-slate-300 bg-transparent p-2 text-sm font-medium leading-6 placeholder:italic focus:outline-yellow-500'
                placeholder={placeholderUserID}
                maxLength={10}
              />
              <label htmlFor='' className='text-xs text-white'>
                {MessageUser_ID}
              </label>
            </div>
            <div className='relative'>
              <input
                onChange={handlePassword}
                type={showPassword ? 'text' : 'password'}
                value={Password}
                className='block w-full max-w-sm rounded-md border border-slate-300 bg-transparent p-2 text-sm font-medium leading-6 placeholder:italic focus:outline-yellow-500'
                placeholder={placeholderPassword}
                maxLength={15}
              />
              <button
                type='button'
                className='absolute inset-y-0  right-0 flex cursor-pointer items-center pr-3'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
              <label htmlFor='' className='absolute text-xs text-white'>
                {MessagePass}
              </label>
            </div>
            <div className='relative'>
              <input
                onChange={handleRePassword}
                type={showPassword ? 'text' : 'password'}
                value={RePassword}
                className='block w-full max-w-sm rounded-md border border-slate-300 bg-transparent p-2 text-sm font-medium leading-6 placeholder:italic focus:outline-yellow-500'
                placeholder={placeholderRePassword}
                maxLength={15}
              />
              <button
                type='button'
                className='absolute inset-y-0  right-0 flex cursor-pointer items-center pr-3'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
              <label htmlFor='' className='absolute text-xs text-white'>
                {MessageRePass}
              </label>
            </div>

            <label htmlFor='' className='text-xs text-white'>
              {Message != '' ? Message : ''}
            </label>
            <div>
              <button
                onClick={handleRegister}
                className={`mx-auto w-full rounded-lg px-3 py-2 font-bold text-gray-300 outline outline-1    ${
                  isLoading ? 'disabled cursor-no-drop' : 'hover:bg-gray-800  hover:text-white'
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg
                    className='mx-auto h-7 animate-spin text-blue-500'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <circle cx='12' cy='12' r='10' />
                    <path d='M16 12a4 4 0 1 1-8 0' />
                  </svg>
                ) : (
                  <div className='h-7 ' style={{ fontSize: '18px' }}>
                    {t('btnRegister')}
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className='mx-auto mt-2 w-full max-w-sm'>
            {/* <label htmlFor=''>Bạn đã có tài khoản?</label> &ensp; */}
            <Link to='/login' className='text-center font-bold text-blue-800 hover:opacity-75'>
              {t('btnLogin')}?
            </Link>
          </div>

          <div className='mx-auto mt-5 grid w-full max-w-sm grid-cols-4 md:grid-cols-4  '>
            <div className='text-center'>
              <button
                style={{ height: '40px', width: '40px', fontSize: '13px' }}
                className='group m-3 rounded-full border border-2 border-teal-400 p-0'
                onClick={() => changeLanguage('VN')}
              >
                <img src={require('../assets/img/vietnam.png')} className='w-full ' alt='Vietnamese' />
              </button>
            </div>
            <div className='text-center'>
              <button
                style={{ height: '40px', width: '40px', fontSize: '13px' }}
                className='group m-3 rounded-full border border-2 border-teal-400 p-0'
                onClick={() => changeLanguage('EN')}
              >
                <img src={require('../assets/img/english.png')} className='w-full ' alt='English' />
              </button>
            </div>
            <div className='text-center'>
              <button
                style={{ height: '40px', width: '40px', fontSize: '13px' }}
                className='group m-3 rounded-full border border-2 border-teal-400 p-0'
                onClick={() => changeLanguage('TW')}
              >
                <img src={require('../assets/img/taiwan.png')} className='w-full ' alt='Taiwan' />
              </button>
            </div>
            <div className='text-center'>
              <button
                style={{ height: '40px', width: '40px', fontSize: '13px' }}
                className='group m-3 rounded-full  border border-2 border-teal-400 p-0'
                onClick={() => changeLanguage('MM')}
              >
                <img src={require('../assets/img/myanmar.png')} className='w-full ' alt='Myanmar' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
