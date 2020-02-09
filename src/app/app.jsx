import React, {Component,} from 'react';
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../generic_components/navbar";
import AdminClinicProfil from "../clinic/adminClinicProfil";
import ClinicProfil from "../clinic/clinicProfil";
import DoctorProfil from "../doctor/doctorProfil";
import PatientPage from "../patient/patientPage";
import LoginPage from "./loginPage";
import RegistrationPage from "./registrationPage";
import Modal from "react-modal";

Modal.setAppElement('#root');

const customStyles = {
    overlay: {zIndex: 10000}
};


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: this.usrLoggedOut,
            registering: false,
            profil: <AdminClinicProfil  changeToClinic={this.changeToClinic} />,
            newPassword: "",
            userId: "",
            modal: false
        };
    }

    usrLoggedOut = 'loggedOut';
    usrPatient = 'patient';
    usrDoctor = 'doctor';
    usrClinicAdmin = 'clinicAdmin';

    changeToClinicAdmin = () => {
        this.setState({profil: <AdminClinicProfil  changeToClinic={this.changeToClinic} />});
    };

    getTitle = (userType) => {
        switch (userType) {
            case this.usrPatient: return 'Patient';
            case this.usrDoctor: return 'Doctor';
            case this.usrClinicAdmin: return 'Clinic Admin';

            default: return 'Logged out';
        }
    };

    newPasswordOnChange = (e) =>{
        this.setState({newPassword:e.target.value});
    };

    showModal = () => {
        this.setState({modal: true});
    };

    handleModalCloseRequest = () => {
        this.setState({modal: false});
    };

    componentDidMount() {
        let userType = localStorage.getItem('userType');
        if (userType)
            this.setState({ userType: userType });


    }



    changeToClinic = () => {
        this.setState({profil: <ClinicProfil changeToAdmin={this.changeToClinicAdmin} />});
        this.setState({title: "Clinic"});
    };

    passwordChange = () =>{
        let passDto = {
         oldPassword: "123",
         newPassword: this.state.newPassword
        };

        console.log(passDto);

       Axios({
            method:'put',
            url:'http://localhost:8080/auth/changePassword',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: passDto
        }).then((res)=>{
            //console.log(passDto);
            this.handleModalCloseRequest();
       });
    };

    onLogIn = (userType, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userType', userType);

        if(userType !== this.usrPatient) {
            Axios({
                method: 'get',
                url: 'http://localhost:8080/auth/getUser/token:' + token + '/type:' + userType,
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            }).then(res => {
                this.setState({userId: res.data.id});
                if (!res.data.firstPasswordChanged)
                    this.showModal();
            });
        }

        //console.log(userType,token);

        this.setState({ userType: userType });
    };

    onLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        this.setState({ userType: this.usrLoggedOut });
    };

    onRegistration = (message) => {
        this.setState({ registering: false });
        console.log(message);
    };

    render() {
        let links = undefined;
        if (this.state.userType !== this.usrLoggedOut)
            links = [{id: 1, text: 'Log Out', onClick: this.onLogOut}];
        else if (this.state.registering === true)
            links = [{id: 1, text: 'Log In', onClick: () => this.setState({ registering: false })}];
        else
            links = [{id: 1, text: 'Register', onClick: () => this.setState({ registering: true })}];

        return (
            <>
                <Navbar title={this.getTitle(this.state.userType)}
                    links={links}
                />
                {
                    this.state.userType === this.usrPatient ?
                        <PatientPage/>
                    : this.state.userType === this.usrDoctor ?
                        <DoctorProfil/>
                    : this.state.userType === this.usrClinicAdmin ?
                        this.state.profil
                    : this.state.registering ?
                        <RegistrationPage onRegistration={this.onRegistration}/>
                    :
                        <LoginPage onLogIn={this.onLogIn}/>
                }

                <Modal
                    className="Modal__Bootstrap modal-dialog"
                    closeTimeoutMS={150}
                    isOpen={this.state.modal}
                    style={customStyles}
                    onRequestClose={this.handleModalCloseRequest}
                >
                    <div className="modal-content" role="dialog">
                        <div className="modal-header">
                            <h4 className="modal-title">Change your password</h4>
                            <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                                <span aria-hidden="true">&times;</span>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>New password:</p>
                            <input onChange={this.newPasswordOnChange} type="password"/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    onClick={this.passwordChange}>Confirm
                            </button>
                            <button type="button" className="btn btn-secondary"
                                    onClick={this.handleModalCloseRequest}>Close
                            </button>
                        </div>
                    </div>
                </Modal>
             </>
        );
    }
}

export default App;
