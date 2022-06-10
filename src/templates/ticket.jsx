import {generateSvg} from "../actions/image/generateQr";
import {Component, createRef} from "preact";
import "./ticket.css"

export class Ticket extends Component {
    ref = createRef()
    constructor(props) {
        super(props);
        console.log(props.data)
        this.state = {qr:  generateSvg(JSON.stringify(this.props.data))}
    }
    componentDidMount() {
        this.ref.current.innerHTML = this.state.qr;
    }

    render(props, state, context) {
        return (
            <div className="ticket">
                <div ref={this.ref}/>
                <p>{Object.keys(props.data).map(x => <p>{x[0].toUpperCase()+x.substring(1) + " "+ props.data[x]}</p>)}</p>
            </div>
        )
    }
}
