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
            checkupType: 'default',
            clinics: '',
            checkupTypes: '',
            sorted: {key: '', order: ''}
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

        if (this.state.checkupType === 'default')
            this.loadClinics('all');
        else if (e.target.value === '')
            this.loadClinics('checkupType:' + this.state.checkupType);
        else
            this.loadClinics('checkupType:' + this.state.checkupType + '/date:' + e.target.value)
    };

    onCheckupTypeChange = (e) => {
        this.setState( {checkupType: e.target.value});
        console.log(e.target.value);

        if (e.target.value === 'default')
            this.loadClinics('all');
        else if (this.state.checkupDate === '')
            this.loadClinics('checkupType:' + e.target.value);
        else
            this.loadClinics('checkupType:' + e.target.value + '/date:' + this.state.checkupDate)
    };

    compareBy = (key, order) => {
        let mul;
        if (order === 'asc')
            mul = 1;
        else
            mul = -1;

        return function (a, b) {
            if (a[key] < b[key]) return mul * -1;
            if (a[key] > b[key]) return mul * 1;
            return 0;
        };
    };

    sortBy = (key, order) => {
        let clinicsCopy = this.state.clinics;
        clinicsCopy.sort(this.compareBy(key, order));
        this.setState({data: clinicsCopy});
    };

    onHeaderClick = (e) => {
        let order = 'asc';
        const key = e.target.id;
        if (key === this.state.sorted.key)
            if (this.state.sorted.order === 'asc')
                order = 'desc';

        this.setState({sorted: {key: key, order: order}});

        this.sortBy(key, order);
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
                    <ListViewTable rows={this.state.clinics} onHeaderClick={this.onHeaderClick}/>
                </div>
            </div>
        );
    }
}

export default ListView;