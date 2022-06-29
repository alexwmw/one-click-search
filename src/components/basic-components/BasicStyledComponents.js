import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  justify-content: ${(props) => props.justifyContent || "space-around"};
  align-items: ${(props) => props.alignItems || "center"};
  height: ${(props) => props.height || "100%"};
  width: ${(props) => props.width || "100%"};
`;

const FlexChild = styled.div`
  flex: ${(props) => props.flex || "1"};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
`;

const FlexTab = styled(FlexChild)`
  padding: 5px 0;
  text-align: center;
  font-weight: 300;
  border-bottom: solid 2px lightgrey;

  transition: all 300ms ease;

  cursor: pointer;
  user-select: none;

  &.selected {
    flex: 2;
    font-weight: 700;
    background-color: rgb(231, 231, 231);
  }
  &:hover:not(.selected) {
    font-weight: 700;
    background-color: rgb(250, 250, 250);
  }
`;

const InitStyles = styled.div`
  all: initial;
  * {
    all: initial;
  }
`;

export { FlexContainer, FlexChild, FlexTab, InitStyles };
