import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../functions/category';
import { updateSub, getSub } from '../../../functions/sub';
// import { Link } from 'react-router-dom';
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
// import CategoryForm from '../../../components/forms/CategoryForm';
// import LocalSearch from '../../../components/forms/LocalSearch';
import { Select, Card } from 'antd';
const { Option } = Select;

const SubUpdate = ({ match, history }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [parent, setParent] = useState('');

    useEffect(() => {
        loadCategories();
        loadSub();
    }, []);

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));

    const loadSub = () =>
        getSub(match.params.slug).then((s) => {
            setName(s.data.sub.name);
            setParent(s.data.sub.parent);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name);
        setLoading(true);
        updateSub(match.params.slug, { name, parent }, user.token)
            .then((res) => {
                // console.log(res)
                setLoading(false);
                setName('');
                toast.success(`"${res.data.name}" is updated`);
                history.push('/admin/sub');
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
                            Update sub category
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
                                        value={parent}
                                        placeholder="Select Category"
                                        onChange={(e) => setParent(e)}
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
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        value={name}
                                        autoFocus
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-4 col-6 pl-0 mt-3">
                                <button className="form-save-button add-category">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                    {/* <div className="row"> */}
                    {/* <div className="col-6 pl-0">
                            <div className="form-group">
                                <label>Parent category</label>
                                <Select
                                    value={parent}
                                    style={{ width: '100%' }}
                                    placeholder="Select Category"
                                    onChange={(e) => setParent(e)}
                                >
                                    {categories.length > 0 &&
                                        categories.map((c) => (
                                            <Option
                                                key={c._id}
                                                value={c._id}
                                                selected={c._id === parent}
                                            >
                                                {c.name}
                                            </Option>
                                        ))}
                                </Select>
                            </div>
                        </div>
                        {/* <div className="col-6 pl-0">
                            <CategoryForm
                                handleSubmit={handleSubmit}
                                name={name}
                                setName={setName}
                                sub={true}
                            />
                        </div> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default SubUpdate;
