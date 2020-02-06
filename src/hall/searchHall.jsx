import React, {Component} from "react";
import Axios from "axios";
import DatePicker from "../generic_components/datepicker";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    overlay: {zIndex: 10000}
};

class SearchHall extends Component {
    state = {
        checkupRequest: {},
        date: "",
        hallNumber: "",
        hallName: "",
        hallId: "",
        searchedHalls: [],
        fStart: "",
        fEnd: "",
        modal: false,
        modal2: false,
        responseText: <div></div>,
        responseText2: <div></div>

    };

    loadRequests = () => {
        Axios({
            method: 'get',
            url: 'http://localhost:8080/api/checkupRequests/checkupRequest:' + this.props.requestId,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then((res) => {
            this.setState({checkupRequest: res.data});
            console.log(res.data);
        });
    };

    componentDidMount() {
        this.loadRequests();
    }

    showSchedules = (e, checkups) => {
        let res = [];
        console.log(checkups);
        for (let c of checkups) {
            let st = new Date(c.startDate).toLocaleTimeString();
            let en = new Date(c.endDate).toLocaleTimeString();
            let fin = st + " - " + en;
            res.push(fin);
        }
        res = res.map(res => (
            <div>{res}</div>
        ));
        this.setState({responseText: res});
        this.showModal();
    };

    showModal = () => {
        this.setState({modal: true});
    };

    handleModalCloseRequest = () => {
        this.setState({modal: false});
        this.setState({responseText: ""});
    };

    showModal2 = () => {
        this.setState({modal2: true});
    };

    handleModalCloseRequest2 = () => {
        this.setState({modal2: false});
        this.setState({responseText2: ""});
        this.setState({hallId: ""});
    };

    onChangeName = (e) => {
        this.setState({hallName: e.target.value});
    };

    onChangeNumber = (e) => {
        this.setState({hallNumber: e.target.value});
    };

    onChangeDate = (e) => {
        this.setState({date: new Date(e.target.value)});
    };

    handleSubmit = (e) => {
        if (this.state.hallName !== "" || this.state.hallNumber !== "") {
            if (this.state.date !== "") {
                let dateStr = this.state.date.getFullYear() + "-" + this.state.date.getMonth() + "-" + this.state.date.getDate();
                //console.log(this.state.date.toDateString());
                Axios({
                    method: 'get',
                    url: 'http://localhost:8080/api/halls/name:' + this.state.hallName + '/number:' + this.state.hallNumber + '/date:' + dateStr,
                    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
                }).then((res) => {
                    console.log(res.data);
                    this.setState({searchedHalls: res.data});
                });
            }
        }
    };

    scheduleCheckup = (e, hallId) => {
        console.log(hallId);

        let checkup = {
            startDate: this.state.checkupRequest.startDate,
            endDate: this.state.checkupRequest.endDate,
            patientId: this.state.checkupRequest.patientId,
            doctorId: this.state.checkupRequest.doctorId,
            hallId: hallId,
            checkupTypeId: this.state.checkupRequest.checkupTypeId,
            clinicId: this.state.checkupRequest.clinicId
        };

        Axios({
            method: 'post',
            url: 'http://localhost:8080/api/checkups/request:' + this.props.requestId,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: checkup
        }).then((res) => {
            console.log(res.data);
            if (res.data)
                this.setState(() => ({responseText: "Request for checkup confirmation are sent."}));
            else
                this.setState(() => ({responseText: "Selected hall is already scheduled for requester time."}));
            this.showModal();
            this.loadRequests();
        });

        e.stopPropagation();
    };

    firstAvailable = (e, hallId) => {
        Axios({
            method: 'get',
            url: 'http://localhost:8080/api/halls/firstAvailable/hall:' + hallId + '/request:' + this.props.requestId,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }).then(res => {
            let start = new Date(res.data.startDate);
            start = start.toLocaleDateString() + " " + start.toLocaleTimeString();
            let end = new Date(res.data.endDate);
            end = end.toLocaleDateString() + " " + end.toLocaleTimeString();
            this.setState(() => ({
                responseText2: <div>First available time for scheduling:<br></br>Start time:{start} <br></br>End
                    time{end}</div>
            }));
            //console.log(res.data);
            this.setState({hallId: hallId});
            this.showModal2();
            this.setState({fStart: new Date(res.data.startDate)});
            this.setState({fEnd: new Date(res.data.endDate)});
        });
        e.stopPropagation();
    };

    submitFirstAvailable = () => {
        let checkup = {
            startDate: this.state.fStart,
            endDate: this.state.fEnd,
            patientId: this.state.checkupRequest.patientId,
            doctorId: this.state.checkupRequest.doctorId,
            hallId: this.state.hallId,
            checkupTypeId: this.state.checkupRequest.checkupTypeId,
            clinicId: this.state.checkupRequest.clinicId
        };
        Axios({
            method: 'post',
            url: 'http://localhost:8080/api/checkupRequests/changeDate/request:' + this.props.requestId,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: {startDate:this.state.fStart,endDate:this.state.fEnd}
        }).then(res => {
            console.log(res.data);
            Axios({
                method: 'post',
                url: 'http://localhost:8080/api/checkups/request:' + this.props.requestId,
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
                data: checkup
            }).then((res) => {
                console.log(res.data);

            });
        });


    };

    render() {
        const halls = this.state.searchedHalls.map(hall => (
            <tr onClick={(e) => this.showSchedules(e, hall.checkups)} key={hall.id}>
                <td>{hall.id}</td>
                <td>{hall.name}</td>
                <td>{hall.number}</td>
                <td>
                    <button onClick={(e) => this.firstAvailable(e, hall.id)} type="button"
                            className="btn btn-primary">First available
                    </button>
                </td>
                <td>
                    <button onClick={(e) => this.scheduleCheckup(e, hall.id)} type="button"
                            className="btn btn-primary">Schedule
                    </button>
                </td>
            </tr>
        ));

        return (<>
            <div className="row">
                <div className="col">
                    <label>Hall name</label>
                    <input onChange={this.onChangeName} className="form-control" type="text"/>
                </div>
                <div className="col">
                    <label>Hall number</label>
                    <input onChange={this.onChangeNumber} className="form-control" type="text"/>
                </div>
                <div className="col">
                    <DatePicker onChange={this.onChangeDate} className="form-control"/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                    <button onClick={this.handleSubmit} className="btn btn-primary">Search</button>
                </div>
            </div>
            <div className="row">
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Number</th>
                    </tr>
                    </thead>
                    <tbody>
                    {halls}
                    </tbody>
                </table>
            </div>

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
                        <p>Time of scheduled checkups:</p>
                        {this.state.responseText}
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
                        <h4 className="modal-title">Notification</h4>
                        <button type="button" className="close" onClick={this.handleModalCloseRequest2}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Time of scheduled checkups:</p>
                        {this.state.responseText2}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                onClick={this.handleModalCloseRequest2}>Close
                        </button>
                        <button onClick={this.submitFirstAvailable} type="button" className="btn btn-secondary">Schedule
                        </button>
                    </div>
                </div>
            </Modal>
        </>);
    }
}

export default SearchHall;