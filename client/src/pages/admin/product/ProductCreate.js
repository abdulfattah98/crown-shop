import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../../../functions/product';
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../../../functions/category';
// import FileUpload from '../../../components/forms/FileUpload';
// import { LoadingOutlined } from '@ant-design/icons';

const initialState = {
    title: 'Macbook Pro',
    description: 'This is the best Apple product',
    price: '45000',
    categories: [],
    category: '',
    subs: [],
    shipping: 'Yes',
    quantity: '50',
    images: [
        // {
        //   public_id: "jwrzeubemmypod99e8lz",
        //   url:
        //     "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480909/jwrzeubemmypod99e8lz.jpg",
        // },
        // {
        //   public_id: "j7uerlvhog1eic0oyize",
        //   url:
        //     "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480912/j7uerlvhog1eic0oyize.jpg",
        // },
        // {
        //   public_id: "ho6wnp7sugyemnmtoogf",
        //   url:
        //     "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480913/ho6wnp7sugyemnmtoogf.jpg",
        // },
    ],
    colors: [
        'Black',
        'Brown',
        'Silver',
        'White',
        'Blue',
        'Red',
        'Gray',
        'Pink',
        'MidnightGreen',
        'Gold',
        'LightGreen',
        'Purple',
        'Graphite',
        'PacificBlue',
        'SpaceGrey',
        'CloudBlue',
        'CloudNavy',
        'CloudLavender',
        'Bronze',
        'AuraGlow',
        'PrismWhite',
        'PrismBlue',
        'MirrorPurple',
        'SilkyWhite',
        'StarryNight',
    ],
    brands: [
        'Apple',
        'Samsung',
        'Microsoft',
        'Lenovo',
        'Asus',
        'HP',
        'Dell',
        'Oppo',
    ],
    color: [],
    brand: 'Apple',
};

const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [showSub, setShowSub] = useState(false);

    // redux
    const { user } = useSelector((state) => ({ ...state }));

    // eslint-disable-next-line
    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) =>
            setValues({ ...values, categories: c.data })
        );

    const handleSubmit = (e) => {
        e.preventDefault();
        createProduct(values, user.token)
            .then((res) => {
                console.log(res);
                window.alert(`"${res.data.title}" is created`);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                // if (err.response.status === 400) toast.error(err.response.data);
                toast.error(err.response.data.err);
            });
    };

    const handleChange = (e, name) => {
        if (!e.target) {
            setValues({ ...values, [name]: e });
        } else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }
        // console.log(e.target.name, " ----- ", e.target.value);
    };

    const handleCatagoryChange = (e) => {
        // e.preventDefault();
        if (!e.target) {
            setValues({ ...values, subs: [], category: e });
            getCategorySubs(e).then((res) => {
                console.log('SUB OPTIONS ON CATGORY CLICK', res);
                setSubOptions(res.data);
            });
            setShowSub(true);
        }
        // } else {
        //       setValues({ ...values, subs: [], category: e.target.value });
        //       getCategorySubs(e.target.value).then((res) => {
        //           console.log('SUB OPTIONS ON CATGORY CLICK', res);
        //           setSubOptions(res.data);
        //       });
        //       setShowSub(true);
        // }
        // console.log('CLICKED CATEGORY', e.target.value);
    };

    return (
        <div className="container-fluid dashboard">
            <div className="row">
                <div className="d-none d-md-block col-3 pl-0">
                    <AdminNav />
                </div>

                <div className="col-12 col-md-9 px-3 pr-md-0">
                    <h4 className="dashboard__page-title">Product create</h4>

                    {/* {JSON.stringify(values.images)} */}

                    <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleCatagoryChange={handleCatagoryChange}
                        subOptions={subOptions}
                        showSub={showSub}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;
