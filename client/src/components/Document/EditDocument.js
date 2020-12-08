import React, {Component} from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('/api/documents/' + this.props.match.params.id)
            .then(response => {
                // console.log(response.data);

                let form = document.getElementById('editForm');
                form.todoDescription.value = response.data.todoDescription;
                form.todoResponsible.value = response.data.todoResponsible;
                form.todoPriority.value = response.data.todoPriority;
                form.todoCompleted.checked = response.data.todoCompleted;
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todoDescription: e.target.todoDescription.value,
            todoResponsible: e.target.todoResponsible.value,
            todoPriority: e.target.todoPriority.value,
            todoCompleted: e.target.todoCompleted.checked
        };
        axios.put('/api/documents/' + this.props.match.params.id, obj)
            .then(/*res => console.log(res.data)*/);

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Update Todo</h3>
                <form id="editForm" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                name="todoDescription"
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input  type="text"
                                className="form-control"
                                name="todoResponsible"
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="todoPriority"
                                    id="priorityLow"
                                    value="Low"
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="todoPriority"
                                    id="priorityMedium"
                                    value="Medium"
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="todoPriority"
                                    id="priorityHigh"
                                    value="High"
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                        <div className="form-check">
                            <input  type="checkbox"
                                    className="form-check-input"
                                    id="todoCompleted"
                                    name="todoCompleted"
                                    />
                            <label className="form-check-label" htmlFor="completedCheckbox">
                                Completed
                            </label>
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="submit" value="Update Todo" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}