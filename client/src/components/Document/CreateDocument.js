import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-date-picker';

export default class CreateDocument extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            selectedFile: null
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });

        console.log(date);
    }

    onFileChange(event) { 
        this.setState({
            selectedFile: event.target.files[0]
        }); 
    };

    // On file upload (click the upload button) 
    async onFileUpload() {
        // Create an object of formData 
        const formData = new FormData(); 
        
        // Update the formData object 
        formData.append( 
            "file", 
            this.state.selectedFile, 
            this.state.selectedFile.name 
        ); 
        
        // Details of the uploaded file 
        console.log(this.state.selectedFile); 
        
        // Request made to the backend api 
        // Send formData object
        let res = await axios.post("api/files", formData);

        return res.data;
    };


    async onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Letter Sender: ${e.target.sender.value}`);
        console.log(`Letter Received: ${e.target.received.value}`);

        // Get form values first. By the time upload finishes, the form object is gone.
        let newDocument = {
            'sender': e.target.sender.value,
            'received': e.target.received.value,
        }

        let file = await this.onFileUpload();

        newDocument.file = file.id;

        axios.post('/api/documents', newDocument)
            .then(res => {
                console.log(res.data);
                this.props.history.push('/');
            });
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Sender: </label>
                        <input  type="text"
                            name="sender"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Received: </label>
                        <br/>
                        <DatePicker
                            name="received"
                            value={ this.state.startDate }
                            onChange={ this.handleChange }
                        />
                    </div>
                    <div className="form-group">
                        <input type="file" name="file" onChange={this.onFileChange} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}