import { useState } from 'preact/hooks';
import QrReader  from 'react-qr-reader';
import {Verify} from "../actions/data/verification";
import { getEvent } from '../actions/storage/getEvent';
import {Button} from "../components/Button";
import { styled, theme } from '../theme';

function getDataP(data) {
    let result = []
}

const StyledP = styled("p", {
    width: "100%",
    textAlign: "center",
    fontFamily: theme.fonts.mont,
    fontWeight: "bold",
    fontSize: "25px",
    marginBottom: "4px"
})

export const Scanner = (props) => {
    let event = getEvent(true)
    const [data, setData] = useState({});
    const [legit, setLegit] = useState("Not legit");
    return (
        <>
            {Object.keys(data).length == 0 ? (<>
                <StyledP>Scanning...</StyledP>
                <QrReader
                style={{ width: '35vh' }}
                onScan={async (e) => {
                    if (e != null) {
                        e = JSON.parse(atob(e))
                        let valid = await Verify(e)
                        setLegit(valid ? "Legit" : "No legit")
                        setData(e);
                    }
                }}
                onError={(e) => {alert(e)}}
            /></>) : (<>

                <p>Validity of QR-CODE: {legit}</p>

                {Object.keys(data).filter(x => x != "youtube").map((x) => {
                    console.log(x)
                    return <p><strong>{x}</strong> : {data[x]}</p>
                })}

                <Button  color="shade" onClick={() => {setData({})}} text="Rescan"></Button>


            </>)}


        </>
    );
};