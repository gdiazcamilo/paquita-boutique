import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ amount }) => {
  const amountInCents = amount * 100;
  const publishableKey =
    "pk_test_51KgBXxJkSf1EZaDlTc00kl5f9dTNFYUBYyGDifEjrZeuRumOTcwGzigq3JKIe0fSAtnZDuhuik63CiYODqlCAhAx00BKwmTn7z";

  const onCheckout = (token) => {
    console.log(token);
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
