// import React, { useState, useRef } from 'react';
// import Card from 'react-credit-cards';

// import {
//     formatCreditCardNumber,
//     formatCVC,
//     formatExpirationDate,
//     formatFormData,
// } from './utils';

// export default class App extends React.Component {

//     const form = useRef();

//     const[number, setNumber] = useState('');
//     const[name, setName] = useState('');
//     const[expiry, setExpiry] = useState('');
//     const[cvc, setCvc] = useState('');
//     const[issuer, setIssuer] = useState('');
//     const[focused, setFocused] = useState('');
//     const[formData, setFormData] = useState('');

//     handleCallback = ({ issuer }, isValid) => {
//         if (isValid) {
//             // this.setState({ issuer });
//             setIssuer(issuer)
//         }
//     };

//     handleInputFocus = ({ target }) => {
//         // this.setState({
//         //     focused: target.name,
//         // });
//         setFocused(target.name)
//     };

//     handleInputChange = ({ target }) => {
//         if (target.name === 'number') {
//             target.value = formatCreditCardNumber(target.value);
//             setNumber(target.value)
//         } else if (target.name === 'expiry') {
//             target.value = formatExpirationDate(target.value);
//              setExpiry(target.value)
//         } else if (target.name === 'cvc') {
//             target.value = formatCVC(target.value);
//              setCvc(target.value)
//         } else if (target.name === 'name') {

//              setName(target.value)
//         }

//         // this.setState({ [target.name]: target.value });

//     };

//     handleSubmit = (e) => {
//         e.preventDefault();
//         // const { issuer } = this.state;
//         const formData = [...e.target.elements]
//         .filter((d) => d.name)
//         .reduce((acc, d) => {
//             acc[d.name] = d.value;
//             return acc;
//         }, {});

//         // this.setState({ formData });
//         setFormData(formData)
//         form.reset();
//     };

//     render() {
//         // const {
//         //     name,
//         //     number,
//         //     expiry,
//         //     cvc,
//         //     focused,
//         //     issuer,
//         //     formData,
//         // } = this.state;

//         return (
//             <div key="Payment">
//                 <div className="App-payment">
//                     <h1>React Credit Cards</h1>
//                     <h4>Beautiful credit cards for your payment forms</h4>
//                     <Card
//                         number={number}
//                         name={name}
//                         expiry={expiry}
//                         cvc={cvc}
//                         focused={focused}
//                         callback={handleCallback}
//                     />
//                     <form
//                         ref={form}
//                         onSubmit={handleSubmit}
//                     >
//                         <div className="form-group">
//                             <input
//                                 type="tel"
//                                 name="number"
//                                 className="form-control"
//                                 placeholder="Card Number"
//                                 pattern="[\d| ]{16,22}"
//                                 required
//                                 onChange={handleInputChange}
//                                 onFocus={handleInputFocus}
//                             />
//                         </div>
//                         <div className="form-group">
//                             <input
//                                 type="text"
//                                 name="name"
//                                 className="form-control"
//                                 placeholder="Name"
//                                 required
//                                 onChange={handleInputChange}
//                                 onFocus={handleInputFocus}
//                             />
//                         </div>
//                         <div className="row">
//                             <div className="col-6">
//                                 <input
//                                     type="tel"
//                                     name="expiry"
//                                     className="form-control"
//                                     placeholder="Valid Thru"
//                                     pattern="\d\d/\d\d"
//                                     required
//                                     onChange={handleInputChange}
//                                     onFocus={handleInputFocus}
//                                 />
//                             </div>
//                             <div className="col-6">
//                                 <input
//                                     type="tel"
//                                     name="cvc"
//                                     className="form-control"
//                                     placeholder="CVC"
//                                     pattern="\d{3,4}"
//                                     required
//                                     onChange={handleInputChange}
//                                     onFocus={handleInputFocus}
//                                 />
//                             </div>
//                         </div>
//                         <input type="hidden" name="issuer" value={issuer} />
//                         <div className="form-actions">
//                             <button className="btn btn-primary btn-block">
//                                 PAY
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         );
//     }
// }
