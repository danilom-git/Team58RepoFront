import React, {Component} from 'react';
import Select from "../generic_components/select";
import DatePicker from "../generic_components/datepicker";
import Table from "../generic_components/table";

class ClinicsCuboid extends Component {
    constructor(props) {
        super(props);

        // checkupDate will hold a string of the selected date in format 'yyyy-mm-dd'
        // where mm is the month (NOT month - 1)
        // checkupType will hold the id of the selected checkup type
        this.state = {
            chkTypeSelected: '-1',
            chkTypeAll: [],

            chkDateSelected: '',

            clinicHeaders: [],
            clinicAll: [],
            clinicsSortedBy: {key: '', order: ''}
        };
    }

    chkTypeLabelText = 'Select the desired checkup type:';
    chkTypeDefaultId = '-1';
    chkTypeDefaultText = 'All';

    chkDateLabelText = 'Select the desired checkup date:';
    chkDateDefault = '';

    clinicEmptyListMsg = 'No clinics found that fit the selected criteria.';

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
                    return {
                        rowId: clinic.id,
                        rowData: headers.map(header => {
                            return {headId: header.headId, text: clinic[header.headId]};
                        })};
                });

                console.log(formatted);

                this.setState( {clinicHeaders: headers} );
                this.setState( {clinicAll: formatted});
            } )
            .then(() => {console.log('fetched clinics/' + ending)});
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
        this.setState( {chkTypeSelected: e.target.value});
        console.log(e.target.value);

        if (e.target.value === this.chkTypeDefaultId)
            this.loadClinics('all');
        else if (this.state.chkDateSelected === this.chkDateDefault)
            this.loadClinics('checkupType:' + e.target.value);
        else
            this.loadClinics('checkupType:' + e.target.value + '/date:' + this.state.chkDateSelected)
    };

    onDateChange = (e) => {
        this.setState({checkupDate: e.target.value});
        console.log(e.target.value);

        if (this.state.chkTypeSelected === this.chkTypeDefaultId)
            this.loadClinics('all');
        else if (e.target.value === this.chkDateDefault)
            this.loadClinics('checkupType:' + this.state.chkTypeSelected);
        else
            this.loadClinics('checkupType:' + this.state.chkTypeSelected + '/date:' + e.target.value)
    };

    render() {
        return (
            <div className='container-fluid'>
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
                    <Table
                        headers={this.state.clinicHeaders}
                        rows={this.state.clinicAll}
                        emptyListMsg={this.clinicEmptyListMsg}
                    />
                </div>
            </div>
        );
    }
}

export default ClinicsCuboid;