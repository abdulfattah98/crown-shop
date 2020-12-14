import React, { useState, useEffect, Suspense } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createOrUpdateUser } from '../../functions/auth';
import { SemipolarLoading } from 'react-loadingg';
const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const Email = window.localStorage.getItem('emailForRegistration');
    const Name = window.localStorage.getItem('nameForRegistration');
    const Password = window.localStorage.getItem('passwordForRegistration');

    // const { user } = useSelector((state) => ({ ...state }));
    let dispatch = useDispatch();

    const fetchUser = async () => {
        console.log('ddd');
        // console.log(window.location.href);
        // console.log(window.localStorage.getItem("emailForRegistration"));

        try {
            const result = await auth.signInWithEmailLink(
                email,
                window.location.href
            );
            console.log(result);
            //   console.log("RESULT", result);
            if (result.user.emailVerified) {
                // remove user email fom local storage
                window.localStorage.removeItem('emailForRegistration');
                window.localStorage.removeItem('nameForRegistration');
                window.localStorage.removeItem('passwordForRegistration');
                // get user id token
                let user = auth.currentUser;
                await user.updatePassword(password);
                //await user.updateName(password);
                const idTokenResult = await user.getIdTokenResult();
                // redux store
                // console.log("user", user, "idTokenResult", idTokenResult);

                createOrUpdateUser(idTokenResult.token, name)
                    .then((res) => {
                        dispatch({
                            type: 'LOGGED_IN_USER',
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                                wishlist: res.data.wishlist,
                                address: res.data.address,
                            },
                        });
                    })
                    .catch((err) => console.log(err));

                // redirect
                history.push('/');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        setEmail(Email);
        setName(Name);
        setPassword(Password);
    }, []);

    useEffect(() => {
        if (password.length) {
            fetchUser();
        }
    }, [password]);

    return (
        <Suspense
            fallback={
                <div className="d-flex align-items-center justify-content-center">
                    <SemipolarLoading color="#3866df" size="large" speed={2} />
                </div>
            }
        >
            {/* <button className="d-none" onLoad={fetchUser}>
                {' '}
                click
            </button> */}
        </Suspense>
    );
};

export default RegisterComplete;
