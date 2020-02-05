import React, {Component} from "react";
import Axios from "axios";
import DatePicker from "../generic_components/datepicker";

class SearchHall extends Component {
    state = {
        checkupRequest: {},
        date: "",
        hallNumber: "",
        hallName: "",
        searchedHalls : []
    };

    componentDidMount() {
        Axios({
            method: 'get',
            url: 'http://localhost:8080/api/checkupRequests/checkupRequest:' + this.props.requestId,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then((res) => {
            this.setState({checkupRequest: res.data});
            //console.log(res.data);
        });
    }

    onChangeName = (e) => {
        this.setState({hallName:e.target.value});
    };

    onChangeNumber = (e) => {
        this.setState({hallNumber:e.target.value});
    };

    onChangeDate = (e) => {
        this.setState({date:new Date(e.target.value)});
    };

    handleSubmit = (e) => {
        if(this.state.hallName !== "" || this.state.hallNumber !== "")
        {
            if(this.state.date !== "")
            {
                let dateStr = this.state.date.getFullYear()+ "-" + this.state.date.getMonth() + "-" + this.state.date.getDate();
                //console.log(this.state.date.toDateString());
                Axios({
                    method: 'get',
                    url: 'http://localhost:8080/api/hall/name:'+this.state.hallName+"/number:"+this.state.hallNumber+"/date:",
                    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
                }).then((res)=>{
                    this.setState({searchedHalls:res.data});
                });
            }
        }
    };

    render() {
        return (<>
                <div className="row">
                    <div className="col">
                        <label >Hall name</label>
                        <input onChange={this.onChangeName} className="form-control" type="text"/>
                    </div>
                    <div className="col">
                        <label >Hall number</label>
                        <input onChange={this.onChangeNumber} className="form-control" type="text"/>
                    </div>
                    <div className="col">
                        <DatePicker onChange={this.onChangeDate} className="form-control" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <button onClick={this.handleSubmit} className="btn btn-primary">Search</button>
                    </div>
                </div>
        </>);
    }
}

export default SearchHall;