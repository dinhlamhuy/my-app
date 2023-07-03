function Body() {
  return (
    <div>
      <p style={{ textAlign: 'center', fontSize: '30px', color: 'grey', fontWeight: 'bold' }}>Body</p>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <div className='grid grid-cols-1  sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 '>
        <div className='border'>w-1</div>
        <div className='border'>w-2</div>
        <div className='border'>w-3</div>
        <div className='border'>w-4</div>
        <div className='border'>w-5</div>
        <div className='border'>w-6</div>
        <div className='border'>w-7</div>
        <div className='border'>w-8</div>
        <div className='border'>w-9</div>
        <div className='border'>w-10</div>
      </div>
      <div className='mx-1 my-3  grid grid-cols-1 sm:grid-cols-4 md:grid-cols-8  lg:grid-cols-10 xl:grid-cols-12'>
        <button className='boder-teal-300 mx-1 h-24 rounded-full bg-blue-600 text-white hover:opacity-75 '>
          Nút 1
        </button>
        <button className='boder-teal-300 mx-1 h-24 rounded-full bg-blue-600 text-white hover:opacity-75 '>
          Nút 2
        </button>
        <button className='boder-teal-300 mx-1 h-24 rounded-full bg-blue-600 text-white hover:opacity-75 '>
          Nút 3
        </button>
        <button className='boder-teal-300 mx-1 h-24 rounded-full bg-blue-600 text-white hover:opacity-75 '>
          Nút 4
        </button>
        <button className='boder-teal-300 mx-1 h-24 rounded-full bg-blue-600 text-white hover:opacity-75 '>
          Nút 5
        </button>
        <button className='boder-teal-300 mx-1 h-24 rounded-full bg-blue-600 text-white hover:opacity-75 '>
          Nút 6
        </button>
        <button className='boder-teal-300 mx-1 h-24 rounded-full bg-blue-600 text-white hover:opacity-75 '>
          Nút 7
        </button>
        <button className='boder-teal-300 mx-1 h-24 rounded-full bg-blue-600 text-white hover:opacity-75 '>
          Nút 8
        </button>
        <button className='boder-teal-300 mx-1 h-24 rounded-full bg-blue-600 text-white hover:opacity-75 '>
          Nút 9
        </button>
        <button className='boder-teal-300 mx-1 h-24 rounded-full bg-blue-600 text-white hover:opacity-75 '>
          Nút 10
        </button>
        <button className='boder-teal-300 mx-1 h-24 rounded-full bg-blue-600 text-white hover:opacity-75 '>
          Nút 11
        </button>
        <button className='boder-teal-300 mx-1 h-24 rounded-full bg-blue-600 text-white hover:opacity-75 '>
          Nút 12
        </button>
      </div>
    </div>
  )
}
export default Body
