import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ExportLIST } from 'utils/Data_Stock_In_Out'
import * as ExcelJS from 'exceljs'
import moment from 'moment'
import { LogUser } from 'services/AuthServices'
import { searchExportInList } from 'services/StockInServices'

export const ExportListIn = () => {
  const User_ID = JSON.parse(localStorage.userData).User_ID

  
  const defaultExportLIST: ExportLIST = {
    Material_No: '',
    Work_Order: '',
    Supplier: '',
    Supplier_No: '',
    Material_Name: '',
    Color: '',
    Rack: '',
    User_Serial_Key: '',
    Production: '',
    Size: '',
    QTY: 0,
    Order_No: '',
    Roll: '',
    Print_QTY: '',
    chitietkien: '',
    Print_Date: ''
  }

  const currentDate = new Date().toISOString().split('T')[0]
  const [DateStart, setDateStart] = useState(currentDate)
  const [DateEnd, setDateEnd] = useState(currentDate)
  const [OrderNo, setOrderNo] = useState('')
  const [ListExport, setListExport] = useState<ExportLIST[]>([])
  const [MaterialNo, setMaterialNo] = useState('')
  const [Supplier, setSupplier] = useState('')
  const [Loading, setLoading] = useState('')
  const [Message, setMessage] = useState('')

  const handlSearch = async () => {
    const res = await searchExportInList('In',OrderNo, MaterialNo, Supplier, DateStart, DateEnd)
    console.log({ res })
    setListExport(res)
  }
  const handleReset=()=>{
    setDateStart(currentDate)
    setDateEnd(currentDate)
    setOrderNo('')
    setListExport([])
    setMaterialNo('')
    setSupplier('')
  }
  const { t } = useTranslation()

  const exportToExcel = () => {
    var tong = 0
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')

    const data = [
      ['DANH SÁCH VẬT TƯ NHẬP KHO TỪ '+ DateStart +' ĐẾN '+ DateEnd],
           [
        t('dcpNum'),
        t('dcpRack'),
        t('dcmOrder_No'),
        t('dcpStock_In_No'),
        t('dcmMaterial_No'),
        t('dcmWork_Order'),
        t('dcmQTY'),
        t('dcmMaterial_Name'),
        t('dcpSupplier'),
        t('dcmColor'),
        t('dcmSize'),
        t('dcmProduction'),
        t('dcmSupplier_no'),
        t('dcmUser_Name'),
        t('dcmQty_ROLL')
      ],
      ...ListExport.map((row, i) => {
        tong = tong + row.QTY
        return [
          i+1,
          row.Rack,
          row.Order_No,
          '',
          row.Material_No,
          row.Work_Order,
          row.QTY,
          row.Material_Name,
          row.Supplier,
          row.Color,
          row.Size,
          row.Production,
          row.Supplier_No,
          row.User_Serial_Key,
          row.Roll
        ]
      })
    ]
    // Gán giá trị cho các ô dựa trên dữ liệu
    data.forEach((row, rowIndex) => {
      row.forEach((cellValue, columnIndex) => {
        const cell = worksheet.getCell(rowIndex + 1, columnIndex + 1)
        cell.value = cellValue

        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
      })
    })

    const lastRow = worksheet.rowCount
    const lastColumn = worksheet.getColumn('D').number

    worksheet.mergeCells(`A1:O1`)
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'Danh sách nhập kho'+ DateStart +' đến '+ DateEnd+'.xlsx'
      link.click()
    })
  }

  return (
    <main className=' flex h-screen flex-col  text-white'>
      <Helmet>
        <title>{t('lblReport_Stock_In')} - WareHouse</title>
      </Helmet>
      <div className='max-w-screen flex h-fit w-full flex-grow flex-col  p-2 ' style={{ backgroundColor: '#1c2437' }}>
        <div className='h-full w-full  rounded-xl border' style={{ backgroundColor: '#2f3b53' }}>
          {/* header  */}
          <div className=' mx-2 flex justify-between py-2  '>
            <Link to='/stock-in' className='text-center font-bold  ' style={{ width: '30px' }}>
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
              <p className='md:px32 px-15 border-b text-center   align-middle  text-xl font-bold text-white sm:px-28 md:text-2xl '>
                {t('lblReport_Stock_In')}
              </p>
            </div>
            <div></div>
          </div>
          {/* navbar  */}
          <div className='1  mt-2 grid   grid-cols-1 md:grid-cols-2'>
            <div className='grid w-full grid-rows-2  gap-2 pr-3 md:gap-4 md:text-right'>
              <div>
               {t('dcmOrder_No')}&emsp;
                <input
                  type='text'
                  value={OrderNo}
                  style={{ backgroundColor: '#1c2437' }}
                  onChange={(e) => setOrderNo(e.target.value)}
                  className='border-1  rounded-full px-2 text-white outline outline-1 outline-white'
                />
              </div>
              <div>
                {t('dcmMaterial_No')}&emsp;
                <input
                  type='text'
                  value={MaterialNo}
                  onChange={(e) => setMaterialNo(e.target.value)}
                  style={{ backgroundColor: '#1c2437' }}
                  className='border-1 rounded-full px-2 text-white outline outline-1 outline-white'
                />
              </div>
            </div>
            <div className='grid w-full grid-rows-1 pt-2  text-left md:grid-rows-2 md:gap-4 md:pl-3 md:pt-0'>
              <div>
                {t('dcpSupplier')}&emsp;
                <select
                  style={{ backgroundColor: '#1c2437' }}
                  className='border-1 w-36 rounded-full px-2 text-white outline outline-1 outline-white'
                >
                  <option value=''></option>
                </select>
              </div>
              <div className='2xl:grid:cols-4 grid grid-cols-1 pt-2 md:grid-cols-2 md:pt-0 lg:grid-cols-3 xl:grid-cols-4'>
                <div className='mx-0 w-full px-0 pl-0 md:px-2 md:pt-0'>
                  {/* <label htmlFor="">Từ</label>&ensp; */}
                  <input
                    type='date'
                    value={DateStart}
                    max={currentDate}
                    onChange={(e) => setDateStart(e.target.value)}
                    style={{ backgroundColor: '#1c2437' }}
                    className='border-1 rounded-full px-1 text-white outline outline-1 outline-white md:px-2'
                  />
                </div>
                <div className='mx-0 w-full px-0 pl-0 md:pl-2  md:pt-0'>
                  {/* <label htmlFor="">Đến</label>&ensp; */}
                  <input
                    type='date'
                    value={DateEnd}
                    max={currentDate}
                    onChange={(e) => setDateEnd(e.target.value)}
                    style={{ backgroundColor: '#1c2437' }}
                    className='border-1 rounded-full px-1 text-white outline outline-1 outline-white md:px-2'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='mt-2 grid grid-cols-5 text-center '>
            <div></div>
            <div className=' text-right'>
              <button
                onClick={handlSearch}
                className='rounded-xl border bg-gray-700 px-3  py-1 text-xs font-bold md:text-sm  lg:text-base'
              >
                {t('btnSearch')}
              </button>
            </div>
            <div className=''>
              <button
                onClick={exportToExcel}
                className='rounded-xl border bg-gray-700 px-3 py-1 text-xs font-bold md:text-sm  lg:text-base'
              >
                {t('btnExcel')}
              </button>
            </div>
            <div className=' text-left'>
              <button onClick={handleReset} className='rounded-xl border bg-gray-700 px-3  py-1 text-xs font-bold md:text-sm  lg:text-base'>
                {t('btnRemove')}
              </button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      {/* data view  */}

      <div
        className='max-w-screen h-2/3 overflow-x-auto overflow-y-auto    pb-2'
        style={{ backgroundColor: '#1c2437' }}
      >
        <table className='mt-0 w-full  table-fixed  text-center'>
          <thead className='' style={{ position: 'sticky', top: '0', backgroundColor: '#141c30' }}>
            <tr className=' '>
              <th className='px-2' style={{ width: '130px' }}>
                {t('dcpRack')}
              </th>
              <th className='px-2' style={{ width: '250px' }}>
                {t('dcmOrder_No')}
              </th>
              <th className='px-2' style={{ width: '200px' }}>
              {t('dcpStock_In_No')}
              </th>
              <th className='px-2' style={{ width: '250px' }}>
                {t('dcmMaterial_No')}
              </th>
              <th className='px-2' style={{ width: '250px' }}>
                {t('dcmWork_Order')}
              </th>
              <th className='px-2' style={{ width: '100px' }}>
                {t('dcmQTY')}
              </th>
              <th className='px-2' style={{ width: '250px' }}>
                {t('dcmMaterial_Name')}
              </th>
              <th className='px-2' style={{ width: '200px' }}>
                {t('dcpSupplier')}
              </th>
              <th className='px-2' style={{ width: '80px' }}>
                {t('dcmColor')}
              </th>
              <th className='px-2' style={{ width: '100px' }}>
                {t('dcmSize')}
              </th>
              <th className='px-2' style={{ width: '150px' }}>
                {t('dcmProduction')}
              </th>
              <th className='px-2' style={{ width: '150px' }}>
                {t('dcmSupplier_no')}
              </th>
              <th className='px-2' style={{ width: '150px' }}>
                {t('dcmUser_Name')}
              </th>
              <th className='px-2' style={{ width: '130px' }}>
                {t('dcmQty_ROLL')}
              </th>
            </tr>
          </thead>
          <tbody>
            {ListExport
              ? ListExport.map((row, i=1) => (
                  <tr key={i + 1} className='border-b caret-[#141c30] focus:bg-[#141c30] '>
                    <td className=' break-all align-middle'>{row.Rack}</td>
                    <td className=' align-middle '>{row.Order_No}</td>
                    <td className=' align-middle '></td>
                    <td className=' break-all align-middle'>{row.Material_No}</td>
                    <td className=' break-all align-middle'>{row.Work_Order}</td>
                    <td className=' break-all align-middle'>{row.QTY}</td>
                    <td className=' break-all align-middle '>{row.Material_Name}</td>
                    <td className=' break-all align-middle'>{row.Supplier}</td>
                    <td className=' break-all align-middle'>{row.Color}</td>
                    <td className=' break-all align-middle'>{row.Size}</td>
                    <td className=' break-all align-middle'>{row.Production}</td>
                    <td className=' break-all align-middle'>{row.Supplier_No}</td>
                    <td className=' break-all align-middle'>{row.User_Serial_Key}</td>
                    <td className=' break-all align-middle'>{row.Roll}</td>
                  </tr>
                ))
              : ''}
          </tbody>
        </table>
      </div>
    </main>
  )
}
