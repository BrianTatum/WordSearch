import React, { Component } from 'react';

import Dropzone from 'react-dropzone';

export default class LoadGrid extends Component {
	constructor() {
		super();
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleChange = this._handleChange.bind(this);
		this._handleDrop = this._handleDrop.bind(this);

		this.state = {
			textArea: '',
			image: '',
		}
	}

	render() {
		const FileDropArea = (<div>	
								<label htmlFor="Dropzone" className='h4'>Drop imge file below for OCR</label>
								<Dropzone 	onDrop={this._handleDrop}
									accept="image/jpeg, image/png" />
							  </div> )
		const PreviewImage = (<div>
								<label className='h4'>Check OCR and then submit.</label>
								<img className='img-fluid' src={this.state.image} alt='Search grid preview' />
							 </div>)
		return (
			<div className="container" >
				<div className="row row-spacing justify-content-center">
					<div className="col">
						{this.state.image==='' ? FileDropArea : PreviewImage}
					</div>
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

	_handleDrop(file){
		const Tesseract = window.Tesseract;
		Tesseract.recognize(file[0].preview)
			.then((result) => {
				let gridString = result.text.replace(/ +?/g, '');
				gridString = gridString.replace(/0+/g, 'O');
				this.setState({	textArea: gridString,
			   					image: file[0].preview});
			});
	}	
}