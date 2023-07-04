import React from 'react'


const Loading= () =>{
  return (
    <span className='flex '>

    <svg xmlns='http://www.w3.org/2000/svg'  width='24' height='24' viewBox='0 0 24 24'>
      <circle cx='12' cy='12' r='10' fill='none' strokeWidth='2' stroke='#fff'>
        <animate
          attributeName='stroke-dasharray'
          attributeType='XML'
          from='0, 50'
          to='45, 5'
          dur='1s'
          repeatCount='indefinite'
        />
        <animate
          attributeName='stroke-dashoffset'
          attributeType='XML'
          from='0'
          to='-35'
          dur='1s'
          repeatCount='indefinite'
        />
      </circle>
    </svg>
    </span>

  )
}
export default Loading;