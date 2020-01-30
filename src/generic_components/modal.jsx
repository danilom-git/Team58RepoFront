import React, {Component} from "react";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    overlay: {zIndex: 10000}
};

class Modal extends Component{

    state = {
        modal: false
    };

    showModal = () => {
        this.setState({modal: true});
    };

    handleModalCloseRequest = () => {
        // opportunity to validate something and keep the modal open even if it
        // requested to be closed
        this.setState({modal: false});
    };

    render() {
        return (<Modal
            className="Modal__Bootstrap modal-dialog"
            closeTimeoutMS={150}
            isOpen={this.state.modal}
            style={customStyles}
            onRequestClose={this.handleModalCloseRequest}
        >
            <div className="modal-content" role="dialog">
                <div className="modal-header">
                    <h4 className="modal-title">Notification</h4>
                    <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                        <span aria-hidden="true">&times;</span>
                        <span className="sr-only">Close</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p>Changes saved</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary"
                            onClick={this.handleModalCloseRequest}>Close
                    </button>
                </div>
            </div>
        </Modal>);
    }
}export default Modal;