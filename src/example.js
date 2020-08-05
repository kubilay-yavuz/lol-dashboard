import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class EssayForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'Annen yanımda',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        alert('submission made : ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
        		<label>
        		Essay:

        		<textarea value={this.state.value} onClick={this.handleChange}/>
        		</label>
        		<input type="submit" value="Submit" />
        	</form>
        );
    }
}

class FlavourForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'niggas',

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    handleSubmit(event) {
        alert('Your favourite flavor is ' + this.state.value);
        event.preventDefault();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
				<label>
				fLAOUER:
				<select value={this.state.value} onChange={this.handleChange}>
					<option value="annen">annane</option>
					<option value="baban">baban</option>
					<option value="nenen">niggas</option>
					<option value="dedn">dden</option>
				</select>
				</label>
				<input type="submit" value="Submit"/>

			</form>

        );
    }
}

class Rezervation extends React.Component {
	constructor(props){
		super(props);
		this.state={
			isGoing:true,
			numberOfGuests : 2,

		};
		this.handleInputChange=this.handleInputChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);

	}
	handleInputChange(event){
		const target = event.target;
		const value = target.name==="isGoing" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]:value
		});
	}

	handleSubmit(event){
		alert("Getireceğin "+this.state.numberOfGuests+" kişiyi " + (this.state.isGoing ? "sikeyim":"sikmeyeyim") );
		event.preventDefault();
	}

	render(){
		return(
			<form onSubmit={this.handleSubmit}>
				<label> Going?:
				<input 
					name="isGoing"
					type="checkbox"
					checked={this.state.isGoing}
					onChange={this.handleInputChange} />

				</label>
				<br/>
				<label>
					Num of guests:
					<input
						name="numberOfGuests"
						type="number"
						value = {this.state.numberOfGuests}
						onChange={this.handleInputChange}/>
				</label>
				<br/>
				<input type="submit" value="Submit"/>
			</form>
			);
	}
}

let element = <Rezervation />
ReactDOM.render(
    element,
    document.getElementById('root')
);




