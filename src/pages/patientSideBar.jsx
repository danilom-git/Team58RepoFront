import React, {Component} from 'react';

class PatientSideBar extends Component {
    render() {
        return (
            <nav className='navbar border border-warning p-0 m-0 sidebar'>
                <div className='sidebar-sticky'>
                <ul className='navbar-nav flex-grow-1 m-0 p-0'>
                    <li className='nav-item m-0 p-0'>
                        <button className='btn btn-link border border-dark m-0 p-1'>Kek</button>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href='#'>Zvek</a>
                    </li>
                </ul>
                </div>
            </nav>
        );
    }
}

export default PatientSideBar;
