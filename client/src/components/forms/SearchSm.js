import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { SearchOutlined } from '@ant-design/icons';

// SVGs
// import { ReactComponent as SearchIcon } from './searchIcon.svg';

const Search = () => {
    const dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    const history = useHistory();

    const handleChange = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: e.target.value },
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push(`/shop?${text}`);
    };

    return (
        <form className="mb-0 d-block d-md-none" style={{ height: '5rem' }}>
            <div className="d-flex h-100 overflow-hidden">
                <input
                    type="text"
                    onChange={(e) => handleChange(e)}
                    className="Navbar__search-input Navbar__search--sm-input--sm w-100"
                    // style={{ borderRadius: '0' }}
                />
                {/* <SearchIcon className="Navbar__search-icon Navbar__search--sm-icon--sm" /> */}
                <button
                    onClick={handleSubmit}
                    className="Navbar__search-icon Navbar__search--sm-searchButton--sm h-100"
                >
                    SEARCH
                </button>
            </div>
        </form>
    );
};

export default Search;
