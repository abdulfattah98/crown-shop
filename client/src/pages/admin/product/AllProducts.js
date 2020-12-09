import React, { useEffect, useState } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { getProductsByCount } from '../../../functions/product';
import AdminProductCard from '../../../components/cards/AdminProductCard';
import { removeProduct } from '../../../functions/product';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    // redux
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(100)
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    const handleRemove = (slug) => {
        // let answer = window.confirm("Delete?");
        // if (window.confirm('Delete?')) {
        //     // console.log("send delete request", slug);

        // }
        removeProduct(slug, user.token)
            .then((res) => {
                loadAllProducts();
                toast.error(`${res.data.title} is deleted`);
            })
            .catch((err) => {
                if (err.response.status === 400) toast.error(err.response.data);
                console.log(err);
            });
    };

    return (
        <div className="container-fluid dashboard">
            <div className="row">
                <div className="d-none d-md-block col-3 pl-0">
                    <AdminNav />
                </div>

                <div className="col-12 col-md-9 px-3 pr-md-0">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4 className="dashboard__page-title">All Products</h4>
                    )}
                    <div className="row">
                        {products &&
                            products.length &&
                            products.map((product) => (
                                <div
                                    key={product._id}
                                    className="col-6 col-md-4 col-lg-3 px-2 mb-3"
                                >
                                    <AdminProductCard
                                        product={product}
                                        handleRemove={handleRemove}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
