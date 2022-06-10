import { render } from 'preact'
import Router from "preact-router"
import { App } from './app'
import './index.css'
import {Scanner} from "./routes/scanner";
import {Send} from "./routes/send";
import {TicketPreview} from "./routes/ticketPreview";

const Main = () => (
    <Router>
        <App path="/"/>
        <Scanner path="/scan"/>
        <Send path="/send"/>
        <TicketPreview path="/preview"/>
    </Router>
)


render(<Main />, document.getElementById('app'))
