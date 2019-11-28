import React, { Component } from "react";

class DoctorNav extends Component {
    constructor(props){
        super(props);
    }

    state = {toRender: false};
    render() {
        return (
            <nav class="col-ms-12 d-none d-md-block bg-light sidebar">
                <div class="sidebar-sticky">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                User profile
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                Patients
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                Checkup start
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="#">
                                Checkup request
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="#">
                                Operation request
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="#">
                                Calendar
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="#">
                                Absence request
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="#">
                                Annual leave request
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default DoctorNav;