import CustomModal from 'components/CustomModal'
import CustomModal2 from 'components/CustomModalScan'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import { ReBackstockOutAll, getMaterial, searchMaterialNo, stockOutAll, stockOutTSL } from 'services/StockOutServices'
import { Material_Label, Stock_Out } from 'utils/Data_Stock_In_Out'
import i18n from 'i18n/i18n'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { LogUser } from 'services/AuthServices'
import { AiFillCamera, AiOutlineFileSearch, AiOutlineLoading3Quarters } from 'react-icons/ai'
import QRScanner from 'components/QRScanner'
function StockOutScreens() {
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
  const defaultMaterialLabelValue: Material_Label = {
    Material_Label_Serial: '',
    Supplier: '',
    Material_Name: '',
    Color: '',
    Size: '',
    QTY: 0,
    Total_QTY: 0,
    Print_QTY: '',
    Print_Times: 0,
    Label_Status: '',
    Order_No: '',
    Roll: '',
    Production: '',
    Supplier_No: '',
    Material_No: '',
    Work_Order: '',
    Material_Type: '',
    BarCode: '',
    Modify_Date: '',
    Print_Date: '',
    User_Serial_Key: '',
    Arrival_QTY: 0
  }
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalIsOpen2, setModalIsOpen2] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingTSL, setLoadingTSL] = useState(false)
  const [toggleButton, settoggleButton] = useState(false)
  // const [Content, setContent] = useState<Material_Label>(defaultMaterialLabelValue)
  const [Content, setContent] = useState<Material_Label[]>([])
  const [ContentTSL, setContentTSL] = useState<Material_Label>(defaultMaterialLabelValue)

  const [btnSearch, setBtnSearch] = useState('')
  const [btnSearchTSL, setBtnSearchTSL] = useState('')
  const [MessageSearch, setMessageSearch] = useState('')
  const [slXuat, setslXuat] = useState(0)
  const [TotalQuantity, setTotalQuantity] = useState(0)
  const [TotalQuantityFocus, setTotalQuantityFocus] = useState(0)
  const [slConLai, setslConLai] = useState(ContentTSL.QTY || 0)
  const User_ID = JSON.parse(localStorage.userData).User_ID

  const arrayStrig = ContentTSL.Print_QTY.split(' ')
  const currentDate = new Date().toISOString().split('T')[0]
  const [Materia_No, setMateria_No] = useState('')
  const [DateStart, setDateStart] = useState(currentDate)
  const [DateEnd, setDateEnd] = useState(currentDate)
  const placeholderMaterinal = t('dcmMaterial_No')
  const placeholderBarcode = t('dcpBarcode')
  const navigate = useNavigate()

  const openModal2 = async () => {
    setModalIsOpen2(true)
  }

  const handleScan = async (result: any | null) => {
    if (result) {
      setModalIsOpen2(false)
      // await handleSubmitBtnSearch(result.text)
      await handleStockOutAll(result.text)

      // if (racktxt!=='' && (result.text.length == 15 || result.text.length == 16)) {
      setModalIsOpen2(true)
      // }
    }
  }

  const HandleReportStockOut = async () => {
    await LogUser(User_ID, 'Function: frmReport_Stock_Out()')
    navigate('/reportstockout')
  }
  const openModal = async () => {
    await LogUser(User_ID, 'Function: frmPartial_In_Out()')
    setModalIsOpen(true)
  }
  const closeModal = () => {
    setModalIsOpen(false)
  }
  const handleChange = async (event: any) => {
    setLoading(true)
    const chuoi = event.target.value
    setBtnSearch(chuoi)
    handleStockOutAll(chuoi)
  }

  const handlePaste = async (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const clipboardData = event.clipboardData || (window as any).Clipboard
    const pastedData = clipboardData.getData('text')
    handleStockOutAll(pastedData)
  }
  const handleStockOutAll = async (text: string) => {
    if (text.length == 15 || text.length == 16) {
      setLoading(true)
      setBtnSearch(text)
      const res = await stockOutAll(text, User_ID)
      if (res.dml) {
        setContent((prevContent) => prevContent.concat(res.dml))
        const updatedTotalQuantity = (TotalQuantity + Number(res.dml.QTY)).toFixed(2)
        setTotalQuantity(Number(updatedTotalQuantity))
        setBtnSearch('')
      }
      setLoading(false)
    }
  }
  const HandleTravekho = async (BarCode: string, QTY: number, Print_QTY: string) => {
    const parts = Print_QTY.split('/')
    const quantity = parseInt(parts[1].trim())
    setTotalQuantityFocus(quantity)
    const confirmed = window.confirm('You want to cancel this item: ' + BarCode)
    if (confirmed) {
      const res = await ReBackstockOutAll(BarCode, User_ID)
      const updatedTotalQuantity = (TotalQuantity - Number(QTY)).toFixed(2)
      setTotalQuantity(Number(updatedTotalQuantity))
      setContent((prevData) => prevData.filter((item) => item.BarCode !== BarCode))
    }
  }

  const handleChangeTSL = async (event: any) => {
    setLoadingTSL(true)
    const chuoi = event.target.value
    setBtnSearchTSL(chuoi)
    if (chuoi.length == 15 || chuoi.length == 16) {
      const res = await getMaterial(chuoi)
      if (res != null) {
        setContentTSL(res.dml)
        setslConLai(res.dml.QTY)
      } else {
        setContentTSL(defaultMaterialLabelValue)
      }
    } else {
      setslXuat(0)
      setslConLai(0)
      setContentTSL(defaultMaterialLabelValue)
    }
    setLoadingTSL(false)
  }

  const handlePasteTSL = async (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()

    const clipboardData = event.clipboardData || (window as any).Clipboard
    const pastedData = clipboardData.getData('text')
    if (pastedData.length == 15 || pastedData.length == 16) {
      setLoadingTSL(true)
      setBtnSearchTSL(pastedData)
      const res = await getMaterial(pastedData)
      console.log(res)
      if (res != null) {
        setContentTSL(res.dml)
        setslConLai(res.dml.QTY)
      } else {
        setContentTSL(defaultMaterialLabelValue)
      }
      setLoadingTSL(false)
    }
  }

  const handleChangeSLTSL = (e: any) => {
    const value = e.target.value
    if (ContentTSL.QTY > 0) {
      const parsedValue = parseFloat(value)
      if (!isNaN(parsedValue) && parsedValue <= ContentTSL.QTY) {
        setslXuat(value)
        const conlai = ContentTSL.QTY - parsedValue
        setslConLai(conlai)
      }
    }
  }

  const handleStockOutTSL = async () => {
    const solxuat = slXuat
    const slconlai = slConLai
    if (!isNaN(solxuat)) {
      if (solxuat < ContentTSL.QTY && solxuat > 0) {
        const res = await stockOutTSL(btnSearchTSL, slXuat, ContentTSL.QTY, User_ID)
        console.log('res: ', res)
        if (res === 'Cập nhật thành công') {
          setContentTSL(defaultMaterialLabelValue)
          setslXuat(0)
          setslConLai(0)
          setBtnSearchTSL('')
          setMessageSearch('Thành công')
          setTimeout(() => {
            setMessageSearch('')
          }, 2000)
        } else if (res === 'Cập nhật thất bại') {
          console.log('bla bla')
          setMessageSearch('Thất bại')
        } else {
          console.log('loi')
        }
      } else if (solxuat == ContentTSL.QTY && slconlai == 0) {
        const exportAll = await stockOutAll(btnSearchTSL, User_ID)
        if (exportAll === 'Xuất vật tư thành công') {
          setContentTSL(defaultMaterialLabelValue)
          setslXuat(0)
          setslConLai(0)
          setBtnSearchTSL('')
          setMessageSearch('Thành công')
          setTimeout(() => {
            setMessageSearch('')
          }, 2000)
        } else {
          setMessageSearch('Thất bại')
        }
      }
    }
  }

  const handleToggleClickSearch = () => {
    settoggleButton(!toggleButton)
  }

  const handleSearchMaterial = async () => {
    setContent([])
    if (Materia_No !== '') {
      const res = await searchMaterialNo(Materia_No, DateStart, DateEnd)
      // console.log(res)
      if (res != null) {
        setContent((prevContent) => prevContent.concat(res.dml))
      } else {
        setContent([])
      }
    }
  }

  return (
    <main className=' flex h-screen flex-col  text-white'>
      <Helmet>
        <title>{t('tsmStock_Out')} - WareHouse</title>
      </Helmet>
      <div
        className='max-w-screen flex h-fit  w-full flex-grow flex-col border-b-2 pb-3'
        style={{ backgroundColor: '#28374a' }}
      >
        {/* header  */}
        <div className=' mx-2 flex justify-between py-2  '>
          <Link to='/' className='text-center font-bold  ' style={{ width: '30px' }}>
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
              {t('tsmStock_Out')}&emsp;
              <button className='p-0' onClick={openModal2}>
                <AiFillCamera />
              </button>
            </p>
          </div>
          <div className='  mx-2 text-center text-2xl  font-bold' style={{ width: '30px' }}>
            <button onClick={HandleReportStockOut} className='text-2xl'>
              <AiOutlineFileSearch />
            </button>
          </div>
        </div>
        {/* navbar  */}
        <div className='  mt-2 grid   grid-cols-7'>
          {/* xuất hết số lượng của vật tư  */}
          <div className='col-span-2 grid  w-full grid-cols-1   px-1  '>
            <div className='  w-full '>
              <div>
                <label
                  htmlFor='chedo'
                  className=' text-xs sm:text-xs  md:text-base md:text-sm  md:text-sm lg:text-base xl:text-base'
                >
                  <input type='checkbox' id='chedo' onClick={openModal2} />
                  &ensp;{t('gpbMode')}&emsp;&ensp;
                  <button className='rounded-md border px-1' onClick={handleToggleClickSearch}>
                    {t('btnSearch')}
                  </button>
                </label>
              </div>
              <div>
                <label
                  htmlFor='ke'
                  className=' text-xs sm:text-xs  md:text-base md:text-sm  md:text-sm lg:text-base xl:text-base'
                >
                  <input type='radio' id='ke' checked disabled />
                  &ensp;{t('robBatch')}&emsp;&ensp;
                </label>
              </div>
              <div>
                <label htmlFor=''>
                  {t('gpbScan')}: &emsp;
                  <input
                    type='text'
                    value={btnSearch}
                    placeholder={placeholderBarcode}
                    onChange={handleChange}
                    onPaste={handlePaste}
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
            </div>
          </div>

          {toggleButton ? (
            <div className='col-span-3   grid w-full grid-cols-1 gap-y-2 pl-2  pr-4 md:col-span-2 lg:pr-8  '>
              <div className='relative text-right md:w-full '>
                <input
                  type='text'
                  value={Materia_No}
                  placeholder={placeholderMaterinal}
                  onChange={(e) => setMateria_No(e.target.value)}
                  className='border-1 w-4/5    rounded-full bg-transparent px-1   text-white outline outline-1 outline-white'
                />
                <button
                  onClick={handleSearchMaterial}
                  className='absolute right-0 h-full rounded-r-full  px-2 py-0 text-white  lg:-top-1     '
                >
                  &#128269;
                </button>
              </div>
              <div className='text-right md:w-full'>
                <input
                  type='date'
                  max={currentDate}
                  value={DateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  className='border-1 w-4/5 rounded-full  bg-transparent px-3 text-center  text-white outline outline-1 outline-white'
                />
              </div>
              <div className='text-right md:w-full '>
                <input
                  type='date'
                  max={currentDate}
                  value={DateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                  className='border-1 w-4/5 rounded-full  bg-transparent px-3 text-center  text-white outline outline-1 outline-white'
                />
              </div>
            </div>
          ) : (
            <div className='col-span-3   grid w-full grid-cols-1 px-2  md:col-span-2'></div>
          )}

          {/* xuất vật tư theo số lượng */}
          <div className='  col-span-2 grid w-full grid-cols-2 md:col-span-3 '>
            <div className='  w-full '>
              <div className='grid w-full grid-cols-1  md:grid-cols-2'>
                <div className='px-0 md:px-2 lg:px-4 xl:px-5  '>
                  <button
                    className='  w-full rounded-md border bg-gray-500 px-1 py-1 text-xs font-bold  md:text-base md:text-sm lg:text-base  xl:text-base'
                    disabled
                  >
                    {t('btnConfirm')}
                  </button>
                </div>
                <div className='px-0 md:px-2 lg:px-4 xl:px-5 '>
                  <button
                    onClick={openModal}
                    className='  w-full rounded-md border bg-blue-500 px-1 py-1 text-xs font-bold  md:text-base md:text-sm lg:text-base xl:text-base'
                  >
                    {t('dcpExport')}
                  </button>
                </div>
              </div>
              <div className='md:pt-4 '>
                <div className='  w-full text-xs md:my-2  md:text-sm lg:text-base '>
                  {t('lblQty_In')} {TotalQuantityFocus}
                </div>
                <div className='w-full text-xs md:my-2  md:text-sm lg:text-base  '>
                  {t('lblQty_Out')} {TotalQuantity}
                </div>
              </div>
            </div>
            <div className=' grid w-full  grid-cols-1 pl-1'>
              <label htmlFor='go' className=' text-xs md:text-sm  lg:text-base'>
                <input type='radio' name='chuyenden' id='go' />
                &ensp; {t('rbtA')}
              </label>

              <label htmlFor='cat' className=' text-xs md:text-sm  lg:text-base'>
                <input type='radio' name='chuyenden' id='cat' />
                &ensp; {t('rbtC')}
              </label>

              <label htmlFor='giacong' className='text-xs md:text-sm  lg:text-base'>
                <input type='radio' name='chuyenden' id='giacong' />
                &ensp; {t('rbtO')}
              </label>

              <label htmlFor='may' className='text-xs md:text-sm  lg:text-base'>
                <input type='radio' name='chuyenden' id='may' />
                &ensp; {t('rbtS')}
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* data view  */}

      <div
        className='max-w-screen h-3/4 overflow-x-auto overflow-y-auto pb-2    lg:h-2/3'
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
                {t('dcmSupplier')}
              </th>
              <th className='w-[300rem] px-2' style={{ width: '250px' }}>
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
            </tr>
          </thead>
          <tbody>
            {Content
              ? Content.map((row) => (
                  <tr
                    className='tr-focus:bg-gray-600 cursor-pointer border-b  hover:bg-[#141c30] '
                    key={row.BarCode}
                    onClick={(BarCode) => HandleTravekho(row.BarCode, row.QTY, row.Print_QTY)}
                  >
                    <td>{row.BarCode}</td>
                    <td>{row.Material_No}</td>
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
                  </tr>
                ))
              : ''}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
        <div className='h-full w-full grid-cols-3 grid-cols-6 gap-4 px-1 text-white  md:grid'>
          <div className='col-span-3 text-center text-2xl md:col-span-6'> {t('lblInfor_In_Out')}</div>
          <div className='col-span-3 '>
            <label htmlFor='nhap' className='text-teal-400'>
              <input type='radio' name='xuatnhap' id='nhap' disabled />
              &ensp; {t('btnPartial_In')}
            </label>
            &emsp;
            <label htmlFor='xuat'>
              <input type='radio' name='xuatnhap' id='xuat' checked readOnly />
              &ensp; {t('btnPartial_Out')}
            </label>
          </div>
          <div>{t('gpbScan')}:</div>
          <div className='col-span-2 text-teal-800'>
            <input
              type='text'
              value={btnSearchTSL}
              placeholder={placeholderBarcode}
              onChange={handleChangeTSL}
              onPaste={handlePasteTSL}
              className='w-full rounded-md border px-1'
              maxLength={16}
            />
          </div>

          <div>{t('lblBarcode')}:</div>
          <div className='col-span-2 text-yellow-300'> {ContentTSL.BarCode}</div>
          <div></div>
          <div className='col-span-2'>
            {loadingTSL ? (
              <div className='mt-1 flex '>
                <AiOutlineLoading3Quarters />
                &emsp;
                <label className='text-xs text-gray-400  md:text-sm '>loading...</label>
              </div>
            ) : (
              ''
            )}

            {MessageSearch}
          </div>

          <div> {t('dcmMaterial_No')}:</div>
          <div className='col-span-2 text-yellow-300'>{ContentTSL.Material_No}</div>
          <div></div>
          <div className='col-span-2'></div>

          <div> {t('dcmMaterial_Name')}:</div>
          <div className='col-span-2 text-yellow-300'>{ContentTSL.Material_Name}</div>
          <div>{t('dcmQTY')}</div>
          <div className='col-span-2 text-teal-800'>
            <input
              type='text'
              className='w-full rounded-md border px-1'
              value={slXuat}
              pattern='^(?:[1-9][0-9]*|0(?:\.[0-9]+)?)$' // Thêm pattern để giới hạn định dạng số thập phân
              minLength={0}
              onChange={handleChangeSLTSL}
            />
          </div>

          <div>{t('lblQtyTotal')}:</div>
          <div className='col-span-2 text-yellow-300'> {ContentTSL.QTY == 0 ? '' : ContentTSL.QTY}</div>
          <div>{t('lblQty_Remain')}</div>
          <div className='col-span-2 text-teal-800'>
            <input type='text' className='w-full rounded-md border px-1' readOnly value={slConLai} />
          </div>

          <div>{t('lblUnit')}:</div>
          <div className='col-span-2 text-yellow-300'> {arrayStrig[1]}</div>
          <div>
            <label htmlFor=''>
              <input type='checkbox' />
              &ensp;{t('chxAll')}
            </label>
          </div>
          <div className='col-span-2 w-full  text-center '>
            <button onClick={handleStockOutTSL} className='rounded-lg bg-blue-400 px-4 py-1 text-center '>
              {t('btnSave')}
            </button>
          </div>
        </div>
      </CustomModal>
      <CustomModal2 isOpen={modalIsOpen2} onClose={() => setModalIsOpen2(false)}>
        <div>
          <QRScanner onScan={handleScan} />
          <button>&#8689;</button>
        </div>
      </CustomModal2>
    </main>
  )
}

export default StockOutScreens
