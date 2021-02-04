import styled from "styled-components";
import { DialogActions } from "@material-ui/core";

export const ButtonEnhance = styled.div`
  height: 40px;
  min-width: ${(props) => (props.minWidth ? props.minWidth : "160px")};
  border-radius: 20px;
  background-color: ${(props) =>
    props.background ? props.background : "#ad5e99"};
  transition: all 0.5s;
  cursor: ${(props) => (props.disabled ? "no-drop" : "pointer")};
  text-align: center;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "14px")};
  font-weight: 600;
  padding: 10px 16px;
  color: ${(props) => (props.color ? props.color : "white")}
  &:hover {
    background-color: ${(props) =>
      props.backgroundHover ? props.backgroundHover : "#94347c"}
  };
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  margin: 5px;
  border: ${(props) => (props.border ? props.border : "none")};
`;

export const ModalPage = styled.div`
  hr {
    background: #cacfd3;
    margin: 0;
  }
  .MuiDialogContent-root {
    padding: 0;
    &:first-child {
      padding-top: 0;
    }
  }
  .header {
    padding: 20px;
    font-size: 18px;
    font-weight: 600;
    color: #192637;
    border-bottom: 1px solid rgb(202, 207, 211);
  }
  .body {
    padding: 0 20px 20px 20px;
  }
`;

export const ModalFooter = styled(DialogActions)`
  border-top: 1px solid rgb(202, 207, 211);
  padding: 10px 0px;
`;

export const PaperWrapped = styled.div``;
