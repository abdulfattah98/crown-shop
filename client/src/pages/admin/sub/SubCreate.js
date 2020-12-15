import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/category';
import { createSub, removeSub, getSubs } from '../../../functions/sub';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Select, Card } from 'antd';

// import CategoryForm from '../../../components/forms/CategoryForm';
// import LocalSearch from '../../../components/forms/LocalSearch';
const { Option } = Select;
const { Meta } = Card;

const SubCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [subs, setSubs] = useState([]);
    // step 1
    // eslint-disable-next-line
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        loadCategories();
        loadSubs();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const loadSubs = () => getSubs().then((s) => setSubs(s.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        createSub({ name, parent: category }, user.token)
            .then((res) => {
                // console.log(res)
                setLoading(false);
                setName('');
                toast.success(`"${res.data.name}" is created`);
                loadSubs();
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
            removeSub(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`);
                    loadSubs();
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
        <div className="container-fluid dashboard flex-grow-1">
            <div className="row">
                <div className="d-none d-md-block col-3 pl-0">
                    <AdminNav />
                </div>
                <div className="col-12 col-md-9 px-3 pr-md-0">
                    {loading ? (
                        <h4 className="text-danger">Loading..</h4>
                    ) : (
                        <h4 className="dashboard__page-title">
                            Create sub category
                        </h4>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        style={{ marginBottom: '20px' }}
                    >
                        <div className="row align-items-center">
                            <div className="col-lg-4 col-md-6 col-12 pl-0 mb-3">
                                <div className="form-group">
                                    <label>Parent Category</label>

                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Select Category"
                                        onChange={(e) => setCategory(e)}
                                    >
                                        {categories.length > 0 &&
                                            categories.map((c) => (
                                                <Option
                                                    key={c._id}
                                                    value={c._id}
                                                >
                                                    {c.name}
                                                </Option>
                                            ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="col-lg-4  col-md-6 col-12 pl-0 mb-3">
                                <div className="form-group">
                                    <label>Sub Category Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        value={name}
                                        autoFocus
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 col-6 pl-0 mt-3 mt-md-0">
                                <button className="form-save-button add-category">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* step 2 and step 3 */}

                    {/* step 5 */}
                    <div className="row">
                        {subs.filter(searched(keyword)).map((s) => {
                            const name = s.name;

                            return (
                                <div className="col-lg-3 col-6 col-md-4 pl-0 mb-3">
                                    <Card
                                        actions={[
                                            <Link to={`/admin/sub/${s.slug}`}>
                                                <EditOutlined className="edit" />
                                            </Link>,
                                            <DeleteOutlined
                                                onClick={() =>
                                                    handleRemove(s.slug)
                                                }
                                                className="delete"
                                            />,
                                        ]}
                                    >
                                        <Meta
                                            title={`${
                                                name.length > 50
                                                    ? name.substring(0, 50) +
                                                      '...'
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

export default SubCreate;
