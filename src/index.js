import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Formik, Form, useField, useFormikContext } from "formik";
import styled from "@emotion/styled";
import "./styles.css";
import "./styles-custom.css";
import * as Yup from "yup";


function TextInput({label,...props}){
	const [field,meta] = useField(props);
	const isPassword=props.name==="password"?true:false;
	return(
			<div>
				<label htmlFor = {props.name}>{label}</label>
				<input className="text-input" {...field} {...props} />
				{meta.touched && meta.error ? (<StyledErrorMessage>{meta.error}
					
				</StyledErrorMessage>):null}
				
			</div>

		);
}

class UserInfoAfterPost extends React.Component{
	constructor(props){
		super(props);
		this.handleSubmit=this.handleSubmit.bind(this);
	}
	handleSubmit(event){
		ReactDOM.render(<UserInfoPost />, document.getElementById("root"));

	}

	render(){
		return(
			<div>
			<h1>{"Analysis for the summoner "+this.props.summonerName +" #"+ this.props.serverType.toUpperCase()}
			</h1>
			<button type="submit" 
					onClick={this.handleSubmit}>
					Look for another summoner</button>
			</div>
				);
	}
}

class UserInfoPost extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
				<div>
					<h1>User Info</h1>
						<Formik
						initialValues={{
				          summonerName: "",
				        }}
						validationSchema={Yup.object({
				          summonerName: Yup.string()
				          	.min(1, "Must be larger than 1 character")
				            .required("Required"),
				          serverType: Yup.string()
				          	.ensure()
				            .required("Required"),
				        	})}
				    	onSubmit={
							async (values, { setSubmitting }) => {
				        	const requestOptions = {
						        method: 'POST',
						        headers: {'Accept': 'application/json',
						        		  'Content-Type': 'application/x-www-form-urlencoded'
						        		},
						        body: JSON.stringify({summonerName: values.summonerName,
						        					  serverType:values.serverType})
					    	};
							const response = await fetch('http://127.0.0.1:5000//submit-summoner-form', requestOptions);
			    			const data = await response.json();
			    			console.log(data);
				          	await new Promise(r => setTimeout(r, 500));
				          	setSubmitting(false);
				          	if (data.isRespRecvd){
								ReactDOM.render(<UserInfoAfterPost 
												summonerName={values.summonerName}
												serverType={values.serverType}/>,
												 document.getElementById("root"));
				          	}
				   	}
				    }>
							<Form>
								<TextInput
									label="Summoner Name"
									name="summonerName"
									type="text"
									placeholder="ANANATEQBUMMM"/>
								<SelectInput label="Server" name="serverType">
						            <option value="">Choose a server</option>
						            <option value="tr">TR</option>
						            <option value="eune">EUNE</option>
						            <option value="euw">EUW</option>
						            <option value="lan">LAN</option>
						            <option value="las">LAS</option>
									<option value="na">NA</option>
						            <option value="oce">OCE</option>
						            <option value="ru">RU</option>
						            <option value="br">BR</option>
						            <option value="jp">JP</option>
						            <option value="kr">KR</option>
						        </SelectInput>
						        <button type="submit" 
								// onClick={this.handleSubmit}
								>Let's Go</button>
							</Form>
						</Formik>

				</div>
			);

	}

}


const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "😂  ";
    font-size: 15px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;


function SelectInput({label,...props}){
	const [field,meta]=useField(props);

	return (
			<div>
				<StyledLabel htmlFor={props.name}>{label}</StyledLabel>
				<StyledSelect {...field} {...props}/>
				{meta.touched && meta.error ? (<StyledErrorMessage>{meta.error}
				</StyledErrorMessage>):null}
			</div>

		);
}

class LoginForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			"isLogggedIn":false,

		};
		this.handleLogin=this.handleLogin.bind(this);
	}
	handleLogin(event){
		alert('Login Succesful : ' + this.state.isLogggedIn);
		ReactDOM.render(<UserInfoPost />, document.getElementById("root"));

	}
	render(){

		return(
			<div>
			<h1>Login</h1>
			<Formik
			initialValues={{
	          username: "",
	          password: "",
	        }}
	        validationSchema={Yup.object({
	          username: Yup.string()
	          	.min(4)
	            .max(15, "Must be between 4 and 15 characters")
	            .required("Required"),
	          password: Yup.string()
	          	.min(8)
	            .max(20, "Must be between 8 and 20 characters")
	            .required("Required"),
	        	})}
	        onSubmit={async (values, { setSubmitting }) => {
	        	const requestOptions = {
			        method: 'POST',
			        headers: {'Accept': 'application/json',
			        		  'Content-Type': 'application/x-www-form-urlencoded'
			        		},
			        body: JSON.stringify({username: values.username,
			        					  password:values.password})
		    	};
				const response = await fetch('http://127.0.0.1:5000/login-check', requestOptions);
    			const data = await response.json();
    			console.log(data);
	          	await new Promise(r => setTimeout(r, 500));
	          	setSubmitting(false);
	          	if (data.isLoggedIn){
	          		this.setState({ isLogggedIn: true });
	          		this.handleLogin();
	          	}
        	}}
	        >
	        <Form>
				<TextInput 
					label="Username "
					name="username"
					type="text"
					placeholder="Your Username"/>
				
				<TextInput 
					label="Password "
					name="password"
					type="password"
					placeholder="Enter your password"/>

				<button type="submit" 
						// onClick={this.handleSubmit}
						>Login</button>
			</Form>
			</Formik>
			</div>
			);
		}

}


// class Collapsible extends React.Component {
// 	constructor(props) {
// 	    super(props);
//         this.state = {
//             open: false
//         }
// 	this.togglePanel = this.togglePanel.bind(this);
// 	}
// 	togglePanel(e) {
// 	    this.setState({ open: !this.state.open })
// 	}
// 	render() {
// 	        return (<div>
// 					<div onClick={(e)=>this.togglePanel(e)} className='header'>
// 					{this.props.title}</div> {this.state.open ? ( <div className = 'content' > { this.props.children } 
// 						  	<LoginForm />

// 					                	</div>
// 					                ) : null
//             } <
//             /div>);
//         }
// }

// function App() {
//   return ( 

//   	<Collapsible/>
//   	);
// }


function App() {
  return (
  	<LoginForm/>
  	);
}



ReactDOM.render(<App />, document.getElementById("root"));
