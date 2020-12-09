import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SemipolarLoading } from 'react-loadingg';

const LoadingToRedirect = () => {
    const [count, setCount] = useState(2);
    let history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount);
        }, 1000);
        // redirect once count is equal to 0
        count === 0 && history.push('/');
        // cleanup
        return () => clearInterval(interval);
    }, [count, history]);

    return (
        <div
            style={{ height: '70vh' }}
            className="d-flex align-items-center jusityf-content-center"
        >
            <SemipolarLoading color="#3866df" size="large" speed={2} />
        </div>
    );
};

export default LoadingToRedirect;
