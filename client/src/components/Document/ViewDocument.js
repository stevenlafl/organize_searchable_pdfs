import React, {Component} from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);
        this.state = {document: null, pdf: null};
    }

    componentDidMount() {
        axios.get('/api/documents/' + this.props.match.params.id)
            .then(response => {
                // console.log(response.data);
                this.setState({document: response.data});

                axios.get('/api/files/' + response.data.file + '/data')
                .then(response => {
                    // console.log(response.data);
                    this.setState({pdf: response.data});
    
                    console.log(this.state.document.file);
                })
                .catch(function(error) {
                    console.log(error)
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    pdf() {
        if (this.state.document) {
            return (
                <div className="">
                    <iframe src={'data:application/pdf;base64,' + this.state.pdf} width="100%" height="1024"></iframe>
                </div>
            );
        }
        else {
            return null;
        }
    }

    document() {
        if (this.state.document) {
            return (
                <div className="">
                    <pre>{this.state.document.text}</pre>
                </div>
            );
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <div>
                <h3>View Document</h3>
                { this.pdf() }
            </div>
        )
    }
}