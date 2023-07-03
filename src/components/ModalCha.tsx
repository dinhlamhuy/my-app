import React, { useState } from "react";
import CustomModal from "./CustomModal";

const ModalCha: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <CustomModal isOpen={modalIsOpen} onClose={closeModal}>
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
      </CustomModal>
    </div>
  );
};

export default ModalCha;