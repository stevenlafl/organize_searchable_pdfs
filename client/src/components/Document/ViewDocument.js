import React, {Component} from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);
        this.state = {document: null};
    }

    componentDidMount() {
        axios.get('/api/documents/' + this.props.match.params.id)
            .then(response => {
                // console.log(response.data);
                this.setState({document: response.data});

                console.log(this.state.document.file);
            })
            .catch(function(error) {
                console.log(error)
            })
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
                { this.document() }
            </div>
        )
    }
}