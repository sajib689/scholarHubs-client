import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";


const CheckoutForm = () => {
    const elements = useElements()
    const stripe = useStripe()
    const [err, setErr] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if(card === null) {
            return
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            setErr(error.message)
            console.log('[error]', error);
          } else {
            console.log('[PaymentMethod]', paymentMethod);
          }

    }
    return (
        <form onSubmit={handleSubmit} className="max-w-[300px] mt-48 mx-auto h-screen">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className="btn bg-blue-500 text-white w-[80px] mt-3" type="submit" disabled={!stripe}>
          Pay
        </button>
        <p className="text-red-200">{err}</p>
      </form>
    );
};

export default CheckoutForm;