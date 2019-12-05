import React, {Component} from 'react';
import Select from "../generic_components/select";
import DatePicker from "../generic_components/datepicker";

class ClinicsCuboid extends Component {
    constructor(props) {
        super(props);

        // checkupDate will hold a string of the selected date in format 'yyyy-mm-dd'
        // where mm is the month (NOT month - 1)
        // checkupType will hold the id of the selected checkup type
        this.state = {
            checkupType: {
                labelText: 'Select the desired checkup type:',
                defaultId: '-1',
                defaultText: 'All',
                selected: '-1',
                all: []
            },
            checkupDate: {

            },
            clinics: '',
            checkupTypes: [],
            sorted: {key: '', order: ''}
        };
    }

    componentDidMount() {
        console.log('listView mounted');
        this.loadClinics('all');
        this.loadCheckupTypes();
    }

    loadClinics = (ending) => {
        fetch('http://localhost:8080/api/clinics/' + ending)
            .then(result => result.json())
            .then(clinics => {
                this.setState( {clinics: clinics})
            } )
            .then(() => {console.log('fetched clinics/' + ending)});
    };

    loadCheckupTypes = () => {
        fetch('http://localhost:8080/api/checkupTypes/all')
            .then(result => result.json())
            .then(checkupTypes => {
                let formatted = checkupTypes.map(checkupType => { return {id: checkupType.id, text: checkupType.name}; });
                this.setState({checkupTypeInfo: {all: formatted}});
            })
            .then(() => {console.log('fetched checkupTypes')});
    };

    onCheckupTypeChange = (e) => {
        this.setState( {checkupType: e.target.value});
        console.log(e.target.value);

        if (e.target.value === '-1')
            this.loadClinics('all');
        else if (this.state.checkupDate === '')
            this.loadClinics('checkupType:' + e.target.value);
        else
            this.loadClinics('checkupType:' + e.target.value + '/date:' + this.state.checkupDate)
    };

    onDateChange = (e) => {
        this.setState({checkupDate: e.target.value});
        console.log(e.target.value);

        if (this.state.checkupType === '-1')
            this.loadClinics('all');
        else if (e.target.value === '')
            this.loadClinics('checkupType:' + this.state.checkupType);
        else
            this.loadClinics('checkupType:' + this.state.checkupType + '/date:' + e.target.value)
    };

    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <Select
                            labelText={this.state.checkupType.labelText}
                            options={this.state.checkupType.all}
                            defaultId={this.state.checkupType.defaultId}
                            defaultText={this.state.checkupType.defaultText}
                            onChange={this.onCheckupTypeChange}
                        />
                    </div>
                    <div className='col'>
                        <DatePicker
                            labelText='Select the desired day of the checkup:'
                            onChange={this.onDateChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ClinicsCuboid;