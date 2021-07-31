import React,{useState} from 'react'
import {Container,Row, Card, Modal,Col} from "react-bootstrap"

const ReactModal =(modalTitle, children, handleClose, handleClose, show)=>{
    const [show, setShow ] = useState(false)

    const handleShow =()=> setShow(true)
    const handleClose =()=> setShow(false)

    return(
        <React.Fragment>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> {modalTitle} </Modal.Title>
                </Modal.Header>
                <Modal.Body> {children} </Modal.Body>
            </Modal>
    </React.Fragment>
    )
}