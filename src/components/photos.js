import React, { Component } from "react";
import Dropzone from "react-dropzone";
import request from "superagent";

const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET
const CLOUDINARY_UPLOAD_URL = process.env.CLOUDINARY_UPLOAD_URL

export default class Photos extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uploadedFile: null,
            uploadedFileCloudinaryUrl: "",
        }        
    
        this.onImageDrop = this.onImageDrop.bind(this)
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });

        this.handleImageUpload(files[0])
    }

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file)
                            // field is superagents protocal (like header (fetch) or then (axios))
        upload.end((err, response) => {
            if (err) {
                console.log(err)
            }
            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                })
            }
        })
    }

    render() {
        return (
            <div className='photos'>
                <form>
                    <div>
                        <Dropzone onDrop={this.onImageDrop}
                        multiple={false}
                        accept="image/*">
                            {/* // Accepts all image types (not typical a good idea) */}
                        <div>Drop an image or click to upload a picture</div>
                        </Dropzone>
                    </div>
                        {this.state.uploadedFileCloudinaryUrl === '' ? null :
                        <div>
                            <p>{this.state.uploadedFile.name}</p>
                            <img src={this.state.uploadedFileCloudinaryUrl} />
                        </div>
                        }

                    <div>
                    
                    </div>
                    {console.log(process.env.CLOUDINARY_UPLOAD_URL)}
                </form>
            </div>
        );
    }
}
