import { useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push(`/payment`);
  };
  return (
    <FormContainer>
      <h3>Shipping</h3>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type={"text"}
            placeholder={"Enter address"}
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Form.Label>City</Form.Label>
          <Form.Control
            type={"text"}
            placeholder={"Enter city"}
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type={"text"}
            placeholder={"Enter postal code"}
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type={"text"}
            placeholder={"Enter country"}
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </FormGroup>
        <Button type={"submit"} variant={"primary"}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
