import { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <FormContainer>
      <h3>Sign Up</h3>
      {message && <Message variant={"danger"}>{message}</Message>}
      {error && <Message variant={"danger"}>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId={"name"}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type={"text"}
            placeholder={"Enter name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>{" "}
        <Form.Group controlId={"email"}>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type={"email"}
            placeholder={"Enter email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId={"password"}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={"password"}
            placeholder={"Enter password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId={"confirmPasword"}>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type={"password"}
            placeholder={"Confirm password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button type={"submit"} variant={"primary"}>
          Register
        </Button>
      </Form>
      <Row className={"py-3"}>
        <Col>
          Already have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;