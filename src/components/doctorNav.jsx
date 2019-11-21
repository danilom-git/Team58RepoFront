import React, { Component } from "react";

class DoctorNav extends Component {
    state = {};
    render() {
        return (
            <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                <div class="sidebar-sticky">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                Profil
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                Pacijenti
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">
                                Pocetak pregleda
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="#">
                                Zakazivanje pregleda
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="#">
                                Zakazivanje operacije
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="#">
                                Radni kalendar
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="#">
                                Zahtev za odsustvo
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link " href="#">
                                Zahtev za godisnji
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default DoctorNav;