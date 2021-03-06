import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getProduct, updateProduct } from '../../../functions/product';
import { getCategories, getCategorySubs } from '../../../functions/category';
// import FileUpload from '../../../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm';

const initialState = {
    title: '',
    description: '',
    price: '',
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
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
    color: '',
    brand: '',
};

const ProductUpdate = ({ match, history }) => {
    // state
    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [subOptions, setSubOptions] = useState([]);
    const [arrayOfSubs, setArrayOfSubs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));
    // router
    const { slug } = match.params;

    useEffect(() => {
        const loadCategories = () =>
            getCategories().then((c) => {
                setCategories(c.data);
            });
        loadCategories();
        loadProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadProduct = () => {
        getProduct(slug).then((p) => {
            // console.log("single product", p);
            // 1 load single proudct
            setValues({ ...values, ...p.data });
            // 2 load single product category subs
            getCategorySubs(p.data.category._id).then((res) => {
                setSubOptions(res.data); // on first load, show default subs
            });
            // 3 prepare array of sub ids to show as default sub values in antd Select
            let arr = [];
            p.data.subs.map((s) => {
                arr.push(s._id);
                return 0;
            });
            setArrayOfSubs((prev) => arr); // required for ant design select to work
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        values.subs = arrayOfSubs;
        values.category = selectedCategory ? selectedCategory : values.category;

        updateProduct(slug, values, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`"${res.data.title}" is updated`);
                history.push('/admin/products');
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
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

    const handleCategoryChange = (e) => {
        if (!e.target) {
            setValues({ ...values, subs: [] });

            setSelectedCategory(e);

            getCategorySubs(e).then((res) => {
                setSubOptions(res.data);
            });

            // if user clicks back to the original category
            // show its sub categories in default
            if (values.category._id === e) {
                loadProduct();
            }
            // clear old sub category ids
            setArrayOfSubs([]);
        }
    };

    return (
        <div className="container-fluid dashboard">
            <div className="row">
                <div className="d-none d-md-block col-3 pl-0">
                    <AdminNav />
                </div>

                <div className="col-12 col-md-9 px-3 pr-md-0">
                    {loading ? (
                        <LoadingOutlined className="text-danger h1" />
                    ) : (
                        <h4 className="dashboard__page-title">
                            Product update
                        </h4>
                    )}

                    {/* {JSON.stringify(values)} */}

                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptions={subOptions}
                        arrayOfSubs={arrayOfSubs}
                        setArrayOfSubs={setArrayOfSubs}
                        selectedCategory={selectedCategory}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
