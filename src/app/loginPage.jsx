import React, {Component} from 'react';


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
                                        <input type='email' className='form-control' id='txtEmail'/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className='form-group'>
                                        <label htmlFor='txtPass'>Password:</label>
                                        <input type='password' className='form-control' id='txtPass'/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <button className='btn btn-primary'>
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
