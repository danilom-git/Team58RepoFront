import React, {Component} from 'react';
import Sidebar from "./sidebar";

class PageTemplate extends Component {
    render() {
        return (
            <div>
                <div className='container-fluid h-100' style={{height: 2000}}>
                    <div className='row h-100'>
                        <Sidebar links={[{id: 1, text: 'Link One'}, {id: 2, text: 'Link Two'}, {id: 3, text: 'Link Three'} ]}/>
                        <div className='col'>
                            sample text
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageTemplate;