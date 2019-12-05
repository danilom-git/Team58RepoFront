import React, {Component} from 'react';
import Select from "../generic_components/select";
import DatePicker from "../generic_components/datepicker";
import Table from "../generic_components/table";
import {sortBy} from "../utils/utils";

class ClinicsCuboid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chkTypeSelected: '-1',
            chkTypeAll: [],

            chkDateSelected: '',

            table: 'clinics',

            clinicHeaders: [],
            clinicAll: [],

            clinicSelected: '',
            doctorHeaders: [],
            doctorAll: [],

            sortedBy: {key: '', order: ''}
        };
    }

    chkTypeLabelText = 'Select the desired checkup type:';
    chkTypeDefaultId = '-1';
    chkTypeDefaultText = 'All';

    chkDateLabelText = 'Select the desired checkup date:';
    chkDateDefault = '';

    clinicEmptyListMsg = 'No clinics found that fit the selected criteria.';
    doctorEmptyListMsg = 'No doctors found that fit the selected criteria.';

    clinicTableLabel = 'Clinics';
    doctorTableLabel = 'Doctors';

    componentDidMount() {
        console.log('listView mounted');
        this.loadClinics('all');
        this.loadCheckupTypes();
    }

    loadClinics = (ending) => {
        fetch('http://localhost:8080/api/clinics/' + ending)
            .then(result => result.json())
            .then(clinics => {
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

                console.log(formatted);

                this.setState( {clinicHeaders: headers} );
                this.setState( {clinicAll: formatted});
            } )
            .then(() => {console.log('fetched clinics/' + ending)});
    };

    loadDoctors = (ending) => {
        fetch('http://localhost:8080/api/doctors/' + ending)
            .then(result => result.json())
            .then(doctors => {
                let headers = [
                    {headId: 'name', text: 'Name'},
                    {headId: 'lastName', text: 'Last name'}
                ];
                console.log(ending);
                console.log(doctors);
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
            .then(() => {console.log('fetched doctors/' + ending)})
    };

    loadCheckupTypes = () => {
        fetch('http://localhost:8080/api/checkupTypes/all')
            .then(result => result.json())
            .then(checkupTypes => {
                let formatted = checkupTypes.map(checkupType => { return {id: checkupType.id, text: checkupType.name}; });
                this.setState({chkTypeAll: formatted});
            })
            .then(() => {console.log('fetched checkupTypes')});
    };

    onCheckupTypeChange = (e) => {
        let selectedChkType = e.target.value;
        this.setState( {chkTypeSelected: selectedChkType});
        console.log(selectedChkType);

        if (this.state.table === 'clinics')
            this.loadClinics(this.clinicEnding(selectedChkType, this.state.chkDateSelected));
        else
            this.loadDoctors(this.doctorEnding(this.state.clinicSelected, selectedChkType, this.state.chkDateSelected));
    };

    onDateChange = (e) => {
        let selectedDate = e.target.value;
        this.setState({checkupDate: selectedDate});
        console.log(selectedDate);

        if (this.state.table === 'clinics')
            this.loadClinics(this.clinicEnding(this.state.chkTypeSelected, selectedDate));
        else
            this.loadDoctors(this.doctorEnding(this.state.clinicSelected, this.state.chkTypeSelected, selectedDate));
    };

    onHeaderClick = (e) => {
        let order = 'asc';
        const key = e.target.id;
        if (key === this.state.sortedBy.key)
            if (this.state.sortedBy.order === 'asc')
                order = 'desc';

        let sorted;
        if (this.state.table === 'clinics')
            sorted = sortBy(this.state.clinicAll, key, order);
        else
            sorted = sortBy(this.state.doctorAll, key, order);

        this.setState({sortedBy: {key: key, order: order}} );
        if (this.state.table === 'clinics')
            this.setState({clinicAll: sorted} );
        else
            this.setState( {doctorAll: sorted});
    };

    clinicTable = () => {
        this.loadClinics(this.clinicEnding(this.state.chkTypeSelected, this.state.chkDateSelected));
        this.setState( {table: 'clinics'} );
    };

    clinicEnding = (chkType, date) => {
        let ending;
        if (this.state.chkTypeSelected === this.chkTypeDefaultId)
            ending = 'all';
        else {
            ending = 'checkupType:' + chkType;
            if (date !== this.chkDateDefault)
                ending += '/date:' + date;
        }
        return ending;
    };

    doctorTable = (e) => {
        let selectedClinic = e.target.getAttribute('data-clinic');
        this.loadDoctors(this.doctorEnding(selectedClinic, this.state.chkTypeSelected, this.state.chkDateSelected));

        this.setState( {table: 'doctors', clinicSelected: selectedClinic} );
    };

    doctorEnding = (clinic, chkType, date) => {
        console.log('clinic: ' + clinic + '\tchkType: ' + chkType + '\tdate: ' + date);
        let ending = 'clinic:' + clinic;
        if (chkType !== this.chkTypeDefaultId) {
            ending += '/checkupType:' + chkType;
            if (date !== this.chkDateDefault)
                ending += '/date:' + date;
        }
        console.log('ending: ' + ending);
        return ending;
    };

    back = () => {
        if (this.state.table === 'doctors') {
            this.setState( {table: 'clinics'} );
        } else if (this.state.table === 'clinics') {
            this.props.openEmptyCuboid();
        }
    };

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <h3 className='text-primary'>{this.state.table === 'clinics' ? this.clinicTableLabel : this.doctorTableLabel}</h3>
                    </div>
                    <div className='col'>
                        <button className='btn btn-primary float-right' onClick={this.back}>Back</button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <Select
                            labelText={this.chkTypeLabelText}
                            options={this.state.chkTypeAll}
                            defaultId={this.chkTypeDefaultId}
                            defaultText={this.chkTypeDefaultText}
                            onChange={this.onCheckupTypeChange}
                        />
                    </div>
                    <div className='col'>
                        <DatePicker
                            labelText={this.chkDateLabelText}
                            onChange={this.onDateChange}
                        />
                    </div>
                </div>
                <div className='row'>
                    {this.state.table === 'clinics' ?
                        <Table
                            headers={this.state.clinicHeaders}
                            rows={this.state.clinicAll}
                            emptyListMsg={this.clinicEmptyListMsg}
                            onHeaderClick={this.onHeaderClick}
                            onRowClick={this.doctorTable}
                        />
                        :
                        <Table
                            headers={this.state.doctorHeaders}
                            rows={this.state.doctorAll}
                            emptyListMsg={this.doctorEmptyListMsg}
                            onHeaderClick={this.onHeaderClick}
                        />
                    }
                </div>
            </div>
        );
    }
}

export default ClinicsCuboid;