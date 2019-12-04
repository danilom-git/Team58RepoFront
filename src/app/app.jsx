import React, {Component,} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./navbar";
import PageTemplate from "./pageTemplate";

class App extends Component {
    render() {
        return (
            <>
                <Navbar title='Title' links={[{id: 1, text: 'Link'}, {id: 2, text: 'Other Link'}]}/>
                <PageTemplate/>
            </>
        );
    }
}

export default App;