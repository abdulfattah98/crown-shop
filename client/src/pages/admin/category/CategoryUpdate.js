import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategory, updateCategory } from '../../../functions/category';
import CategoryForm from '../../../components/forms/CategoryForm';

const CategoryUpdate = ({ history, match }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategory();
    }, []);

    const loadCategory = () =>
        getCategory(match.params.slug).then((c) => {
            setName(c.data.category.name);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        updateCategory(match.params.slug, { name }, user.token)
            .then((res) => {
                // console.log(res)
                setLoading(false);
                setName('');
                toast.success(`"${res.data.name}" is updated`);
                history.push('/admin/category');
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
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
                        <h4 className="text-danger">Loading..</h4>
                    ) : (
                        <h4 className="dashboard__page-title">
                            Update category
                        </h4>
                    )}

                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoryUpdate;
