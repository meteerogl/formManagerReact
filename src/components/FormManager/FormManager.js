import React, {Component} from 'react';
import Modal from '../Modal/Modal';
import FormList from './FormList/FormList';

const slugify = require("slugify");

class FormManager extends Component {

    state = {
        form_list:[],
        modal_state:false
    }

    /** ------ Init Create Example Forms ------ */
    testFormObjectList = [
        {
            id:slugify("Test form"),
            "name": "Test form",
            "description": "Uye bilgi formu",
            createdAt: "2017-01-08",
            fields: [ 
                { "required": true, "name": "Ad", dataType: "STRING" }, 
                { "required": true, "name": "Soyad", dataType: "STRING" },
                { "required": false, "name": "Yaş", dataType: "NUMBER" } 
            ]
        },
        {
            id:slugify("Test form2"),
            "name": "Test form2",
            "description": "Uye bilgi formu",
            createdAt: "2017-01-08",
            fields: [ 
                { "required": true, "name": "Ad", dataType: "STRING" }, 
                { "required": true, "name": "Soyad", dataType: "STRING" },
                { "required": false, "name": "Yaş", dataType: "NUMBER" } 
            ]
        },
    ]

    initCreateForms = () => {

        console.log("CLEAR LOCAL STRAGE INDEX FORM MANAGER 42")
        //localStorage.clear()
        if(!localStorage.getItem("form_list")){
            localStorage.setItem("form_list",JSON.stringify(this.testFormObjectList));
        }
        let init_form_list = JSON.parse(localStorage.getItem("form_list"));
        this.setState({
            form_list:init_form_list
        })   
    }
    /** --------------------------------------- */

    formInputModel = { 
        "name": { "required":true, "name":"Form Name", dataType:"STRING",charLength:20,value:""}, 
        "description":{"required":true,name:"Form Description",dataType:"STRING",charLength:40,value:""},
        createdAt: {"required":true,name:"Created At", dataType:"STRING",value:""}, 
        fields: [ 
            { "required": true, "name": "Ad", dataType: "STRING",charLength:20,value:""}, 
            { "required": true, "name": "Soyad", dataType: "STRING",charLength:20,value:""},
            { "required": false, "name": "Yaş", dataType: "NUMBER",charLength:2,value:""} ] }

    addFormHandler = () => {
        this.setState({
            ...this.state,
            modal_state:true
        })
    }

    closeModalHandler = () => {
        this.setState({
            modal_state:false
        })
    }

    saveFormHandler = (form_inf,validations) => {
        let error_count = 0;
        Object.keys(validations).map((item)=>{
            console.log(validations[item])
            if(validations[item] === true){
                error_count +=1;
            }
        })
        if(error_count === 0 ){
            let lcs = JSON.parse(localStorage.getItem("form_list"))
            console.log(form_inf)
            let test = {
                id:slugify(form_inf.name.value),
                "name": form_inf.name.value,
                "description": form_inf.description.value,
                createdAt: "2017-01-11",
                fields: [ 
                    { "required": true, "name": form_inf.fields[0].value, dataType: "STRING" }, 
                    { "required": true, "name": form_inf.fields[1].value, dataType: "STRING" },
                    { "required": false, "name": form_inf.fields[2].value, dataType: "NUMBER" } 
                ]
            }
            lcs.push(test)
            localStorage.clear()
            localStorage.setItem("form_list",JSON.stringify(lcs));
            
            this.setState({
                form_list:JSON.parse(localStorage.getItem("form_list")),
                modal_state:false
            })
            
        }

    }

    searchHandler = (search_input) => {
        if(search_input.length){
            let filteredList = this.state.form_list.filter((item)=>{
                return item.name.includes(search_input)
            })
            this.setState({
                form_list:filteredList
            })
        }
        else {
            let init_form_list = JSON.parse(localStorage.getItem("form_list"));
            this.setState({
                form_list:init_form_list
            })  
            
        }

    }

    componentDidMount() {
        this.initCreateForms()
    }

    render() {
        return (
            <React.Fragment>
                <div className="mt-3">
                    <button onClick={this.addFormHandler} className="btn btn-success float-right mb-2">Add Form</button>
                    <FormList searchHandler={this.searchHandler} formList={this.state.form_list}></FormList>
                </div>
                <Modal 
                closeModalHandler={this.closeModalHandler} 
                modalState={this.state.modal_state}
                formInputModel={this.formInputModel}
                modalName={"Add Form"}
                saveForm={this.saveFormHandler}
                ></Modal>
            </React.Fragment>
        )
    }

}

export default FormManager;

