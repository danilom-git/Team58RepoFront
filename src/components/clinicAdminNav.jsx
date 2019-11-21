import React, { Component } from "react";

class ClinicAdminNav extends Component {
    state = {doctors: []};
    render() {
        return (
            <nav class="col-sm-12 d-none d-md-block bg-light sidebar">
                <div class="sidebar-sticky">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                Clinic profile
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                User profile
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                Clinic Report
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default ClinicAdminNav;