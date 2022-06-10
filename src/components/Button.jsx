import { styled, theme } from "../theme"

let buttonHeight = "50px";
let smallButtonHeight = "35px";
let phoneRatio = 1.15
const StyledButton = styled("button", {
    border: "none",
    margin: "5px",
    padding: "10px 15px",
    fontSize: "25px",
    height: buttonHeight,
    width: "225px",
    borderRadius: "15px",
    "@bp1": {
        padding: "5px 10px",
        fontSize: 25 / phoneRatio + "px",
        height: +buttonHeight.split("px")[0] / phoneRatio+"px",
        borderRadius: "5px",
        minWidth: "175px"

    },
    fontFamily: theme.fonts.mont,
    fontWeight: "bold",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all .2s ease",
    variants: {
        color: {
            violet: {
                backgroundColor: "#4900E4"
            },
            shade: {
                background: "linear-gradient(92.39deg, #4900E4 0%, #7523A7 100%)"
            },
            purple: {
                backgroundColor: "#7523A7"
            }
        },
        shape: {
            circle: {
                width: buttonHeight,
                "@bp1": {
                    width: +buttonHeight.split("px")[0] / phoneRatio+"px",
                    minWidth: "0px"
                },
                borderRadius: "50%"
            }
        },
        size: {
            small: {
                height: smallButtonHeight,
                fontSize: "20px",
                borderRadius: "10px"
            }
        },
        width: {
            large: {
                width: "100%"
            }
        }
    },
    "&:hover": {
        cursor: "pointer",
        transform: "translateY(-5px);"
    }
})


export function Button(props) {
    return (
        <>
            <StyledButton width={props.width} size={props.size} shape={props.shape} color={props.color} onClick={props.onClick}>{props.text || props.icon}</StyledButton>
        </>
    )
}