import CustomModal from 'components/CustomModal'
import CustomModal2 from 'components/CustomModalScan'
import Loading from 'components/Loading'
// import Loading from 'components/Loading'
import QRScanner from 'components/QRScanner'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import { AiFillCamera, AiOutlineFileSearch } from 'react-icons/ai'


export default function Scanmay() {
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


  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalIsOpen2, setModalIsOpen2] = useState(false)
  const [loading, setLoading] = useState(false)
  const [Content, setContent] = useState<any[]>([])


 
  const openModal2 = async () => {
    setModalIsOpen2(true)
  }

  const handleScan = async (result: any | null) => {
    if (result || result.text) {


      if (!Content.some((row) => row === result.text)) {
        setContent((prevContent) => [result.text, ...prevContent])
      }
      
    }
  }

  return (
    <main className=' flex h-screen flex-col  text-white'>
      <Helmet>
        <title>{t('tsmStock_In')} - WareHouse</title>
      </Helmet>
      <button className='p-0' onClick={openModal2}>
                 Camera
                </button>
      <div className='max-w-screen h-3/4 overflow-x-auto overflow-y-auto pb-2 ' style={{ backgroundColor: '#1c2437' }}>
        <table className='mt-0 w-full table-fixed text-center'>
          <thead className=' ' style={{ position: 'sticky', top: '0', backgroundColor: '#141c30' }}>
            <tr className=''>
              <th className='w-[300rem] px-2' style={{ width: '150px' }}>
              index
              </th>
              <th className='w-[300rem] px-2' style={{ width: '150px' }}>
                barcode
              </th>
            </tr>
          </thead>
          <tbody>
            {Content
              ? Content.map((row, index) => (
                  <tr
                    className={`tr-focus:bg-gray-600 cursor-pointer border-b  hover:bg-[#141c30] `}
                    tabIndex={0}
                    key={index}
                  >
                    <td>{index}</td>
                    <td>{row}</td>
                  </tr>
                ))
              : ''}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <div></div>
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
