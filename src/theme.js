import { createStitches } from "@stitches/react";


export const {styled, css, theme} = createStitches({
    media: {
        bp1: "(max-width: 900px)",
        bp2: "(min-width: 900px)",
        bp3: "(max-width: 550px)",
    },
    theme: {
       fonts: {
           mont: "Mont"
       }
    }
  
})