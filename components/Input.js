import classes from "./Login.module.css";
import { useRef, useImperativeHandle } from "react";
import React from "react";

const Input = React.forwardRef((props, ref) => {
  const inputref = useRef();
  const Activate = () => {
    inputref.current.focus();
  };
  useImperativeHandle(ref, () => {
    return { focus: Activate };
  });

  return (
    <div
      className={`${classes.control} ${
        props.Isvalid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.label}>{props.label}</label>
      <input
        ref={inputref}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.ChangeHandler}
        onBlur={props.ValidateHandler}
      />
    </div>
  );
});
export default Input;
