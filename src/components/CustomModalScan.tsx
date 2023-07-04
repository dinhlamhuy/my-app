import React, { ReactNode, useEffect, useState } from 'react'
import Modal from 'react-modal'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const CustomModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);
  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel='Modal'
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
          maxWidth: '30%',
          minWidth: '10%',
          maxHeight: '50%',
          minHeight: '10%',
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          // border: '1px solid #ccc',
          borderRadius: '4px',
          overflow:"auto",
          // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          padding: '5px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }
      }}
    >{children}</Modal>
  )
}

export default CustomModal
