import axios from 'axios';

export const createOrUpdateUser = async (authtoken, name) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create-or-update-user`,
        {},
        {
            headers: {
                authtoken,
                name,
            },
        }
    );
};
export const createOrUpdateUserGoogle = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/create-or-update-userGoogle`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
};

export const currentUser = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/current-user`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
};

export const currentAdmin = async (authtoken) => {
    return await axios.post(
        `${process.env.REACT_APP_API}/current-admin`,
        {},
        {
            headers: {
                authtoken,
            },
        }
    );
};
