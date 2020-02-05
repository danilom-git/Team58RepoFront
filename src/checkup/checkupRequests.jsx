import React, { Component } from "react";
import Axios from "axios";

class CheckupRequests extends Component{

    state = {
        clinicId:"",
        requests: []
    };

    loadCheckus = () =>{
        Axios({
            method: 'get',
            url: 'http://localhost:8080/api/clinicAdmins/user',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then((res) => {
            this.setState({clinicId:res.data.clinicId});
            Axios({
                method: 'get',
                url: 'http://localhost:8080/api/checkupRequests/all/clinic:' + res.data.clinicId,
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
            }).then((res) => {
                for (let c of res.data)
                {
                    let st = new Date(c.startDate);
                    c.startDate = st.toLocaleDateString()+  " " + st.toLocaleTimeString();
                    st = new Date(c.endDate);
                    c.endDate = st.toLocaleDateString()+  " " + st.toLocaleTimeString();
                }
                //console.log(res.data);

            });
        });

    };

    componentDidMount() {
        this.loadCheckus();
    }

    render() {
        return (<>

        </>);
    }

}export default CheckupRequests;