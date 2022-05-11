import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ amount }) => {
  const amountInCents = amount * 100;
  const publishableKey =
    "pk_test_51KgBXxJkSf1EZaDlTc00kl5f9dTNFYUBYyGDifEjrZeuRumOTcwGzigq3JKIe0fSAtnZDuhuik63CiYODqlCAhAx00BKwmTn7z";

  const onCheckout = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: amountInCents,
        token,
      },
    })
      .then((response) => {
        alert("Payment successful");
      })
      .catch((error) => {
        console.log(error);
        console.log("Payment error: ", JSON.parse(error));
        alert(
          "There was an issue with your payment. Please sure you use the provided credit card"
        );
      });
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Paquita Boutique SRL'
      billingAddress
      shippingAddress
      description={`Your total is ${amount}`}
      amount={amountInCents}
      panelLabel='Pay Now'
      token={onCheckout}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
