import React, { Component } from 'react';
import Modal from '../../Modal/Modal';
import { Link } from 'react-router-dom';
//const slugify = require("slugify");

class FormList extends Component {
    state = {
        formList: [],
        searchWord: ""
    }

    static getDerivedStateFromProps(props, state) {
        if (props.formList !== state.formList) {
            return {
                formList: props.formList
            }
        }
        else {
            return null
        }
    }

    renderTableData = () => {
        if (this.state.formList) {
            return this.state.formList.map((form) => {
                const { id, name, description, createdAt } = form;
                return (
                    <tr key={id}>
                        <td><Link to={{pathname:"/forms/" + id,state:form}}>{name}</Link></td>
                        <td>{description}</td>
                        <td>{createdAt}</td>
                    </tr>
                )

            })
        }
        else {
            return (
                <div style={{ textAlign: "center" }}>
                    <h1>There is no data!</h1>
                </div>
            )
        }

    }

    renderTable = () => {
        if (this.state.formList) {
            return (
                <tr>
                    <th>Form Name</th>
                    <th>Description</th>
                    <th>Created At</th>
                </tr>
            )
        }
        else {
            return (
                <tr></tr>
            )
        }
    }


    render() {

        return (
            <React.Fragment>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span onChange={this.props.searchHandler} className="input-group-text">Search</span>
                    </div>
                    <input onChange={(event) => this.props.searchHandler(event.target.value)} type="text" className="form-control" aria-label="Search" />
                </div>
                <table className="table table-bordered table-striped">
                    <thead>
                        {this.renderTable()}
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }

}

export default FormList;

