import {Button} from "./components/Button";
import {route} from "preact-router";
import "@sweetalert2/theme-dark/dark.min.css"
import {Sync} from "./actions/sync/sync";
import { styled, theme } from "./theme";
import shareBtn from "./assets/svg/share.svg";
import { FaQrcode } from "react-icons/fa";
const Title = styled("h1", {
    fontFamily: theme.fonts.mont,
    fontSize: "4vw",
    "@bp1": {
        fontSize: "10vw"
    }
})

const SubTitle = styled("h2", {
    fontFamily: theme.fonts.mont,
    fontWeight: "normal",
    fontSize: "1.8vw",
    "@bp1": {
        fontSize: "3.5vw"
    }
})

const AppDiv = styled("div", {
    width: "1/3",
    textAlign: "center",
})

const BottomDiv = styled("div", {
    width: "fit-content",
    margin: "auto",
    marginTop: "50px"
})

const ButtonLine = styled("div", {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
})

export function App(){
        return (
            <AppDiv>
                <div>
                    <Title>Boring Tickets</Title>
                    <SubTitle>Why should sell and check tickets be a pain</SubTitle>
                </div>
                <BottomDiv>
                    <ButtonLine>
                        <Button shape="circle" color="violet" text="?" />
                        <Button color="shade" onClick={() => {route("/send")}} text="Send tickets"/>
                        <Button shape="circle" color="purple" onClick={async () => await Sync()} icon={<img src={shareBtn}/>}/>
                    </ButtonLine>
                    <ButtonLine>
                        <Button color="shade" onClick={() => {route("/scan")}} text="Scan QR"/>
                    </ButtonLine>
                </BottomDiv>

            </AppDiv>
        )
}
