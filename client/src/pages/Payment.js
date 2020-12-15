import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from '../components/StripeCheckout';
import '../stripe.css';

// // load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = () => {
    return (
        <div className="text-center flex-grow-1 py-5">
            <h4
                style={{
                    fontSize: '20px',
                    marginBottom: '20px',
                    fontWeight: '600',
                }}
            >
                Complete your purchase
            </h4>
            <Elements stripe={promise}>
                <div className="col-md-8 offset-md-2">
                    <StripeCheckout />
                </div>
            </Elements>
        </div>
    );
};

export default Payment;

// import Cards from 'react-credit-cards';

// const Payment = () => {
// const [cvc, setCvc] = useState('');
// const [expiry, setExpiry] = useState('');
// const [focus, setFocus] = useState('');
// const [name, setName] = useState('');
// const [mumber, setNumber] = useState('');

// handleInputFocus = (e) => {
//     setFocus(e.target.name);
// };

// handleInputChange = (e) => {
//     const { name, value } = e.target;

//     this.setState({ [name]: value });
//     setName(value);
// };

// return (
//     <div id="PaymentForm">

/* <Cards
                    cvc={cvc}
                    expiry={expiry}
                    focused={focus}
                    name={name}
                    number={number}
                />
                <form>
                    <input
                        type="tel"
                        name="number"
                        placeholder="Card Number"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                    />
                    ...
                </form> */

//             <Card
//                 name="John Smith"
//                 number="5555 4444 3333 1111"
//                 expiry="10/20"
//                 cvc="737"
//             />
//         </div>
//     );
// };
