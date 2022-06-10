import {Component} from "preact";
import "./SendForm.css"
import {Button} from "../components/Button";
import linkState from "linkstate";
import { styled, theme } from "../theme";
import {FaPen, FaSave} from "react-icons/fa"
import { useEffect, useState } from "preact/hooks";

const EditableLabel = (props) => {
    let [edit,setEdit] = useState(props.edit)
    let [value, setValue] = useState(props.children)
    return <MarginDiv>
        {edit ? <StyledInput value={value} onInput={(e) => {setValue(e.target.value.replace("_"," "))}} /> : <Label>{props.children}</Label> }
        {edit ? <StyledFaCheck onClick={() => {setEdit(false);props.onChange(value)}} /> : <StyledFaPen onClick={() => {setValue(props.children);setEdit(true)}} /> }
    </MarginDiv>
}

const Label = styled("label", {
    fontFamily: theme.fonts.mont,
    fontWeight: "bold",
    marginRight: "5px",
    display: "inline-block",
    "&:first-letter": {
        textTransform: "uppercase",
    }
})

const FaStyle = {
    margin: "0px 5px",
    transition: "all .2s",
    "&:hover": {
        transform: "translateY(-2px)",
        cursor: "pointer"
    },
}

const StyledFaPen = styled(FaPen, FaStyle)


const StyledFaCheck = styled(FaSave, FaStyle)


const MarginDiv = styled("div", {
    marginRight: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
})

const StyledInput = styled("input", {
    background: "transparent",
    color: "white",
    fontWeight: "bold",
    border: "1px solid white",
    padding: "10px",
    borderRadius: "5px"
})

const FormGroup = styled("div", {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "15px",
    "@bp3": {
        flexDirection: "column",
        alignItems: "flex-start"
    },
})

const StyledForm = styled("div", {
    "@bp2": {
        minWidth: "25vw",
    }
})


export class SendForm extends Component {
    constructor() {
        super();
        let customFields = localStorage.getItem("customFields")
        let state = {"custom": [],"email": "","name":"","surname":""}
        state.custom = customFields ? JSON.parse(customFields) : []
        this.state = state;
    }

    addCustom() {
        let state = this.state;
        state.custom.push({name:"", value:""})
        this.setState(state)
        this.saveCustomFields()
    }

    setState(state, callback) {
        this.saveCustomFields()
        super.setState(state, callback);
    }

    customWithEmptyValues() {
        return Object.assign({}, this.state).custom.filter(x => x.name.length > 0)
    }

    saveCustomFields() {
        let state = Object.assign({}, this.state);
        state.custom = this.customWithEmptyValues().map(x => ({name: x.name, value:""}))
        localStorage.setItem("customFields", JSON.stringify(state.custom))
    }

    submit() {
        let state = Object.assign({}, this.state);
        let data = Object.assign({}, ...this.customWithEmptyValues().map(x => ({[x.name]: x.value})))
        delete state.custom
        data = Object.assign(data, state)
        this.props.onSubmit(Object.assign({}, data))
    }

    render(props, state, context) {
        return (
            <StyledForm>
                <FormGroup>
                    <Label>Email</Label>
                    <StyledInput onInput={linkState(this, "email")} type="text" placeholder="Email"/>
                </FormGroup>
                <FormGroup>
                    <Label>Name</Label>
                    <StyledInput onInput={linkState(this, "name")} type="text" placeholder="Name"/>
                </FormGroup>
                <FormGroup>
                    <Label>Surname </Label>
                    <StyledInput onInput={linkState(this, "surname")} type="text" placeholder="Surname"/>
                </FormGroup>
                {this.state.custom.map(x => (
                    <FormGroup>
                        <EditableLabel edit={x.name.length > 0 ? false : true} onChange={(value) => {
                            this.setState((prev) => {
                                let u = Object.assign({}, prev)
                                if (value.length > 0) {
                                    u.custom[this.state.custom.indexOf(x)].name = value
                                } else {
                                    u.custom.splice(this.state.custom.indexOf(x), 1)
                                }
                                return u
                            })
                            this.saveCustomFields()
                        }} >{x.name}</EditableLabel>
                        <StyledInput  onInput={linkState(this, "custom."+this.state.custom.indexOf(x)+".value")} type="text" placeholder={x.name}/>
                    </FormGroup>
                ))}
                <div className="send__form__buttons" style="margin-top: 10px;">
                    <Button size="small" width="large" color="violet" onClick={() => this.addCustom()} text="+"/>
                    <br />
                    <Button color="shade" size="small" onClick={() => this.submit()} text="Send"/>
                </div>
            </StyledForm>
        )
    }
}