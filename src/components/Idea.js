import React, { Component } from 'react';
import RetinaImage from 'react-retina-image';
import Popup from 'react-popup';
import { apiCall } from '../api';

class Idea extends Component {
	constructor(props) {
    super(props);
		this.edit = this.edit.bind(this);
		this.remove = this.remove.bind(this);
	}
	edit(){
		this.props.onEdit(this.props.data.id);
	}
	remove(){
		let url = `ideas/${this.props.data.id}`
		Popup.create({
			title: 'Are you sure?',
			content: 'This idea will be permanently deleted.',
			className: 'alert',
			buttons: {
				left: [{
					text: 'Cancel',
					action: () => {
						Popup.close()
					}
				}],
				right: [{
					text: 'Ok',
					className: 'danger',
					action: () => {
						apiCall(url, (err, res) => {
							if(!err){
								Popup.close();
								this.props.onRemove(this.props.data.id);
							}
						}, 'delete');
					}
				}],
			}
		})
	}
	render(){
		return (
			<tr>
				<td>{this.props.data.content}</td>
				<td>{this.props.data.impact}</td>
				<td>{this.props.data.ease}</td>
				<td>{this.props.data.confidence}</td>
				<td>{Math.round(this.props.data.average_score*100)/100}</td>
				<td className="table-controls">
					<RetinaImage src={process.env.PUBLIC_URL + '/images/pen.png'} alt="" onClick={this.edit}/>
					<RetinaImage src={process.env.PUBLIC_URL + '/images/bin.png'} alt="" onClick={this.remove}/>
				</td>
			</tr>
		)
	}
}

export default Idea;
