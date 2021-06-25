import { Modal, Button } from "react-bootstrap";
import React, {useState, useEffect} from 'react'


const ImageModal = ({show, onClose, dataModal}) => {
    const [isOpen, setisOpen] = useState(false);
    const openModal = () => setisOpen(true);
    const closeModal = () => setisOpen(false);

    console.log("MODAL IMAGE===", show)
    return (
    //     <Modal isOpen={show}>
    //     <Modal.Header closeButton>
    //       <Modal.Title>Image</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
    //     <Modal.Footer>
    //       <Button variant="secondary">Close</Button>
    //     </Modal.Footer>
    //   </Modal>

     <Modal show={show} onHide={onClose} >
        <Modal.Header>
          <Modal.Title>{dataModal.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <img
                    src={`https://live.staticflickr.com/${dataModal.server}/${dataModal.id}_${dataModal.secret}.jpg`}
                    style={{ height: "18rem" }}
                    className="card-img-top"
                    alt="..."
                  />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ImageModal;
