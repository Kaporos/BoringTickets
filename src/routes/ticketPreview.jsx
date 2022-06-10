import {Ticket} from "../templates/ticket";

export function TicketPreview() {
    let data = {
        name: "John Doe",
        email: "john@doe.com",
        VIP: false,
        row: "1ère rangée"
    }
    return (
        <div>
            <Ticket data={data}/>

        </div>
    )
}