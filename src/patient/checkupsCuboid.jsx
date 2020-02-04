import React, {Component} from 'react';
import Select from "../generic_components/select";
import Axios from "axios";
import Table from "../generic_components/table";
import {sortBy} from "../utils/utils";

class CheckupsCuboid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chkTypeSelected: this.chkTypeDefaultId,
            chkTypeAll: [],

            checkupHeaders: [],
            checkupAll: [],

            sortedBy: {key: '', order: ''}
        }
    }

    chkTypeLabelText = 'Select the desired checkup type:';
    chkTypeDefaultId = '-1';
    chkTypeDefaultText = 'All';

    checkupEmptyListMsg = 'No checkups found that fit the selected criteria';

    componentDidMount() {
        this.loadCheckupTypes();
        this.loadCheckups('user');
    }

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
        this.setState({ chkTypeSelected: selectedChkType });
        // console.log('selected checkup type: ' + selectedChkType);
        if (selectedChkType === this.chkTypeDefaultId)
            this.loadCheckups('user');
        else
            this.loadCheckups('user/type:' + selectedChkType);
    };

    loadCheckups = (ending) => {
        Axios({
            method: 'get',
            url: 'http://localhost:8080/api/checkups/' + ending,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
        })
            .then(result => result.data)
            .then(checkups => {
                // console.log(checkups);
                let headers = [
                    { headId: 'clinicName', text: 'Clinic' },
                    { headId: 'doctorFullName', text: 'Doctor' },
                    { headId: 'startDate', text: 'Start Date' },
                    { headId: 'endDate', text: 'End Date' }
                ];
                if (ending === 'user')
                    headers = headers.concat({ headId: 'checkupTypeName', text: 'Checkup Type' });

                let formatted = checkups.map(checkup => {
                    let rl = {};
                    for (let header of headers) {
                        if (header.headId === 'startDate' || header.headId === 'endDate') {
                            rl[header.headId] = new Date(checkup[header.headId]).toLocaleString();
                        }
                        else
                            rl[header.headId] = checkup[header.headId]
                    }
                    rl['rowId'] = checkup.id;

                    return rl;
                });

                this.setState({ checkupHeaders: headers });
                this.setState({ checkupAll: formatted });
            } )
        // .then(() => {console.log('fetched checkups/' + ending)});
    };

    onHeaderClick = (e) => {
        let order = 'asc';
        const key = e.target.id;
        if (key === this.state.sortedBy.key)
            if (this.state.sortedBy.order === 'asc')
                order = 'desc';

        let sorted = sortBy(this.state.checkupAll, key, order);
        this.setState({ sortedBy: { key: key, order: order } });
        this.setState({ checkupAll: sorted });
    };

    render() {
        return (
            <div className='row'>
                <div className='col'>
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
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <Table
                                headers={this.state.checkupHeaders}
                                rows={this.state.checkupAll}
                                emptyListMsg={this.checkupEmptyListMsg}
                                onHeaderClick={this.onHeaderClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckupsCuboid;
