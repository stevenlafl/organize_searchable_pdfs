import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Document = props => (
    <tr>
        <td><Link to={"/view/" + props.document._id}>{props.document.sender}</Link></td>
        <td>{props.document.received}</td>
        <td>
            <Link to={"/edit/" + props.document._id}><button className="btn btn-primary">Edit</button></Link>
            <button onClick={() => props.onDelete(props.document._id)} className="btn btn-danger ml-1">Delete</button>
        </td>
    </tr>
)

export default class DocumentList extends Component {

    constructor(props) {
        super(props);
        this.state = {documents: []};
    }

    componentDidMount() {
        axios.get('/api/documents')
            .then(response => {
                this.setState({documents: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onDelete = (id) => {
        axios.delete('/api/documents/' + id)
            .then(res => {
                axios.get('/api/documents')
                .then(response => {
                    this.setState({documents: response.data});
                })
                .catch(function (error) {
                    console.log(error);
                })               
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    documentList(){
        return this.state.documents.map((currentDocument, i) => {
            return <Document document={currentDocument} onDelete={this.onDelete} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Search Results</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Sender</th>
                            <th>Received</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.documentList() }
                    </tbody>
                </table>
            </div>
        )
    }
}