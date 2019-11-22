import React, { Component } from "react";

class ClinicAdminNav extends Component{
    constructor(props){
        super(props);
        console.log("props",this.props);
    }

    state = {toRender: false}

    handleClick = () => {
        this.setState({toRender:true});

        this.render();
        console.log("ispissss:",this.state.toRender,this.state.ime);
    }


    componentDidMount() {
        console.log(this.state.toRender);
    }

    render(){
        if(this.state.toRender)
        {
        return (<nav className="col-sm-12 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Doctors
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                            Halls
                        </a>
                    </li>
                </ul>
            </div>
        </nav>);
        }else {
        return <React.Fragment></React.Fragment>;
        }
    }
}

export default ClinicAdminNav;