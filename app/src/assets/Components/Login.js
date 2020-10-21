import React from 'react';
import axios from 'axios';
import {SlideDown} from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          login: "",
          password: "",
        };
    }

    handleSubmitForm = async (event) => {   
        try {
            axios.post(`http://localhost:4242/login/${this.state.login}/${this.state.password}`, {formLogIn : this.state})
            .then((response) => {
                if(response.data=='echec'){
                    alert('Identifiant incorrect')
                    window.location.href = "/"
                }else{
                    localStorage.setItem('id_user', response.data.user.id);
                    localStorage.setItem('token', response.data.token);
                    window.location.href = "/home"
                }
            }, (error) => {
                console.log(error);
            });

        } catch (error) {                                                                                                         
            console.log(error)
        }

        event.preventDefault();
    }
     
    handleChange(event) {
        var value = event.target.value;
        var name = event.target.name;
        this.setState({
          [name]: value,
        });
    }
     
    render(){
        return(    
            // <SlideDown className={'my-dropdown-slidedown'}>
                <div className="log_in col-4">
                
                    <form className="col-12">
                        <label>LOGIN</label><input type='text' name='login' required='required'
                        value={this.state.login}
                        onChange={event => this.handleChange(event)}/><br/>

                        <label htmlFor='password'>MOT DE PASSE</label><input type='password' name='password' required='required' 
                        value={this.state.password}
                        onChange={event => this.handleChange(event)}/><br/>

                        <input type='submit' value="SE CONNECTER" onClick={this.handleSubmitForm}/>
                    </form>
            
                </div>
            // </SlideDown>    
        )
    
    }
}

export default Login