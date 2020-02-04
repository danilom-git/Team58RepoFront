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
            chkTypeSelected: this.chkTypeDefaultId,
            chkTypeAll: [],

            chkDateSelected: this.chkDateDefault,

            displayedElement: this.elements.clinics,

            clinicHeaders: [],
            clinicAll: [],

            clinicSelected: '',
            doctorHeaders: [],
            doctorAll: [],

            sortedBy: {key: '', order: ''},

            doctorSelected: '',

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

    startTimeDefault = '';
    endTimeDefault = '';

    componentDidMount() {
        // console.log('listView mounted');
        this.loadClinics('all');
        this.loadCheckupTypes();
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
        this.setState( {chkTypeSelected: selectedChkType});
        // console.log('selected checkup type: ' + selectedChkType);

        if (this.state.displayedElement === this.elements.clinics)
            this.loadClinics(this.clinicEnding(selectedChkType, this.state.chkDateSelected));
        else if (this.state.displayedElement === this.elements.doctors)
            this.loadDoctors(this.doctorEnding(this.state.clinicSelected, selectedChkType, this.state.chkDateSelected));
    };

    onDateChange = (e) => {
        let selectedDate = e.target.value;
        this.setState({chkDateSelected: selectedDate});
        // console.log(selectedDate);

        if (this.state.displayedElement === this.elements.clinics)
            this.loadClinics(this.clinicEnding(this.state.chkTypeSelected, selectedDate));
        else if (this.state.displayedElement === this.elements.doctors)
            this.loadDoctors(this.doctorEnding(this.state.clinicSelected, this.state.chkTypeSelected, selectedDate));
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
        this.setState( {displayedElement: this.elements.clinics});
        this.loadClinics(this.clinicEnding(this.state.chkTypeSelected, this.state.chkDateSelected));
    };

    displayDoctorTable = (e) => {
        let selectedClinic = (e && e.target.getAttribute('data-row-id')) || this.state.doctorSelected;
        this.setState( {displayedElement: this.elements.doctors, clinicSelected: selectedClinic} );
        this.loadDoctors(this.doctorEnding(selectedClinic, this.state.chkTypeSelected, this.state.chkDateSelected));
    };

    displayChkRequest = (e) => {
        if (this.state.chkDateSelected !== this.chkDateDefault && this.state.chkTypeSelected !== this.chkTypeDefaultId) {
            let selectedDoctor = e.target.getAttribute('data-row-id');
            this.setState({displayedElement: this.elements.chkRequest, doctorSelected: selectedDoctor});
        }
    };

    back = () => {
        // if (this.state.displayedElement === this.elements.clinics) {
        //     this.props.openEmptyCuboid();
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
                clinicId: this.state.clinicSelected,
                doctorId: this.state.doctorSelected,
                checkupTypeId: this.state.chkTypeSelected
            };
            Axios({
                method: 'post',
                url: 'http://localhost:8080/api/checkupRequests',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')},
                data: checkupRequest
            })
                .then(result => { /*console.log('posted checkup request');*/ console.log(result.data); } )
                .then(() => { this.props.openEmptyCuboid(); });
        }
    };

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <h5 className='text-primary'>
                            {
                                this.state.displayedElement === this.elements.clinics ?
                                    'Clinics'
                                    : this.state.displayedElement === this.elements.doctors ?
                                    'Doctors of Clinic ' + this.state.clinicSelected
                                    :
                                    'Checkup Request for Type ' + this.state.chkTypeSelected + ' by Doctor ' +
                                    this.state.doctorSelected + ' on ' + this.state.chkDateSelected
                            }
                        </h5>
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
                                selectedId={this.state.chkTypeSelected}
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
            </div>
        );
    }
}

export default ClinicsCuboid;
