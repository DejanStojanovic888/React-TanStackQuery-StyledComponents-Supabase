import styled, { css } from "styled-components";


const StyledRow = styled.div`
  display: flex;
  ${({ type = "vertical" }) =>
    type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${({ type = "vertical" }) =>
    type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}  
`;

function Row({ children, type = "vertical" }) {
  return (
    <StyledRow type={type}>
      {children}
    </StyledRow>
  );
}

export default Row;


// Row.defaultProps = {
//   type: "vertical",
// };