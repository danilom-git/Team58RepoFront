import React, {Component} from 'react';
import DatePicker from "./datepicker";
import Select from "./select";
import ListViewTable from "./listViewTable";

class ListView extends Component {
    constructor(props) {
        super(props);

        // checkupDate will hold a string of the selected date in format 'yyyy-mm-dd'
            // where mm is the month (NOT month - 1)
        // checkupType will hold the id of the selected checkup type
        this.state = {
            checkupDate: '',
            checkupType: '',
            clinics: '',
            clinicHeaders: ['name', 'country', 'city', 'address', 'averageRating'],
            checkupTypes: ''
        };
    }

    loadClinics = (ending) => {
        fetch('http://localhost:8080/api/clinics/' + ending)
            .then(result => result.json())
            .then(clinics => this.setState( {clinics: clinics}) )
            .then(() => {console.log('fetched clinics/' + ending)});
    };

    loadCheckupTypes = () => {
        fetch('http://localhost:8080/api/checkupTypes/all')
            .then(result => result.json())
            .then(checkupTypes => this.setState( {checkupTypes: checkupTypes}) )
            .then(() => {console.log('fetched checkupTypes')});
    };

    componentDidMount() {
        console.log('listView mounted');
        this.loadClinics('all');
        this.loadCheckupTypes();
    }

    onDateChange = (e) => {
        this.setState({checkupDate: e.target.value});
        console.log(e.target.value);
    };

    onCheckupTypeChange = (e) => {
        this.setState( {checkupType: e.target.value});
        console.log(e.target.value);

        if (e.target.value === 'default')
            this.loadClinics('all');
        else
            this.loadClinics('allWithType/' + e.target.value);
    };

    render() {
        return (
            <div>
                <div>
                    <DatePicker onChange={this.onDateChange}/>
                    <Select
                        options={this.state.checkupTypes}
                        onChange={this.onCheckupTypeChange}
                    />
                    <ListViewTable rows={this.state.clinics} headers={this.state.clinicHeaders}/>
                </div>
            </div>
        );
    }
}

export default ListView;