import React, { Component } from 'react';
import Header from './header'
import 'bootstrap/dist/css/bootstrap.min.css';
import ListView from "../listView/listView";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {page: <div></div>}
    }

    openClinics = () => {
        this.setState( {page: <ListView/>} );
    };

    render() {
        return (
            <div>
                <Header openClinics={this.openClinics}/>
                {this.state.page}
            </div>
        );
    }
}

export default App;