import React, {Component} from 'react';

class PatientSideBar extends Component {
    render() {
        return (
            <nav className="col-sm-12 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                Profile
                            </a>
                        </li>
                        <li >
                            <a className="nav-link" href="#">
                                Medial Record
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={this.props.openBrowseClinics}>
                                Browse Clinics
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default PatientSideBar;
