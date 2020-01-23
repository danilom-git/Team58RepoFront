import React, {Component} from 'react';
import Axios from 'axios';


// getUlogovani = (token) => {
//     let AuthStr = 'Bearer '.concat(token);
//     let data = token
//
//     axios({
//         method: 'get' ,
//         url: 'http://localhost:8099/getUser' ,
//         headers: { "Authorization": AuthStr }
//     }).then((response) => {
//         if (response.data != null)
//         {
//             if(response.data.type === "PACIJENT"){
//                 this.redirect();
//             }
//
//         }
//
//     }, (error) => {
//         {
//             this.setState({message: "Neuspesno dobavljanje korisnika.", showResponse: true}) ;
//         }
//     });

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    sendLoginRequest = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:8080/auth/login', this.state)
            .then(result => this.props.onLogIn(result.data.userType, result.data.token))
    };

    render() {
        return (
            <div className='container-fluid pt-2'>
                <div className='row h-100 justify-content-center'>
                    <div className='col-xl-3 col-lg-4 col-md-5 col-sm-6 m-5'>
                        <h3 className='justify-content-center'>Log in</h3>
                        <form>
                            <div className='row'>
                                <div className='col'>
                                    <div className='form-group'>
                                        <label htmlFor='txtEmail'>Email:</label>
                                        <input type='email' className='form-control' id='txtEmail'
                                               onChange={(e) => this.setState( { username: e.target.value })}/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className='form-group'>
                                        <label htmlFor='txtPass'>Password:</label>
                                        <input type='password' className='form-control' id='txtPass'
                                               onChange={(e) => this.setState( { password: e.target.value })}/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <button className='btn btn-primary' onClick={this.sendLoginRequest}>
                                        Log In
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
