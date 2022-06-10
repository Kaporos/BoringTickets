//This function return
import {getEvent} from "../storage/getEvent";
import {sign} from "./sign";

export async function SignWithEvent(data) {
    let event = await getEvent(false);
    let signature = sign(data, event.code)
    data.signature = signature
    return data
}