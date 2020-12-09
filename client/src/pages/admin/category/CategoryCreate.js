import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import {
    createCategory,
    getCategories,
    removeCategory,
} from '../../../functions/category';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryForm from '../../../components/forms/CategoryForm';
import LocalSearch from '../../../components/forms/LocalSearch';

import { Card } from 'antd';
const { Meta } = Card;

const CategoryCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    // step 1
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        createCategory({ name }, user.token)
            .then((res) => {
                // console.log(res)
                setLoading(false);
                setName('');
                toast.success(`${res.data.name} is created`);
                loadCategories();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    const handleRemove = async (slug) => {
        // let answer = window.confirm("Delete?");
        // console.log(answer, slug);
        if (window.confirm('Delete?')) {
            setLoading(true);
            removeCategory(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`);
                    loadCategories();
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false);
                        toast.error(err.response.data);
                    }
                });
        }
    };

    // step 4
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
                            Create category
                        </h4>
                    )}

                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                    />

                    {/* step 2 and step 3 */}

                    {/* step 5 */}
                    <div className="row">
                        {categories &&
                            categories.length &&
                            categories.filter(searched(keyword)).map((c) => {
                                const name = c.name;
                                return (
                                    <div className="col-6 col-lg-3 col-md-4 px-2 mb-3">
                                        <Card
                                            actions={[
                                                <Link
                                                    to={`/admin/category/${c.slug}`}
                                                >
                                                    <EditOutlined className="edit" />
                                                </Link>,
                                                <DeleteOutlined
                                                    onClick={() =>
                                                        handleRemove(c.slug)
                                                    }
                                                    className="delete"
                                                />,
                                            ]}
                                        >
                                            <Meta
                                                title={`${
                                                    name.length > 50
                                                        ? name.substring(
                                                              0,
                                                              50
                                                          ) + '...'
                                                        : name
                                                }`}
                                                className="text-center cat"
                                            />
                                        </Card>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCreate;
