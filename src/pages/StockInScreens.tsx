import CustomModal from 'components/CustomModal'
import CustomModal2 from 'components/CustomModalScan'
import Loading from 'components/Loading'
// import Loading from 'components/Loading'
import QRScanner from 'components/QRScanner'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { LogUser } from 'services/AuthServices'
import { getStockInByRack, setMaterialRack, setOutRack } from 'services/StockInServices'
import { Material_Label_By_Rack } from 'utils/Data_Stock_In'

export default function StockInScreens() {
  const { t } = useTranslation()
  const rows = document.querySelectorAll('tr')
  rows.forEach((row: HTMLElement) => {
    row.addEventListener('focus', () => {
      row.classList.add('bg-gray-600')
    })
    row.addEventListener('blur', () => {
      row.classList.remove('bg-gray-600')
    })
  })
      const patternRack =  /^([a-zA-Z0-9]{1,3}-)?[a-zA-Z0-9]{2}$/;
  const User_ID = JSON.parse(localStorage.userData).User_ID
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalIsOpen2, setModalIsOpen2] = useState(false)
  const [loading, setLoading] = useState(false)
  const [Content, setContent] = useState<Material_Label_By_Rack[]>([])
  const [newRows, setNewRows] = useState<Material_Label_By_Rack[]>([])
  const [BtnSearch, setBtnSearch] = useState('')
  const [TotalQuantity, setTotalQuantity] = useState(0)
  const [TotalRoll, setTotalRoll] = useState(0)
  const [racktxt, setRacktxt] = useState('')
  const placeholderMaterinal = t('dcmMaterial_No')
  const placeholderBarcode = t('dcpBarcode')
  const navigate = useNavigate()
  const HandleReportStockIn = async () => {
    await LogUser(User_ID, 'Function: frmReport_Stock_In()')
    navigate('/reportstockin')
  }
  const openModal2 = async () => {
    // await LogUser(User_ID, 'Function: frmPartial_In_Out()')
    setModalIsOpen2(true)
  }


  const handleScan = (result: any | null) => {
    if (result) {
      // console.log(result)
      handleSubmitBtnSearch(result.text)
      // setModalIsOpen2(false)
    }
  }

  const handleChange = (event: any) => {
    const chuoi = event.target.value
    setBtnSearch(chuoi)
    handleSubmitBtnSearch(chuoi)
  }

  const handlePaste =  (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const clipboardData = event.clipboardData || (window as any).Clipboard
    const pastedData = clipboardData.getData('text')
    setBtnSearch(pastedData)
    handleSubmitBtnSearch(pastedData)
  }

  // submit chuỗi ở ô quét
  const handleSubmitBtnSearch=(Str:string )=>{
    if (Str.indexOf('-') !== -1 && patternRack.test(Str) && (Str.length === 5 || Str.length === 6)) {
      // setLoading(true)
     
      handleStockInByRack(Str)
      
    } else if (racktxt!=='' && (Str.length == 15 || Str.length == 16)) {
      console.log('bkla bla');
      handlesetMaterialRack(Str, racktxt)
    }
    // setLoading(false)
  }

  // Select ra danh sách vật tư theo Rack
  const handleStockInByRack = async (rack: string) => {
    setModalIsOpen2(false)
    setLoading(true)
    if (rack !== '') {
      const res = await getStockInByRack(rack)
      setRacktxt(rack)
      if(res!==null){
        setContent(res)
    
      }else{
        setContent([])
        
      }
      setBtnSearch('')
    }
    setLoading(false)
  }
  //Nhập vật tư bằng mã BarCode vào Rack
  const handlesetMaterialRack = async (BarCode:string , Rack:string) => {
    setLoading(true)
    setBtnSearch(BarCode)
    const res = await setMaterialRack(BarCode, Rack, User_ID)
    if (res!==null) {
      // console.log({res})
      if (!Content.some(row => row.BarCode === res.BarCode)) {
        setContent((prevContent) => [res, ...prevContent])
        setNewRows((prevNewRows) => prevNewRows.concat(res))
          const updatedTotalQuantity = (TotalQuantity + Number(res.QTY)).toFixed(2);
            const updatedTotalRoll = (TotalRoll + Number(res.Roll)).toFixed(2);
            setTotalQuantity(Number(updatedTotalQuantity));
            setTotalRoll(Number(updatedTotalRoll));
            setModalIsOpen2(false)
      }
    }
    // setModalIsOpen2(true)

    setLoading(false)
  }


  const HandleOutRack = async (BarCode: string) => {
    // setOutRack(qr)
    const confirmed = window.confirm('Bạn muốn xuất vật tư ra khỏi kệ')
    if (confirmed) {
      const res = await setOutRack(BarCode, User_ID)
      if(res!==null){
        console.log(res)
        if (newRows.some((row) => row.BarCode === BarCode)) {
          const existingRow = newRows.find((row) => row.BarCode === BarCode);
          if (existingRow) {
            const updatedTotalQuantity = (TotalQuantity - Number(existingRow.QTY)).toFixed(2);
            const updatedTotalRoll = (TotalRoll - Number(existingRow.Roll)).toFixed(2);
            setTotalQuantity(Number(updatedTotalQuantity));
            setTotalRoll(Number(updatedTotalRoll));
            // setTotalQuantity(updatedTotalQuantity);
          }
        }
        setContent((prevData) => prevData.filter((item) => item.BarCode !== BarCode))

      }
    }
  }

  // const totalQty = Content.reduce((accumulator, row) => accumulator + row.QTY, 0);
  // const totalRoll = Content.reduce((accumulator, row) => accumulator + row.Roll, 0);

  return (
    <main className=' flex h-screen flex-col  text-white'>
      <Helmet>
        <title>{t('tsmStock_In')} - WareHouse</title>
      </Helmet>
      <div
        className='max-w-screen flex h-fit w-full  flex-grow flex-col border-b-2 px-1 pb-1'
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
              <button  onClick={HandleReportStockIn} >
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
              </button>
            </div>
          </div>
          {/* navbar  */}
          <div className='  mt-2 grid   grid-cols-2 '>
            {/* xuất hết số lượng của vật tư  */}
            <div className=' grid   w-full grid-cols-1   px-1  '>
              <div className=''>
                <label
                  htmlFor='chedo'
                  className=' text-xs sm:text-xs  md:text-base md:text-sm  md:text-sm lg:text-base xl:text-base'
                >
                  <input type='checkbox' id='chedo' onClick={(openModal2)} />
                  &ensp;{t('gpbMode')}
                </label>
              </div>
              <div className='grid grid-cols-2'>
                <div className='grid grid-cols-2'>
                  <div>
                    <label
                      htmlFor='ke'
                      className=' text-xs sm:text-xs  md:text-base md:text-sm  md:text-sm lg:text-base xl:text-base'
                    >
                      <input type='radio' id='ke' checked disabled />
                      &ensp;{t('lblShelves')}&emsp;&ensp; <label>{racktxt}</label>
                    </label>
                  </div>
                  <div className='text-center'> {loading ? <Loading /> : ''}</div>
                </div>
                <div>
                  {' '}
                  <div className='  w-full text-xs md:my-2  md:text-sm lg:text-base '>
                    {t('lblQty_In')}
                    {(Content.reduce((accumulator, row) => accumulator + Number(row.QTY), 0) || 0).toFixed(2)}
                    &#10098;Cuộn{' '}
                    {(Content.reduce((accumulator, roww) => accumulator + Number(roww.Roll), 0) || 0).toFixed(2)}
                    &#10099;
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-2'>
                <div className=''>
                  <label htmlFor=''>
                    {t('gpbScan')}: &emsp;
                    <input
                      type='text'
                      value={BtnSearch}
                      // onChange={(e) => setBtnSearch(e.target.value)}
                      placeholder={placeholderBarcode}
                      onChange={handleChange}
                      onPaste={handlePaste}
                      maxLength={16}
                      className='border-1 w-full rounded-full bg-[#1c2437] px-1 py-1 text-xs text-white outline outline-1 outline-white md:py-0  md:text-sm lg:w-fit lg:text-base'
                    />
                  </label>
                </div>
                <div>
                  <div className='w-full text-xs md:my-2  md:text-sm lg:text-base  '>
                    {t('lblQty_Scan')}
                    {TotalQuantity} &#10098; Cuộn: {TotalRoll} &#10099;
                    {/* {(Content.reduce((accumulator, row) => accumulator + Number(row.QTY), 0) ||0).toFixed(2)}
                    &#10098;Cuộn {(Content.reduce((accumulator, roww) => accumulator + Number(roww.Roll), 0) || 0).toFixed(2)}&#10099; */}
                  </div>
                </div>
              </div>
            </div>
            {/* xuất vật tư theo số lượng */}
            <div className='   grid w-full grid-cols-1  pr-2 '>
              <div className='leading-2  mx-auto grid w-full grid-cols-5 gap-2'>
                <div></div>
                <div>
                  <button className='w-full rounded-full bg-gray-500 p-2 outline outline-1' disabled>
                    Nhập kho ERP
                  </button>
                </div>
                <div>
                  <button className='w-full rounded-full bg-gray-500 p-2 outline outline-1' disabled>
                    Xuất kho ERP
                  </button>
                </div>
                <div>
                  <button className='w-full rounded-full bg-[#141c30] p-2 outline outline-1 hover:opacity-75'>
                    Nhập kệ ERP
                  </button>
                </div>
                <div></div>
              </div>
              <div className='leading-2  mx-auto grid w-full grid-cols-5 gap-2'>
                <div>
                  <button className='w-full rounded-full bg-[#141c30] p-2 outline outline-1 hover:opacity-75'>
                    Thông tin
                  </button>
                </div>
                <div>
                  <button className='w-full rounded-full bg-[#141c30] p-2 outline outline-1 hover:opacity-75'>
                    Thống kê
                  </button>
                </div>
                <div>
                  <button className='w-full rounded-full bg-[#141c30] p-2 outline outline-1 hover:opacity-75'>
                    Kiểm kê
                  </button>
                </div>
                <div>
                  <button className='w-full rounded-full bg-[#141c30] p-2 outline outline-1 hover:opacity-75'>
                    QC
                  </button>
                </div>
                <div>
                  <button className='w-full rounded-full bg-gray-500 p-2 outline outline-1' disabled>
                    Nhập kho
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* data view  */}

      <div className='max-w-screen h-3/4 overflow-x-auto overflow-y-auto pb-2 ' style={{ backgroundColor: '#1c2437' }}>
        <table className='mt-0 w-full table-fixed text-center'>
          <thead className=' ' style={{ position: 'sticky', top: '0', backgroundColor: '#141c30' }}>
            <tr className=''>
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
              {/* <th className='w-[300rem] px-2' style={{ width: '150px' }}>
                {t('dcmModify_Date')}
              </th> */}
              <th className='w-[300rem] px-2' style={{ width: '130px' }}>
                {t('dcmUser_Serial_Key')}
              </th>
              <th className='w-[300rem] px-2' style={{ width: '130px' }}>
                {t('lblQtyTotal')}
              </th>
            </tr>
          </thead>
          <tbody>
            {Content
              ? Content.map((row) => (
                  <tr
                    className={`tr-focus:bg-gray-600 cursor-pointer border-b  hover:bg-[#141c30] 
                    ${newRows.includes(row) ? 'text-yellow-700' : ''}`}
                    tabIndex={0}
                    key={row.BarCode}
                    onClick={() => HandleOutRack(row.BarCode)}
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
                    <td></td>
                    {/* <td>{moment(row.Modify_Date).format('DD/MM/YYYY')}</td> */}
                    <td>{row.Supplier_No}</td>
                    <td>{row.Work_Order}</td>
                    {/* <td>{moment(row.Modify_Date).format('DD/MM/YYYY')}</td> */}
                    <td>{row.User_Serial_Key}</td>
                    <td>{row.Total_QTY}</td>
                  </tr>
                ))
              : ''}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={modalIsOpen} onClose={()=> setModalIsOpen(false)}>
        <div></div>
      </CustomModal>
      <CustomModal2 isOpen={modalIsOpen2} onClose={()=>setModalIsOpen2(false)}>
        <div>
          <QRScanner onScan={handleScan} />
          <button>&#8689;</button>
        </div>
      </CustomModal2>
    </main>
  )
}
