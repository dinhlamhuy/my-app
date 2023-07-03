/* eslint-disable @typescript-eslint/no-unused-vars */
import { changeLanguage } from 'i18next'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch } from 'store'
import { ReactComponent as LoadingIcon } from '../assets/img/loading.svg'

import { login } from 'store/authSlice'
import { Helmet } from 'react-helmet'
import { LogUser } from 'services/AuthServices'



function Login() {
  const { t, i18n } = useTranslation()
  const ChangeLanguage = (lng: 'EN' | 'VN' | 'TW' | 'MM') => {
    i18n.changeLanguage(lng)
  }
  //coMMent đoạn dịch văn bản
  const placeholderUserID = t('dcmUser_ID')
  const placeholderPass = t('lblPassword')
  
  const [isLoading, setisLoading] = useState(false)
  const [inputUserid, setInputUserid] = useState('')
  const [inputPass, setInputPass] = useState('')
  const [message, setMessage] = useState('')

  const handleChangeInputUser = (event: any) => {
    setInputUserid(event.target.value)
    // console.log(event.target.value)
  }
  const handleChangeInputPass = (event: any) => {
    setInputPass(event.target.value)
    // console.log(event.target.value)
  }

  const dispatch: AppDispatch = useDispatch()

  const handleLogin = async () => {
    setisLoading(true)
    setMessage('')
    if(inputUserid !== '' || inputPass !== ''){
      await dispatch(login({ User_ID: inputUserid, Password: inputPass }))
        .unwrap()
        .then(async(userData: any) => {
          console.log('Logged in:', userData)
          if (userData.Data) {
            await LogUser(inputUserid, 'Function: LoginProcedure()');
            localStorage.setItem('userData', JSON.stringify(userData.Data));
            setMessage('Đăng nhập thành công')
            window.location.href = '/'
          } else {
            setMessage(userData.Message)
          }
          setisLoading(false)
        })
        .catch((error: any) => {
          console.error('Login failed:', error)
        })

    }else{
      setMessage('Không được để trống');
      setisLoading(false)

    }
  }

  return (
    <div className='h-screen w-screen bgLogin'>
      <Helmet>
      <title>{t('btnLogin')} - WareHouse</title>
      </Helmet>
      <div className='  flex  min-h-full flex-col justify-center '>
        <div className='sm:mx-18 mx-14 rounded-md border bgcontentLogin  px-8 py-12 drop-shadow-lg sm:px-6 md:mx-32  md:px-12 lg:mx-64 lg:px-20 xl:mx-96 xl:px-28 '>
          <div className='  mx-auto grid  w-full max-w-sm '>
            <h2 className=' text-center text-3xl font-bold leading-8 tracking-tight text-white'>
              {t('btnLogin')}
            </h2>
          </div>
          <div className='mx-auto mt-5  w-full max-w-sm space-y-5'>
            <div>
              <input
                onChange={handleChangeInputUser}
                type='text'
                value={inputUserid}
                className='block  w-full max-w-sm rounded-md border bg-transparent border-slate-300 p-2 text-sm font-medium leading-6 placeholder:italic focus:outline-red-500'
                placeholder={placeholderUserID}
                maxLength={10} required
              />
            </div>
            <div>
              <input
                onChange={handleChangeInputPass}
                type='password'
                value={inputPass}
                className='block w-full max-w-sm rounded-md border bg-transparent border-slate-300 p-2 text-sm font-medium leading-6 placeholder:italic focus:outline-red-500'
                placeholder={placeholderPass}
                maxLength={15} required
              />
            </div>
            <div>{message != '' ? message : ''}</div>
            <div>
              <button
                onClick={handleLogin}
                className={`mx-auto w-full rounded-lg outline outline-1  px-3 py-2 font-bold text-gray-500    ${isLoading ? 'disabled cursor-no-drop' : 'hover:bg-gray-800  hover:text-white'}`} disabled={isLoading}
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
                    {t('btnLogin')}
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className='mx-auto mt-2 w-full max-w-sm'>
            {/* Bạn chưa có tài khoản?&emsp; */}
            <Link to='/register' className='text-center font-bold text-blue-800 hover:opacity-75'>
            {t('btnRegister')}?
            </Link>
          </div>
          <div className='mx-auto mt-5 grid w-full max-w-sm grid-cols-4 md:grid-cols-4  '>
            <div className='text-center'>
              <button
                style={{ height: '40px', width: '40px', fontSize: '13px' }}
                className='group m-3 rounded-full border border-teal-400 p-0'
                onClick={() => changeLanguage('VN')}
              >
                <img src={require('../assets/img/vietnam.png')} className='w-full ' alt='VNetnamese' />
              </button>
            </div>
            <div className='text-center'>
              <button
                style={{ height: '40px', width: '40px', fontSize: '13px' }}
                className='group m-3 rounded-full border   border-teal-400 p-0'
                onClick={() => changeLanguage('EN')}
              >
                <img src={require('../assets/img/english.png')} className='w-full ' alt='English' />
              </button>
            </div>
            <div className='text-center'>
              <button
                style={{ height: '40px', width: '40px', fontSize: '13px' }}
                className='group m-3 rounded-full border   border-teal-400 p-0'
                onClick={() => changeLanguage('TW')}
              >
                <img src={require('../assets/img/taiwan.png')} className='w-full ' alt='Taiwan' />
              </button>
            </div>
            <div className='text-center'>
              <button
                style={{ height: '40px', width: '40px', fontSize: '13px' }}
                className='group m-3 rounded-full  border   border-teal-400 p-0'
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
export default Login
