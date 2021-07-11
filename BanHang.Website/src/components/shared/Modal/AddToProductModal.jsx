import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ProductAddCard from "../card/ProductCard/ProductAddCard";
import { IoMdAddCircle } from "react-icons/io";

const AddToProductModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <button
        type="submit"
        className="__products--button-add btn "
        onClick={handleShow}
      >
       <IoMdAddCircle className="__product--icon-to-product"/> 
      </button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add News Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductAddCard handleClose={()=>handleClose()}/>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddToProductModal;
