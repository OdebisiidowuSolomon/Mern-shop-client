import { css } from "styled-components";

export const mobile = (props, width='700px') => {
    return css`
    @media only screen and (max-width: ${width}) {
        ${props}
    }
  
    `
}