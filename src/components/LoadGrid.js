import React, { Component } from 'react';

export default class LoadGrid extends Component {
	constructor() {
		super();
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleChange = this._handleChange.bind(this);

		this.state = {
			textArea: ''
		}
	}

	render() {
		return (
			<div className="container" >
				<div className="row row-spacing justify-content-center">
					<div className="col col-sm-10 col-md-8 col-lg-6">
						<form onSubmit={this._handleSubmit}>
							<div className="form-group">
								<label htmlFor="textArea" className='h4'>Enter letters for search grid.</label>
								<textarea name='textArea' className='form-control' cols="30" rows="10" value={this.state.textArea} onChange={this._handleChange}></textarea>
							</div>
							<input type="submit" className='btn btn-success btn-block btn-lg' />
						</form>
					</div>
				</div>
			</div>
		)
	}

	_handleChange(event) {
		this.setState({textArea: event.target.value});
	}

	_handleSubmit(event) {
		event.preventDefault();
		this.props.returnStrig(this.state.textArea);
	}
	
}