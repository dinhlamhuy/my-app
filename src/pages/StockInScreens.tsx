import CustomModal from 'components/CustomModal'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function StockInScreens() {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const closeModal = () => {
    setModalIsOpen(false)
  }
  const openModal = async () => {
    // await LogUser(User_ID, 'Function: frmPartial_In_Out()')
    setModalIsOpen(true)
  }
  const { t } = useTranslation()
  return (
    <main className=' flex h-screen flex-col  text-white'>
      <Helmet>
        <title>{t('tsmStock_In')} - WareHouse</title>
      </Helmet>
      <div
        className='max-w-screen flex h-fit px-1  w-full flex-grow flex-col border-b-2 pb-1'
        style={{ backgroundColor: '#28374a' }}
      >
        <div className='h-full object-cover object-center'>

        
        {/* header  */}
        <div className=' mx-2 flex justify-between px-2 py-2  '>
          <Link
            to='/'
            className='text-center font-bold   hover:rounded-full hover:bg-teal-300'
            style={{ width: '30px' }}
          >
            <svg
              strokeLinecap='round'
              className='text-bold text-white'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'></path>
            </svg>
          </Link>

          <div>
            <p className='md:px32 border-b px-24 text-center   align-middle text-2xl font-bold text-white sm:px-28 '>
              {t('tsmStock_In')}
            </p>
          </div>
          <div className='mx-2 text-center  font-bold' style={{ width: '30px' }}>
            <Link to='/reportstockin'>
              <svg
                className='text-bold text-white'
                strokeLinecap='round'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z'
                ></path>
              </svg>
            </Link>
          </div>
        </div>
        {/* navbar  */}
        <div className='  mt-2 grid   grid-cols-2 '>
          {/* xuất hết số lượng của vật tư  */}
          <div className=' grid   w-full grid-cols-1   px-1  '>
            <div>
              <label
                htmlFor='chedo'
                className=' text-xs sm:text-xs  md:text-base md:text-sm  md:text-sm lg:text-base xl:text-base'
              >
                <input type='checkbox' id='chedo' />
                &ensp;{t('gpbMode')}
              </label>
            </div>
            <div className='grid grid-cols-2'>
              <div>
                <label
                  htmlFor='ke'
                  className=' text-xs sm:text-xs  md:text-base md:text-sm  md:text-sm lg:text-base xl:text-base'
                >
                  <input type='radio' id='ke' checked disabled />
                  &ensp;{t('lblShelves')}&emsp;&ensp;
                </label>
              </div>
              <div>
                {' '}
                <div className='  w-full text-xs md:my-2  md:text-sm lg:text-base '>
                  {t('lblQty_In')}
                  {/* {Content[Content.length - 1]?.Total_QTY || 0}{' '} */}
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2'>
              <div className=''>
                <label htmlFor=''>
                  {t('gpbScan')}: &emsp;
                  <input
                    type='text'
                    // value={btnSearch}
                    // placeholder={placeholderBarcode}
                    // onChange={handleChange}
                    // onPaste={handlePaste}
                    maxLength={16}
                    className='border-1 w-full rounded-full bg-[#1c2437] px-1 py-1 text-xs text-white outline outline-1 outline-white md:py-0  md:text-sm lg:w-fit lg:text-base'
                  />
                </label>
                {loading ? (
                  <div className='mt-1 flex '>
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                      <circle cx='12' cy='12' r='10' fill='none' strokeWidth='2' stroke='#000'>
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
                    &emsp;{' '}
                    <label htmlFor='' className='text-base text-gray-400 '>
                      Loading...
                    </label>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div>
                <div className='w-full text-xs md:my-2  md:text-sm lg:text-base  '>
                  {t('lblQty_Out')}
                  {/* {Content[Content.length - 1]?.QTY || 0}{' '} */}
                </div>
              </div>
            </div>
          </div>
          {/* xuất vật tư theo số lượng */}
          <div className='   grid w-full grid-cols-1  pr-2 '>
            <div className='mx-auto  grid w-full grid-cols-5 leading-2 gap-2'>
              <div></div>
              <div>
                <button className='w-full rounded-full p-2 outline outline-1 bg-gray-500' disabled>Nhập kho ERP</button>
              </div>
              <div>
                <button className='w-full rounded-full p-2 outline outline-1 bg-gray-500' disabled>Xuất kho ERP</button>
              </div>
              <div>
                <button className='w-full rounded-full p-2 outline outline-1 bg-[#141c30] hover:opacity-75'>Nhập kệ ERP</button>
              </div>
              <div></div>
            </div>
            <div className='mx-auto  grid w-full grid-cols-5 leading-2 gap-2'>
              <div>
                <button className='w-full rounded-full p-2 outline outline-1 bg-[#141c30] hover:opacity-75'>Thông tin</button>
              </div>
              <div>
                <button className='w-full rounded-full p-2 outline outline-1 bg-[#141c30] hover:opacity-75'>Thống kê</button>
              </div>
              <div>
                <button className='w-full rounded-full p-2 outline outline-1 bg-[#141c30] hover:opacity-75'>Kiểm kê</button>
              </div>
              <div>
                <button className='w-full rounded-full p-2 outline outline-1 bg-[#141c30] hover:opacity-75'>QC</button>
              </div>
              <div>
                <button className='w-full rounded-full p-2 outline outline-1 bg-gray-500' disabled>Nhập kho</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      {/* data view  */}

      <div
        className='max-w-screen h-3/4 overflow-x-auto overflow-y-auto pb-2 '
        style={{ backgroundColor: '#1c2437' }}
      >
        <table className='mt-0 w-full table-fixed text-center'>
          <thead className=' ' style={{ position: 'sticky', top: '0', backgroundColor: '#141c30' }}>
            <tr>
              <th className='w-[300rem] px-2' style={{ width: '150px' }}>
                {t('dcpBarcode')}
              </th>
              <th className='w-[300rem] px-2' style={{ width: '150px' }}>
                {t('dcmMaterial_No')}
              </th>
              <th className='w-[300rem] px-2' style={{ width: '150px' }}>
                {t('dcpRack')}
              </th>
              <th className='w-[300rem] px-2' style={{ width: '150px' }}>
                {t('dcmSupplier')}
              </th>
              <th className='w-[300rem] px-2' style={{ width: '200px' }}>
                {t('dcmMaterial_Name')}
              </th>
              <th className='w-[300rem] px-2' style={{ width: '80px' }}>
                {t('dcpColor')}
              </th>
              <th className='w-[300rem] px-2' style={{ width: '80px' }}>
                {t('dcmSize')}
              </th>
              <th className='w-[300rem] px-2' style={{ width: '80px' }}>
                {t('dcmQTY')}
              </th>
              <th className='w-[300rem] px-2' style={{ width: '100px' }}>
                {t('dcpPrint_QTY')}
              </th>
              <th className='w-[300rem] px-2' style={{ width: '150px' }}>
                {t('dcmOrder_No')}
              </th>
              <th className='w-[300rem] px-2' style={{ width: '80px' }}>
                {t('dcmRoll')}
              </th>
              <th className='w-[300rem] px-2' style={{ width: '150px' }}>
                {t('dcmProduction')}
              </th>
              <th className='w-[300rem] px-2' style={{ width: '220px' }}>
                {t('dcmSupplier_no')}
              </th>
              <th className='w-[300rem] px-2' style={{ width: '300px' }}>
                {t('dcmWork_Order')}
              </th>
              <th className='w-[300rem] px-2' style={{ width: '150px' }}>
                {t('dcmModify_Date')}
              </th>
              <th className='w-[300rem] px-2' style={{ width: '130px' }}>
                {t('dcmUser_Serial_Key')}
              </th>
              <th className='w-[300rem] px-2' style={{ width: '130px' }}>
                {t('lblQtyTotal')}
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {Content ? Content.map((row) => (
              <tr
                className='cursor-pointer hover:bg-[#141c30]'
                key={row.BarCode}
                onClick={(BarCode) => HandleTravekho(row.BarCode)}
              >
                <td>{row.BarCode}</td>
                <td>{row.Material_No}</td>
                <td>{row.Rack}</td>
                <td>{row.Supplier}</td>
                <td>{row.Material_Name}</td>
                <td>{row.Color}</td>
                <td>{row.Size}</td>
                <td>{row.QTY}</td>
                <td>{row.Print_QTY}</td>
                <td>{row.Order_No}</td>
                <td>{row.Roll}</td>
                <td>{moment(row.Modify_Date).format('DD/MM/YYYY')}</td>
                <td>{row.Supplier_No}</td>
                <td>{row.Work_Order}</td>
                <td>{moment(row.Modify_Date).format('DD/MM/YYYY')}</td>
                <td>{row.User_Serial_Key}</td>
                <td>{row.tongsanluong}</td>
              </tr>
            )) :""} */}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
        <div></div>
      </CustomModal>
    </main>
  )
}
