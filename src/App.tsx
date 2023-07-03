import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import './index.css'
import Login from './pages/Login'
import StockOutScreens from 'pages/StockOutScreens'
import ErrorPage from 'pages/ErrorPage'
import { PrivateRoutes } from 'components/PrivateRoutes'
import { PublicRoutes } from 'components/PublicRoutes'

import MenuScreens from 'pages/MenuScreens'
import { ChangeLanguage } from 'pages/ChangeLanguage'
import './i18n/i18n'
import { RegisterScreen } from 'pages/RegisterScreens'
import { ExportLanguge } from 'pages/ExportLanguge'
import ModalCha from 'components/ModalCha'
import { ExportList } from 'pages/ExportList'
import CustomSidleBar from 'components/CustomSidleBar'
import StockInScreens from 'pages/StockInScreens'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path={'/'} element={<MenuScreens />} />
            <Route path={'/stock-in'} element={<StockInScreens />} />
            <Route path={'/stock-out'} element={<StockOutScreens />} />
          <Route path={'/language'} element={<ChangeLanguage />} />
          </Route>
          <Route element={<PublicRoutes />}>

          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<RegisterScreen />} />
          </Route>
          <Route path={'/*'} element={<ErrorPage />} />
          {/* <Route path={'/exportlanguage'} element={<ExportLanguge />} /> */}
          <Route path={'/reportstockout'} element={<ExportList />} />
          <Route path={'/CustomSidleBar'} element={<CustomSidleBar />} />
          <Route path={'/modal'} element={<ModalCha />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
