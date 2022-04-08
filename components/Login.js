import React, {
  useState,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";
import classes from "./Login.module.css";
import Card from "./Card";

import Button from "./Button";
import AuthContext from "../store/Auth-Context";
import Input from "./Input";

const Login = (props) => {
  const emailinputref = useRef();
  const passwordinputref = useRef();

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const emailReducer = (state, action) => {
    if (action.type === "Emailinput") {
      return { value: action.val, isvalid: action.val.includes("@") };
    }
    if (action.type === "redline") {
      return { value: state.value, isvalid: state.value.includes("@") };
    }
    return { value: "", isvalid: false };
  };
  const passReducer = (state, action) => {
    if (action.type === "passinput") {
      return { value: action.value, isvalid: action.value.trim().length > 6 };
    }
    if (action.type === "passvalidation") {
      return { value: state.value, isvalid: state.value.trim().length > 6 };
    }
    return { value: "", isvalid: null };
  };

  const [EmailState, dispatchEmailState] = useReducer(emailReducer, {
    value: "",
    isvalid: null,
  });
  const [passState, passDispatch] = useReducer(passReducer, {
    value: "",
    isvalid: null,
  });
  const { isvalid: emailisvalid } = EmailState;
  const { isvalid: passisvalid } = passState;
  useEffect(() => {
    const Timeout = setTimeout(() => {
      setFormIsValid(emailisvalid && passisvalid);
      console.log("validation ran");
    }, 2000);
    return () => {
      clearTimeout(Timeout);
      console.log("cleared");
    };
  }, [emailisvalid, passisvalid]);
  const ctx = useContext(AuthContext);

  const emailChangeHandler = (event) => {
    dispatchEmailState({ type: "Emailinput", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    passDispatch({ type: "passinput", value: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmailState({
      type: "redline",
    });
  };

  const validatePasswordHandler = () => {
    passDispatch({ type: "passvalidation" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(EmailState.value, passState.isvalid);
    } else if (!emailisvalid) {
      emailinputref.current.focus();
    } else {
      passwordinputref.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailinputref}
          type={"email"}
          id={"email"}
          label={"E-Mail"}
          isvalid={emailisvalid}
          value={EmailState.value}
          ChangeHandler={emailChangeHandler}
          validateHandler={validateEmailHandler}
        />
        <Input
          ref={passwordinputref}
          type={"password"}
          id={"password"}
          label={"password"}
          isvalid={passisvalid}
          value={passState.value}
          ChangeHandler={passwordChangeHandler}
          validateHandler={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
