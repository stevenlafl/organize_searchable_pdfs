import React, {Component} from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${e.target.todoDescription.value}`);
        console.log(`Todo Responsible: ${e.target.todoResponsible.value}`);
        console.log(`Todo Priority: ${e.target.todoPriority.value}`);

        const newTodo = {
            todoDescription: e.target.todoResponsible.value,
            todoResponsible: e.target.todoResponsible.value,
            todoPriority: e.target.todoPriority.value,
            todoCompleted: false,
        }

        axios.post('/api/todos', newTodo)
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
                        <label>Description: </label>
                        <input  type="text"
                                name="todoDescription"
                                className="form-control"
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input  type="text"
                                name="todoResponsible"
                                className="form-control"
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
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}