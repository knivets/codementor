import React, { Component } from 'react';
import '../App.css';
import { guestApiCall } from '../api';
import { setTokens } from '../tokens';
import {
  Redirect,
	Link
} from 'react-router-dom'

class Login extends Component {
	constructor(props) {
    super(props);
		this.state = {
			email: '',
			password: '',
			authenticated: false,
			errors: ''
		}
		this.submit = this.submit.bind(this);
	}
	handleChangeFor = (propertyName) => (event) => {
		let state = {
      [propertyName]: event.target.value
    };
    this.setState(state);
  }
	submit(event) {
		event.preventDefault();
		this.setState({errors: ''});
		guestApiCall('access-tokens', (err, res) => {
			if(err){
				this.setState({errors: res.body.reason});
			}
			else {
				setTokens(res.body);
				this.props.onAuthenticate(() => this.setState({authenticated: true}))
			}
		}, 'post', {
			email: this.state.email,
			password: this.state.password
		});
	}
  render() {
		if (this.state.authenticated) {
			return <Redirect to="/"/>
		}
    return (
			<div className="form-container">
				<h1>Log In</h1>
				<form onSubmit={this.submit}>
					<div className="form-errors">
						{this.state.errors}
					</div>
					<div>
						<input type="email" placeholder="Email" name="email" onChange={this.handleChangeFor('email')} required/>
					</div>
					<div>
						<input type="password" placeholder="Password" name="password" onChange={this.handleChangeFor('password')} required/>
					</div>
					<div className="form-footer">
						<input type="submit" className="btn" value="Log In"/>
						<span>Don’t have an account? <Link to="/signup">Create an account</Link></span>
					</div>
				</form>
			</div>
    );
  }
}

export default Login;
