import React, { Component } from 'react';

import Dropzone from 'react-dropzone';

export default class LoadGrid extends Component {
	constructor() {
		super();
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleChange = this._handleChange.bind(this);
		this._handleDrop = this._handleDrop.bind(this);
		this._clearTextArea = this._clearTextArea.bind(this);

		this.state = {
			textArea: '',
			image: '',
			errMsg: '',
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
		const errMsg = (<div className = "alert alert-danger" role="alert" style={{marginTop: 20}}>
						  {this.state.errMsg}
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
							<div className="row">
								<div className="col">
									<input type="submit" className='btn btn-success btn-block btn-lg' />
								</div>
								<div className="col">
									<button className='btn btn-warning btn-block btn-lg' onClick={this._clearTextArea}>
										Clear
									</button>
								</div>
							</div>
							
						</form>
						{this.state.errMsg !== '' ? errMsg : null}
					</div>
				</div>
			</div>
		)
	}

	_handleChange(event) {
		this.setState({textArea: event.target.value});
	}

	_clearTextArea() {
		this.setState({	textArea: '',
						image: '',
						errMsg: '',});
	}

	_handleSubmit(event) {
		event.preventDefault();
		let rowsGood = true;
		let problemRows = [];
		let rows = this.state.textArea.match(/([A-Z]+)/g) || [];
		rows.forEach((row, i) => {
			if (row.length !== rows[0].length) {
				rowsGood = false;
				problemRows.push(i+1);
			}
		});

		if (rowsGood) {
			this.props.returnStrig(this.state.textArea);
		} else {
			this.setState({errMsg: `Rows not the same length: ${problemRows}`});
		}
	}

	_handleDrop(file){
		const Tesseract = window.Tesseract;
		this.setState({textArea: 'Runing OCR. Please wait...'});
		Tesseract.recognize(file[0].preview)
			.then((result) => {
				let gridString = result.text.replace(/ +?/g, '');
				gridString = gridString.replace(/0+/g, 'O');
				gridString = gridString.replace(/\|+/g, 'I');
				this.setState({	textArea: gridString,
			   					image: file[0].preview});
			});
	}	
}