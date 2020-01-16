import React, { Component } from "react";
import Axios from "axios";

class ShowHall extends Component{

    constructor(props) {
        super(props);
        this.state.hall = this.props.hall;
    }
    state = {
        hall :{}
    };

    componentDidMount() {
        Axios.get("http://localhost:8080/api/halls/" + this.state.hall.id).then(res => {
            this.setState({hall:res.data});
        });
    }

    handleChangeName = event => {
        this.setState({ hall: {...this.state.hall,name:event.target.value} });
    };

    handleChangeNumber = event => {
        this.setState({ hall: {...this.state.hall,number:event.target.value} });
    };

    handleSubmit = (e) => {
        //name,lastName moraju da odgovaraju dto
        e.preventDefault();
        if(this.state.hall) {
            const postHall = this.state.hall;
            console.log("pre posta", postHall);
            Axios.put("http://localhost:8080/api/halls", postHall,{
                headers: {
                    Authorization: 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJoZWFsdGh5LWFwcCIsInN1YiI6ImRvY3RvcjAxQHNvbWVtYWlsLmNvbSIsImF1ZCI6IndlYiIsImlhdCI6MTU3NjQyNDI2OSwiZXhwIjoxNTc5MDE2MjY5fQ.alvmCZRVm_FctN7kVoknRETlJAmKWCmqoU3jbUmr8MRi0DkbWjX6z-rKfxV7NnkPzPiyhHn4_NWqxVoMW3euXQ"
                }
            }).then(function (
                res
            ) {
                console.log("posle posta", res);
            });
        }
    };


    render() {
        return (
            <form>
                <div className="row">
                    <div className="col-sm-2">
                        <label>Name:</label>
                    </div>
                    <div col="col-sm-4">
                        <input type="text" className='form-control' value={this.state.hall.name} onChange={this.handleChangeName} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <label>Number:</label>
                    </div>
                    <div col="col-sm-4">
                        <input type="text" className='form-control' value={this.state.hall.number} onChange={this.handleChangeNumber} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-2">
                        <button className='btn btn-primary' onClick={(e) => this.handleSubmit(e)}>Change</button>
                    </div>
                </div>
            </form>
        );
    }
}
export default ShowHall;
