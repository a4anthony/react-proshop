import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Col, Form, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod, saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    history.push(`/shipping`);
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push(`/placeorder`);
  };
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h3>Payment Method</h3>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Form.Label as={"legend"}>Select Method</Form.Label>
          <Col>
            <Form.Check
              type={"radio"}
              label={"PayPal or Credit Card"}
              id={"PayPal"}
              name={"paymentMethod"}
              value={"PayPal"}
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            {/*<Form.Check*/}
            {/*  type={"radio"}*/}
            {/*  label={"Stripe"}*/}
            {/*  id={"Stripe"}*/}
            {/*  name={"paymentMethod"}*/}
            {/*  value={"Stripe"}*/}
            {/*  onChange={(e) => setPaymentMethod(e.target.value)}*/}
            {/*/>*/}
          </Col>
        </FormGroup>

        <Button type={"submit"} variant={"primary"}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
