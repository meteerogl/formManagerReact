import React, { Component } from "react";

class Modal extends Component {

    state = {
        formInputModel:{},
        modalName:""
    }

    componentDidMount() {
        this.setState({
            formInputModel:this.props.formInputModel,
            modalName:this.props.modalName,
            validations:{
                "Form Name":true,
                "Form Description":true,
                "Ad":true,
                "Soyad":true,
                "Yaş":true
            }
        })
    }
    
    createForm = () => {
        if(this.state.formInputModel){
            /** Object to Array */
            let model = Object.keys(this.state.formInputModel).map((key) => this.state.formInputModel[key])
            return model.map((item)=>{
                if(item.length){
                    return item.map((item)=> {
                        return(
                            <div key={item.name} className="form-group row">
                                <label htmlFor="surname" className="col-sm-4 col-form-label">{item.name} </label>
                                <div className="col-sm-8">
                                    <input
                                    key={item.name} 
                                    name={item.name} 
                                    className={(this.state.validations[item.name]) ? "form-control is-invalid": "form-control"}
                                    type="text" 
                                    value={item.value}
                                    placeholder="" 
                                    onChange={(event)=>{this.inputChangeHandler(event,item)}}/>
                                </div>
                            </div>
                        )
                    })
                }
                else {
                    if(item.name !== "Created At"){
                        return (
                            <div key={item.name} className="form-group row">
                                <label htmlFor="surname" className="col-sm-4 col-form-label">{item.name} </label>
                                <div className="col-sm-8">
                                    <input
                                    key={item.name} 
                                    name={item.name} 
                                    className={(this.state.validations[item.name]) ? "form-control is-invalid": "form-control"}
                                    type="text" 
                                    value={item.value}
                                    placeholder="" 
                                    onChange={(event)=>{this.inputChangeHandler(event,item)}}/>
                                </div>
                            </div>
                        )
                    }
                  
                }
            })
        }
    }

    validationControl = (item,value,state) => { 
        if(item.dataType === "STRING"){
            if(item.value.length<=item.charLength){
                let copyvalidati = JSON.parse(JSON.stringify(this.state.validations))
                copyvalidati[item.name] = false;
                this.setState({
                    formInputModel:state,
                    validations:copyvalidati
                })
            }
            else {
                console.log("value must be small than 20")
            }
        }
        if(item.dataType === "NUMBER"){
            function isInt(value) {
                var x;
                return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
            }
            if(item.value.length<=item.charLength && isInt(item.value)){
                let copyvalidati = JSON.parse(JSON.stringify(this.state.validations))
                copyvalidati[item.name] = false;
                this.setState({
                    formInputModel:state,
                    validations:copyvalidati
                })
            }
            else {
                console.log("number must be small than 99 and must be integer")
            }
        }
    }

    inputChangeHandler = (event,item) => {
        let copyFromInput = JSON.parse(JSON.stringify(this.state.formInputModel))
        Object.keys(copyFromInput).map((key) => {
            if(!copyFromInput[key].length){
                if(copyFromInput[key].name===item.name){
                    copyFromInput[key].value = event.target.value
                    this.validationControl(copyFromInput[key],copyFromInput[key].value,copyFromInput)
                }
            }
            else{
                copyFromInput[key].map((i)=> {
                    if(i.name ===item.name){
                        i.value = event.target.value
                        this.validationControl(i,i.value,copyFromInput)
                    }
                })
            }
        })
    }

    

    render() {
        let modalStyleClass = (this.props.modalState===true)?"block":"none";
        return (
            <React.Fragment>
                <div style={{display:modalStyleClass,backgroundColor:'rgba(0, 0, 0, 0.2)'}} className="modal" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.state.modalName}</h5>
                            <button onClick={this.props.closeModalHandler} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        {this.createForm()}
                        </div>
                        <div className="modal-footer">
                            <button onClick={()=>{
                                this.props.saveForm(this.state.formInputModel,this.state.validations)
                            }} type="button" className="btn btn-primary">Save changes</button>
                            <button onClick={this.props.closeModalHandler} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}


export default Modal;