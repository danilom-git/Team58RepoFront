import React, {Component} from 'react';
import Sidebar from "../generic_components/sidebar";

class PageTemplate extends Component {
    render() {
        return (
            <div className='container-fluid pt-2' style={{height: '2000px'}}>
                <div className='row h-100'>
                    <Sidebar
                        links={[{id: 1, text: 'Link One'}, {id: 2, text: 'Link Two'}, {id: 3, text: 'Link Three'}]}/>

                    <div className='col'>

                    </div>
                </div>
            </div>
        );
    }
}

export default PageTemplate;
