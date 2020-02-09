import React, {Component} from 'react';
import Select from "../generic_components/select";
import DatePicker from "../generic_components/datepicker";
import Table from "../generic_components/table";
import {sortBy} from "../utils/utils";
import Axios from "axios";

class ClinicsCuboid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chkTypeSelectedId: this.chkTypeDefaultId,
            chkTypeSelectedName: '',
            chkTypeAll: [],

            chkDateSelected: this.chkDateDefault,

            displayedElement: this.elements.clinics,

            clinicHeaders: [],
            clinicAll: [],

            clinicSelectedId: '',
            clinicSelectedName: '',
            doctorHeaders: [],
            doctorAll: [],

            sortedBy: {key: '', order: ''},

            oneClickHeaders: [],
            oneClickAll: [],
            ocSortedBy: {key: '', order: ''},

            doctorSelectedId: '',
            doctorSelectedName: '',

            startTime: this.startTimeDefault,
            endTime: this.endTimeDefault
        };
    }

    elements = {
        clinics: 'Clinics',
        doctors: 'Doctors',
        chkRequest: 'Checkup Request'
    };

    chkTypeLabelText = 'Select the desired checkup type:';
    chkTypeDefaultId = '-1';
    chkTypeDefaultText = 'All';

    chkDateLabelText = 'Select the desired checkup date:';
    chkDateDefault = '';

    clinicEmptyListMsg = 'No clinics found that fit the selected criteria.';
    doctorEmptyListMsg = 'No doctors found that fit the selected criteria.';
    oneClickEmptyListMsg = 'No one-click checkups found that fit the selected criteria.';

    startTimeDefault = '';
    endTimeDefault = '';

    componentDidMount() {
        // console.log('listView mounted');
        this.loadClinics('all');
        this.loadCheckupTypes();
        this.loadOneClicks('')
    }

    clinicEnding = (chkType, date) => {
        let ending;
        if (chkType === this.chkTypeDefaultId)
            ending = 'all';
        else {
            ending = 'checkupType:' + chkType;
            if (date !== this.chkDateDefault)
                ending += '/date:' + date;
        }
        return ending;
    };

    loadClinics = (ending) => {
        Axios({
            method: 'get',
            url: 'http://localhost:8080/api/clinics/' + ending,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
        })
            .then(result => result.data)
            .then(clinics => {
                // console.log(clinics);
                let headers = [
                    {headId: 'name', text: 'Name'},
                    {headId: 'country', text: 'Country'},
                    {headId: 'city', text: 'City'},
                    {headId: 'address', text: 'Address'},
                    {headId: 'averageRating', text: 'Rating'}
                ];
                if (ending.toString() !== 'all')
                    headers = headers.concat({headId: 'price', text: 'Price'});

                let formatted = clinics.map(clinic => {
                    let rl = {};
                    for (let header of headers) {
                        rl[header.headId] = clinic[header.headId]
                    }
                    rl['rowId'] = clinic.id;

                    return rl;
                });

                this.setState( {clinicHeaders: headers} );
                this.setState( {clinicAll: formatted});
            } )
        // .then(() => {console.log('fetched clinics/' + ending)});
    };

    doctorEnding = (clinic, chkType, date) => {
        // console.log('clinic: ' + clinic + '\tchkType: ' + chkType + '\tdate: ' + date);
        let ending = 'clinic:' + clinic;
        if (chkType !== this.chkTypeDefaultId) {
            ending += '/checkupType:' + chkType;
            if (date !== this.chkDateDefault)
                ending += '/date:' + date;
        }
        // console.log('ending: ' + ending);
        return ending;
    };

    loadDoctors = (ending) => {
        Axios({
            method: 'get',
            url: 'http://localhost:8080/api/doctors/' + ending,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
        })
            .then(result => result.data)
            .then(doctors => {
                let headers = [
                    {headId: 'name', text: 'Name'},
                    {headId: 'lastName', text: 'Last name'}
                ];
                let formatted = doctors.map(doctor => {
                    let rl = {};
                    for (let header of headers) {
                        rl[header.headId] = doctor[header.headId]
                    }
                    rl['rowId'] = doctor.id;

                    return rl;
                });

                this.setState( {doctorHeaders: headers, doctorAll: formatted})
            })
        // .then(() => {console.log('fetched doctors/' + ending)})
    };

    oneClickEnding = (clinic, checkupType, date) => {
        let ending = '';

        if (clinic !== '')
            ending += '/clinic:' + clinic;
        if (checkupType !== this.chkTypeDefaultId)
            ending += '/checkupType:' + checkupType;
        if (date !== this.chkDateDefault)
            ending += '/date:' + date;

        // console.log('inside oneClickEnding: ' + clinic + '\t' + checkupType + '\t' + date + '\n' + ending);
        return ending;
    };

    loadOneClicks = (ending) => {
        Axios({
            method: 'get',
            url: 'http://localhost:8080/api/oneClickCheckup/pretty' + ending,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
        })
            .then(result => result.data)
            .then(oneClicks => {
                let headers = [
                    {headId: 'clinicName', text: 'Clinic'},
                    {headId: 'hallName', text: 'Hall'},
                    {headId: 'doctorFullName', text: 'Doctor'},
                    {headId: 'startDate', text: 'Start Time'},
                    {headId: 'duration', text: 'Duration'},
                    {headId: 'price', text: 'Price'}
                ];
                if (!ending.toString().includes('checkupType'))
                    headers = headers.concat({headId: 'checkupTypeName', text: 'Checkup Type'});

                let formatted = oneClicks.map(oneClick => {
                    let rl = {};
                    for (let header of headers) {
                        if (header.headId === 'startDate')
                            rl[header.headId] = new Date(oneClick[header.headId]).toLocaleString();
                        else
                            rl[header.headId] = oneClick[header.headId]
                    }
                    rl['rowId'] = oneClick.id;
                    return rl;
                });

                this.setState({ oneClickHeaders: headers, oneClickAll: formatted })
            });
    };

    reserveOneClick = (oneClickId) => {
        Axios({
            method: 'put',
            url: 'http://localhost:8080/api/oneClickCheckup/reserve:' + oneClickId,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
        })
            .then(result => console.log(result.data))
            .then(() => this.props.openHomeCuboid());
    };

    ocExtraHeaders = [
        {id: 'e1', text: 'Reserve', onClick: this.reserveOneClick}
    ];

    loadCheckupTypes = () => {
        Axios({
            method: 'get',
            url: 'http://localhost:8080/api/checkupTypes/all',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
        })
            .then(result => result.data)
            .then(checkupTypes => {
                let formatted = checkupTypes.map(checkupType => { return {id: checkupType.id, text: checkupType.name}; });
                this.setState({chkTypeAll: formatted});
            })
        // .then(() => {console.log('fetched checkupTypes')});
    };

    onCheckupTypeChange = (e) => {
        let selectedChkType = e.target.value;
        this.setState( {chkTypeSelectedId: selectedChkType});
        // console.log('selected checkup type: ' + selectedChkType);
        for (let checkupType of this.state.chkTypeAll) {
            if (checkupType.id.toString() === selectedChkType.toString()) {
                this.setState({ chkTypeSelectedName: checkupType.text });
                break;
            }
        }

        this.loadOneClicks(this.oneClickEnding(this.state.clinicSelectedId, selectedChkType, this.state.chkDateSelected));

        if (this.state.displayedElement === this.elements.clinics)
            this.loadClinics(this.clinicEnding(selectedChkType, this.state.chkDateSelected));
        else if (this.state.displayedElement === this.elements.doctors)
            this.loadDoctors(this.doctorEnding(this.state.clinicSelectedId, selectedChkType, this.state.chkDateSelected));
    };

    onDateChange = (e) => {
        let selectedDate = e.target.value;
        this.setState({ chkDateSelected: selectedDate });
        // console.log(selectedDate);

        this.loadOneClicks(this.oneClickEnding(this.state.clinicSelectedId, this.state.chkTypeSelectedId, selectedDate));

        if (this.state.displayedElement === this.elements.clinics)
            this.loadClinics(this.clinicEnding(this.state.chkTypeSelectedId, selectedDate));
        else if (this.state.displayedElement === this.elements.doctors)
            this.loadDoctors(this.doctorEnding(this.state.clinicSelectedId, this.state.chkTypeSelectedId, selectedDate));
    };

    onOneClickHeaderClick = (e) => {
        let order = 'asc';
        const key = e.target.id;
        if (key === this.state.ocSortedBy.key)
            if (this.state.ocSortedBy.order === 'asc')
                order = 'desc';

        let sorted = sortBy(this.state.oneClickAll, key, order);
        this.setState({ ocSortedBy: { key: key, order: order } });
        this.setState( { oneClickAll: sorted });
    };

    onHeaderClick = (e) => {
        let order = 'asc';
        const key = e.target.id;
        if (key === this.state.sortedBy.key)
            if (this.state.sortedBy.order === 'asc')
                order = 'desc';

        let sorted;
        if (this.state.displayedElement === this.elements.clinics)
            sorted = sortBy(this.state.clinicAll, key, order);
        else if (this.state.displayedElement === this.elements.doctors)
            sorted = sortBy(this.state.doctorAll, key, order);

        this.setState({sortedBy: {key: key, order: order}} );
        if (this.state.displayedElement === this.elements.clinics)
            this.setState({clinicAll: sorted} );
        else if (this.state.displayedElement === this.elements.doctors)
            this.setState( {doctorAll: sorted});
    };

    displayClinicTable = () => {
        this.setState({ displayedElement: this.elements.clinics });
        this.setState({ clinicSelectedId: '' });
        this.loadClinics(this.clinicEnding(this.state.chkTypeSelectedId, this.state.chkDateSelected));
        this.loadOneClicks(this.oneClickEnding('', this.state.chkTypeSelectedId, this.state.chkDateSelected));
    };

    displayDoctorTable = (e) => {
        let selectedClinic = (e && e.target.getAttribute('data-row-id')) || this.state.doctorSelectedId;
        for (let clinic of this.state.clinicAll) {
            if (clinic.rowId.toString() === selectedClinic.toString()) {
                this.setState({ clinicSelectedName: clinic.name });
                break;
            }
        }
        this.setState({ displayedElement: this.elements.doctors, clinicSelectedId: selectedClinic });
        this.setState({ doctorSelectedId: '' });
        this.loadDoctors(this.doctorEnding(selectedClinic, this.state.chkTypeSelectedId, this.state.chkDateSelected));
        this.loadOneClicks(this.oneClickEnding(selectedClinic, this.state.chkTypeSelectedId, this.state.chkDateSelected));
    };

    displayChkRequest = (e) => {
        if (this.state.chkDateSelected !== this.chkDateDefault && this.state.chkTypeSelectedId !== this.chkTypeDefaultId) {
            let selectedDoctor = e.target.getAttribute('data-row-id');
            for (let doctor of this.state.doctorAll) {
                if (doctor.rowId.toString() === selectedDoctor.toString()) {
                    this.setState({ doctorSelectedName: doctor.name + ' ' + doctor.lastName });
                    break;
                }
            }
            this.setState({ displayedElement: this.elements.chkRequest, doctorSelectedId: selectedDoctor });
        }
    };

    back = () => {
        // if (this.state.displayedElement === this.elements.clinics) {
        //     this.props.openHomeCuboid();
        if (this.state.displayedElement === this.elements.doctors) {
            this.displayClinicTable();
        } else if (this.state.displayedElement === this.elements.chkRequest) {
            this.displayDoctorTable();
        }
    };

    startTimeChange = (e) => {
        let startTime = e.target.value;
        // console.log(startTime);
        this.setState( { startTime } );
    };

    endTimeChange = (e) => {
        let endTime = e.target.value;
        // console.log(endTime);
        this.setState( { endTime } );
    };

    submitRequest = (e) => {
        e.preventDefault();
        if (this.state.startTime !== this.startTimeDefault && this.state.endTime !== this.endTimeDefault) {
            let dateArray = this.state.chkDateSelected.split('-');
            let startTimeArray = this.state.startTime.split(':');
            let endTimeArray = this.state.endTime.split(':');

            let startDate = new Date(Number(dateArray[0]), Number(dateArray[1]), Number(dateArray[2]),
                Number(startTimeArray[0]), Number(startTimeArray[1]));
            let endDate = new Date(Number(dateArray[0]), Number(dateArray[1]), Number(dateArray[2]),
                Number(endTimeArray[0]), Number(endTimeArray[1]));

            let checkupRequest = {
                startDate: startDate,
                endDate: endDate,
                clinicId: this.state.clinicSelectedId,
                doctorId: this.state.doctorSelectedId,
                checkupTypeId: this.state.chkTypeSelectedId,
                patientId: this.props.user && this.props.user.id
            };
            Axios({
                method: 'post',
                url: 'http://localhost:8080/api/checkupRequests',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')},
                data: checkupRequest
            })
                .then(result => { /*console.log('posted checkup request');*/ console.log(result.data); } )
                .then(() => this.props.openHomeCuboid());
        }
    };

    render() {
        return (
            <div className='row'> <div className='col'>
                <div className='row'>
                    <div className='col'>
                        {
                            this.state.displayedElement === this.elements.clinics ?
                                <h5 className='text-primary'><b>Clinics</b></h5>
                            : this.state.displayedElement === this.elements.doctors ?
                                <h5 className='text-primary'><b>Doctors of {this.state.clinicSelectedName}</b></h5>
                            :
                                <>
                                    <h5 className='text-primary mb-0'><b>Request a Checkup</b></h5>
                                    <h6 className='text-primary ml-2 my-0 p-0'>{this.state.chkTypeSelectedName}</h6>
                                    <h6 className='text-primary ml-2 my-0 p-0'>{this.state.doctorSelectedName}</h6>
                                    <h6 className='text-primary ml-2 mt-0 mb-2 p-0'>{this.state.chkDateSelected}</h6>
                                </>
                        }
                    </div>
                    <div className='col-1'>
                        {
                            this.state.displayedElement !== this.elements.clinics &&
                                <button className='btn btn-primary float-right' onClick={this.back}>Back</button>
                        }
                    </div>
                </div>
                {
                    (this.state.displayedElement === this.elements.clinics || this.state.displayedElement === this.elements.doctors) &&
                    <div className='row'>
                        <div className='col'>
                            <Select
                                labelText={this.chkTypeLabelText}
                                options={this.state.chkTypeAll}
                                defaultId={this.chkTypeDefaultId}
                                defaultText={this.chkTypeDefaultText}
                                selectedId={this.state.chkTypeSelectedId}
                                onChange={this.onCheckupTypeChange}
                            />
                        </div>
                        <div className='col'>
                            <DatePicker
                                labelText={this.chkDateLabelText}
                                onChange={this.onDateChange}
                                selectedDate={this.state.chkDateSelected}
                            />
                        </div>
                    </div>
                }
                <div className='row'>
                    <div className='col'>
                        {
                            this.state.displayedElement === this.elements.clinics ?
                                <Table
                                    headers={this.state.clinicHeaders}
                                    rows={this.state.clinicAll}
                                    emptyListMsg={this.clinicEmptyListMsg}
                                    onHeaderClick={this.onHeaderClick}
                                    onRowClick={this.displayDoctorTable}
                                />
                            : this.state.displayedElement === this.elements.doctors ?
                                <Table
                                    headers={this.state.doctorHeaders}
                                    rows={this.state.doctorAll}
                                    emptyListMsg={this.doctorEmptyListMsg}
                                    onHeaderClick={this.onHeaderClick}
                                    onRowClick={this.displayChkRequest}
                                />
                            :
                                <form>
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='form-group'>
                                                <label htmlFor='stDate'>Checkup start:</label>
                                                <input type='time' className='form-control' id='stDate'
                                                       onChange={this.startTimeChange} defaultValue={this.startTimeDefault}/>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='form-group'>
                                                <label htmlFor='edDate'>Checkup end:</label>
                                                <input type='time' className='form-control' id='edDate'
                                                       onChange={this.endTimeChange} defaultValue={this.endTimeDefault}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <button className='btn btn-block btn-primary' onClick={this.submitRequest}>
                                                Submit Request
                                            </button>
                                        </div>
                                    </div>
                                </form>
                        }
                    </div>
                </div>
                {(this.state.displayedElement === this.elements.clinics || this.state.displayedElement === this.elements.doctors) &&
                    <div>
                        <div className='row mt-3'>
                            <div className='col'>
                                <h5 className='text-primary font-weight-bold'>One-Click Checkups</h5>
                            </div>
                        </div>
                        <div className='row mt-1'>
                            <div className='col'>
                                <Table
                                    headers={this.state.oneClickHeaders}
                                    rows={this.state.oneClickAll}
                                    emptyListMsg={this.oneClickEmptyListMsg}
                                    extraHeaders={this.ocExtraHeaders}
                                    onHeaderClick={this.onOneClickHeaderClick}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div> </div>
        );
    }
}

export default ClinicsCuboid;
