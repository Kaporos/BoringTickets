import {sign} from "./sign";
import {getEvent} from "../storage/getEvent";

export async function Verify(data) {
    let event = await getEvent(false)
    let signature = data.signature;
    delete data.signature
    let resign = sign(data, event.code)
    return resign == signature
}