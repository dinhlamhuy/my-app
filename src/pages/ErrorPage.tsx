import React from 'react'
import { Helmet } from 'react-helmet'

function ErrorPage() {
  return (
    <div>
        <Helmet>
      <title>Not Found</title>
      </Helmet>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img src={require('../assets/img/error404.jpg')} className='h-screen w-screen' />
    </div>
  )
}

export default ErrorPage
