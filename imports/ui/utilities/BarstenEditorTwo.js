// REMEMBER: <meta charset="utf-8" /> to head in main html

// TODO: implement on-the-fly resizing of images based on size given under import.
// TODO: save after image upload.
// TODO: Clean up toolbar.

import React, { Component } from 'react';
import { EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// For auto save :)
import debounce from 'debounce';

class BarstenEditor extends Component {	

	constructor(props) {
		super(props);
		this.state = {
				editorState: EditorState.createEmpty(),
				saveEditorState: debounce(this.save.bind(this), 2000)

		};
	}

	componentDidMount() {
		
		if (this.props.content) {

			const rawFromDB = convertFromRaw(this.props.content.editorState);
			const newState = EditorState.createWithContent(rawFromDB);

			this.setState({
				editorState: newState
			});
		}

	}

	onChange (editorState) {

		this.setState({editorState});

		if (editorState.getCurrentContent() !== this.state.editorState.getCurrentContent()) {
			// content has changed
			this.state.saveEditorState(editorState);
		}
		if (editorState.getSelection() !== this.state.editorState.getSelection()) {
			// selection has changed

		}

	}

	save () {

		// Send editor state to parent onChange prop
		let rawState = convertToRaw(this.state.editorState.getCurrentContent());

		// Add ?size=XSIZExYSIZE to image source if size is defined
		Object.keys(rawState.entityMap).map(function(key, index) {
			let entity = rawState.entityMap[key];

			if (entity.type == "IMAGE") {
				if (entity.data.height != 'auto' && entity.data.width != 'auto') {
					// Remove "px" from string
					const width = entity.data.width.slice(0, -2);
					const height = entity.data.height.slice(0, -2);

					entity.data.src = `${entity.data.src}?size=${width}x${height}`;
				}
			}
		});

		this.props.onChange({
			editorState: rawState
    	});

	}

	uploadImageCallBack (file, e) {

		console.log(file);
		console.log(e);

		return new Promise(
			(resolve, reject) => {

				Meteor.call('file.generateUploadTicket', file.name, 'image', (err, res) => {
					if (err) {
						console.log(err);
					} else {

						var formData = new FormData();
						formData.append('acl', res.params.acl);
						formData.append('key', res.params.key);
						formData.append('policy', res.params.policy);
						formData.append('success_action_status', res.params.success_action_status);
						formData.append('x-amz-algorithm', res.params['x-amz-algorithm']);
						formData.append('x-amz-credential', res.params['x-amz-credential']);
						formData.append('x-amz-date', res.params['x-amz-date']);
						formData.append('x-amz-signature', res.params['x-amz-signature']);
						formData.append('file', file);
						
						$.ajax({
							url: res.endpoint_url,
							data: formData,
							processData: false,
							contentType: false,
							type: 'POST',
							success: (data) => {

								// const awsUrl = data.getElementsByTagName("Location")[0].innerHTML;
								const awsKey = data.getElementsByTagName("Key")[0].innerHTML;

								// Save file reference to db
								const newFile = {
									name: file.name,
									awsKey: awsKey,
									size: file.size,
									type: file.type
								}

								Meteor.call('file.add', newFile, 'image', (err, res) => {
									if (err) {
										console.log(err);
									} else {
										// const bucketUrl = 'http://' + Meteor.settings.public.aws.imageBucket + '.s3-website-' + Meteor.settings.public.aws.region + '.amazonaws.com/';
										// const size = this.props.maxImageSize ? (this.props.maxImageSize + '/') : '';
										// const awsUrl = bucketUrl + size + res.awsKey;

										// console.log(res);

										const link = `/images/${res}`;

										// Send response to Editor state?
										resolve({data: {link: link}});
									}
								});
							}
						});
						
					}
				});

			}
		);

	}

	blockStyles (contentBlock) {
	  const type = contentBlock.getType();
	  if (type === 'unstyled') {
	    return 'unstyled';
	  }
	}

	render() {

		// console.log('render');
		// console.log(convertToRaw(this.state.editorState.getCurrentContent()));

		return (
			<div>

				<div className="clearfix"></div>
				<br />
				<Editor
					ref="editor"
					placeholder="Write here ..."
					toolbarClassName="home-toolbar"
					wrapperClassName="home-wrapper"
					editorClassName="home-editor"
					editorState={this.state.editorState} 
					onEditorStateChange={(editorState) => {this.onChange(editorState)}} 
					spellCheck={true}
					toolbar={
						{ 
							image: { 
								uploadCallback: this.uploadImageCallBack.bind(this),
								uploadEnabled: true,
								alignmentEnabled: true,
								inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
							}
						}
					}
				/>

			</div>
		);
	}
}

export default BarstenEditor;