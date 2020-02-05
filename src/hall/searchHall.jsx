import React, {Component} from "react";
import Axios from "axios";
import DatePicker from "../generic_components/datepicker";

class SearchHall extends Component {
    state = {
        checkupRequest: {}
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

    render() {
        return (<>
            <form>
                <div className="row">
                    <div className="col">
                        <label >Hall name</label>
                        <input className="form-control" type="text"/>
                    </div>
                    <div className="col">
                        <label >Hall number</label>
                        <input className="form-control" type="text"/>
                    </div>
                    <div className="col">
                        <DatePicker className="form-control" />
                    </div>
                </div>
            </form>
        </>);
    }
}

export default SearchHall;