import MODAL from "react-modal"

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

MODAL.setAppElement('#root');

const Modal = ({ modalIsOpen, setIsOpen, content })=>{

    function closeModal() {
      setIsOpen(false);
    }

    return(
        <MODAL
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
           <div>{content}</div>
        </MODAL>
    )
}

export default Modal