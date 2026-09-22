import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" && 
    css`
        font-size: 2rem;
        color: #b2cf10;
    `}
    ${(props) =>
    props.as === "h2" &&
    css`
        font-size: 1.8rem;
        color: #5610cf;
    `}
    ${(props) =>
    props.as === "h3" &&
    css`
        font-size: 1.6rem;
        color: #10cfcc;
    `}
    ${(props) =>
    props.as === "h4" &&
    css`
        font-size: 1.4rem;
        color: #cf1039;
    `}
`;

export default Heading;