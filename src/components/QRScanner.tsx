import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
// @ts-ignore
import QrScanner from 'react-qr-scanner'
import CustomModal from './CustomModalScan'

interface ScannerQRProps {
  onScan: (result: string | null) => void
}

const QRScanner: React.FC<ScannerQRProps> = ({ onScan }) => {


  const [scannerKey, setScannerKey] = useState(0); // Khởi tạo state cho key của component QrScanner

const handleScan = (data: any | null) => {
  if (data) {
    onScan(data);
    setScannerKey(prevKey => prevKey + 1); // Thay đổi giá trị key của component QrScanner
  }
}
  const closeModal = () => {
    setModalIsOpen(false)
  }
  const openModal = async () => {
    setModalIsOpen(true)
  }
  const handleError = (error: Error) => {
    console.error(error)
  }
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const { t } = useTranslation()
  return (
    <div>
     
            <QrScanner  key={scannerKey}  delay={300} onError={handleError} onScan={handleScan} style={{ width: '80%', margin:"auto" }} />
           
    </div>
  )
}

export default QRScanner
