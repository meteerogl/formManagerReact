import React, { Component } from "react";
import { Link } from 'react-router-dom';
class FormDetail extends Component {

    state = {
        form:{}
    }
    
    componentDidMount() {
        if(this.props.location.state){
            this.setState({
                form:this.props.location.state
            })
            
        }
    }
    inputChangeHandler = (event) => {
        console.log(event.target.value);
        console.log(event.target.name)
    }

    render() {
        let form = this.state.form;
        return (
            <React.Fragment>
                <div className='card-header text-center p-0 mt-3 mb-5'>
                    <Link
                        to={{ pathname: '/forms'}}
                        key="WORLD">
                        FORMS
                    </Link>
                    <svg className="bi bi-arrow-right-short mb-1" width="2em" height="2em" viewBox="0 0 16 16"
                         fill="currentColor" >
                        <path d="M8.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.793 8 8.146 5.354a.5.5 0 010-.708z"/>
                        <path d="M4 8a.5.5 0 01.5-.5H11a.5.5 0 010 1H4.5A.5.5 0 014 8z"/>
                    </svg>
                    <Link style={{pointerEvents: "none",color:"gray"}}
                        to={{ pathname: '/forms'+form.id}}
                        key={form.id}>
                        {form.name}
                    </Link>
                </div>
                <form className="mt-2">
                    <div className="form-group row">
                        <label htmlFor="formName" className="col-sm-2 col-form-label">Form Name</label>
                        <div className="col-sm-10">
                            <input 
                            name="formName" 
                            className="form-control" 
                            type="text" 
                            value={(form.name)?(form.name):"undefined"}
                            onChange={(event)=>{this.inputChangeHandler(event)}} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="formName" className="col-sm-2 col-form-label">Form Description</label>
                        <div className="col-sm-10">
                            <textarea 
                            name="formDescription"
                            className="form-control" 
                            aria-label="With textarea" 
                            value={(form.description)?(form.description):"undefined"}
                            onChange={(event)=>{this.inputChangeHandler(event)}}></textarea>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="createdAt" className="col-sm-2 col-form-label">Created At</label>
                        <div className="col-sm-10">
                            <input 
                            readOnly 
                            name="createdAt" 
                            className="form-control" 
                            type="text" 
                            value={(form.createdAt)?(form.createdAt):"undefined"}
                            placeholder="Default input" 
                            onChange={(event)=>{this.inputChangeHandler(event)}}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input 
                            name="name" 
                            className="form-control" 
                            type="text" 
                            value={(form.fields)?(form.fields[0].name):"undefined"}
                            placeholder="Default input" 
                            onChange={(event)=>{this.inputChangeHandler(event)}}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="surname" className="col-sm-2 col-form-label">Surname</label>
                        <div className="col-sm-10">
                            <input 
                            name="surname" 
                            className="form-control" 
                            type="text" 
                            value={(form.fields)?(form.fields[1].name):"undefined"}
                            placeholder="Default input" 
                            onChange={(event)=>{this.inputChangeHandler(event)}}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="age" className="col-sm-2 col-form-label">Age</label>
                        <div className="col-sm-10">
                            <input 
                            name="age" 
                            className="form-control" 
                            type="number" 
                            value={(form.fields)?(2):"undefined"}
                            placeholder="Default input" 
                            onChange={(event)=>{this.inputChangeHandler(event)}}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-10">
                            <button disabled className="btn btn-primary">Save</button>
                        </div>
                    </div>
                    

                </form>
            </React.Fragment>
        )
    }

}


export default FormDetail;