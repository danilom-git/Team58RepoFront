import React, {Component} from 'react';
import Sidebar from "../generic_components/sidebar";
import Select from "../generic_components/select";
import DatePicker from "../generic_components/datepicker";

class PageTemplate extends Component {
    render() {
        /*
        <Table
            headers={headers}
            emptyListMsg={'Damn good coffee.'}
            rows={rows}
        />
        let headers = [
            {headId: 'col1', text: 'Column One'},
            {headId: 'col2', text: 'Column Two'},
            {headId: 'col3', text: 'Column Three'}
        ];
        let rows = [
            {rowId: 1, rowItems: [
                    {headId: 'col1', text: 'yeet'},
                    {headId: 'col2', text: 'yeet'},
                    {headId: 'col3', text: 'yeet'}
                ]},
            {rowId: 2, rowItems: [
                    {headId: 'col1', text: 'yeet'},
                    {headId: 'col2', text: 'yeet'},
                    {headId: 'col3', text: 'yeet'}
                ]},
            {rowId: 3, rowItems: [
                    {headId: 'col1', text: 'yeet'},
                    {headId: 'col2', text: 'yeet'},
                    {headId: 'col3', text: 'yeet'}
                ]}
        ];
         */
        /*
        <Select
            options={options}
        />
        let options = [
            {id: 1, text: 'Item 1'},
            {id: 2, text: 'Item 2'},
            {id: 3, text: 'Item 3'}
        ];
        */
        return (
            <div className='container-fluid h-100 pt-2' style={{height: 2000}}>
                <div className='row h-100'>
                    <Sidebar
                        links={[{id: 1, text: 'Link One'}, {id: 2, text: 'Link Two'}, {id: 3, text: 'Link Three'}]}/>

                    <div className='col'>
                        <DatePicker />
                    </div>
                </div>
            </div>
        );
    }
}

export default PageTemplate;