import React, {Component} from "react";
import Axios from "axios";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    overlay: {zIndex: 10000}
};

class AbsenceRequests extends Component{

    state = {
        requests: [],
        clinicId:"",
        modal: false,
        modal2: false,
        responseText:"",
        reason: "",
        doctorId:"",
        requestId:""
    };

    showModal = () => {
        this.setState({modal: true});
    };

    handleModalCloseRequest = () => {
        this.setState({modal: false});
    };

    showModal2 = (e,id,uid) => {
        this.setState({modal2: true});
        this.setState(() => ({doctorId: uid}));
        this.setState(() => ({requestId: id}));
    };

    handleModalCloseRequest2 = () => {
        this.setState({modal2: false});
        this.setState({reason:""});
    };

    handleModalConfirm = () => {
        this.setState({modal2: false});
        if(this.state.reason !== "")
        {
            Axios({
                method: "delete",
                url: 'http://localhost:8080/api/absenceRequests/request:'+this.state.requestId+"/reason:"+this.state.reason + "/user:"+ this.state.doctorId,
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
            }).then(() => {
                this.loadRequests();
            });
        }

    };

    modalReasonChange = (e) => {
        e.persist();
        console.log(e.target.value);
        this.setState((reason)=>({reason: e.target.value}));
    };

    allowedRequest = (e,id,uid) => {
        Axios({
            method: 'put',
            url : 'http://localhost:8080/api/absenceRequests/request:'+id+"/userId:"+uid+"/",
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}

        }).then((res)=>{
            console.log(res.data);
            if(res.data === true)
            {
                this.setState(()=>({responseText:"Request for absence has been accepted."}));
                this.showModal();
                this.loadRequests();
            }
        });
    };

    loadRequests = () =>{
        Axios({
            method: 'get',
            url: 'http://localhost:8080/api/clinicAdmins/user',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then((res) => {
            this.setState({clinicId: res.data.clinicId});
            console.log(res.data);
            Axios({
                method: 'get',
                url: 'http://localhost:8080/api/absenceRequests/all/clinic:' + this.state.clinicId,
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
            }).then((res) => {
                let requests = res.data;
                for(let c of requests)
                {
                    c.startDate = new Date(c.startDate);
                    c.endDate = new Date(c.endDate);
                    let spl  = c.startDate.toISOString().split('T');
                    //console.log(spl);
                    c.startDate = spl[0];
                    spl  = c.endDate.toISOString().split('T');
                    c.endDate = spl[0];

                }
                this.setState({requests: requests});
            });
        });
    };

    componentDidMount() {
        this.loadRequests();
    }

    render() {
        const requests = this.state.requests.map(request => (
            <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.doctorName+ " "+ request.doctorLastName }</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{request.type}</td>
                <td><button onClick={(e) => this.allowedRequest(e,request.id,request.doctorId)} className="btn btn-success">Allow</button></td>
                <td><button onClick={(e) => this.showModal2(e,request.id,request.doctorId)} className="btn btn-danger">Decline</button></td>
            </tr>
        ));

        return (<>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Medical worker</th>
                    <th scope="col">Start date</th>
                    <th scope="col">End date</th>
                    <th scope="col">Reason</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {requests}
                </tbody>

            </table>

            <Modal
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
                        <p>{this.state.responseText}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                onClick={this.handleModalCloseRequest}>Close
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                className="Modal__Bootstrap modal-dialog"
                closeTimeoutMS={150}
                isOpen={this.state.modal2}
                style={customStyles}
                onRequestClose={this.handleModalCloseRequest2}
            >
                <div className="modal-content" role="dialog">
                    <div className="modal-header">
                        <h4 className="modal-title">Confirmation</h4>
                        <button type="button" className="close" onClick={this.handleModalCloseRequest2}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <input className="col" onChange={this.modalReasonChange} type="text" />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                onClick={this.handleModalCloseRequest2}>Close
                        </button>
                        <button type="button" className="btn btn-secondary"
                                onClick={this.handleModalConfirm}>Confirm
                        </button>
                    </div>
                </div>
            </Modal>

        </>);
    }

}export default AbsenceRequests;