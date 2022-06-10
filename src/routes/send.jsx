import {Component} from "preact";
import {getEvent} from "../actions/storage/getEvent";
import {Button} from "../components/Button";
import Swal from "sweetalert2";
import {ReadFromSheet} from "../actions/sheets/read";
import {sendTicket} from "../actions/sendTicket";
import {SendForm} from "../forms/SendForm";
import { styled } from "../theme";

const StyledSend = styled("div", {
    display:"flex",
    flexDirection: "column",
    height: "40vh",
    alignItems: "center"
})
const FormDiv = styled("div", {
    borderTop: "1px solid white",
    paddingTop: "25px"
})
export class Send extends Component {
    constructor() {
        super();
        this.state = {email: "", name: "", surname:""}
        getEvent(true).then(event => {
            if (Object.keys(event).length > 0) {
                this.setState(prev => ({...prev, event}))
            }
        })
    }

    async submitData(d) {
        await sendTicket(d, {
            email: d.email,
            name: d.name
        })
    }

    onInput = e => {
        const { value } = e.target;
        this.setState(prev => ({...prev, ...{email: value}}))
    }

    async sheetsImport() {
        const { value: file } = await Swal.fire({
            title: 'Select sheet file',
            input: 'file',
            inputAttributes: {
                'aria-label': 'Upload sheets file'
            }
        })

        if (file) {
            let buf = await file.arrayBuffer();
            let tickets = await ReadFromSheet(buf)
            tickets.forEach(t => {
                sendTicket(t, {
                    email: t.email,
                    name: t.email
                })
            })
        }
    }


    render(props, state, context) {
        return (
            <StyledSend>
                {state.event == undefined ? (<>There's no selected event</>) : (<>
                    <Button color="shade" onClick={async (e) => {await this.sheetsImport()}} text="Import from xls"/>
                    <FormDiv>
                        <SendForm onSubmit={this.submitData}/>
                    </FormDiv>
                </>)}
            </StyledSend>
        );
    }
}