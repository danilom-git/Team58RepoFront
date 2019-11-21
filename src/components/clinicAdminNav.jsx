import React, { Component } from "react";

class ClinicAdminNav extends Component {
    state = {};
    render() {
        return (
            <nav class="col-sm-4 d-none d-md-block bg-light sidebar">
                <div class="sidebar-sticky">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                Profil klinike
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                Korisnicki profil
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                Izvestaj
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default ClinicAdminNav;