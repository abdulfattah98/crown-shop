import React, { useState, useEffect } from 'react';
import { Select, InputNumber, Avatar, Badge } from 'antd';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';

import FileUpload from '../forms/FileUpload';

const { Option } = Select;

const ProductCreateForm = ({
    handleSubmit,
    handleChange,
    setValues,
    values,
    handleCatagoryChange,
    subOptions,
    showSub,
}) => {
    // destructure
    const {
        title,
        description,
        price,
        categories,
        category,
        subs,
        shipping,
        quantity,
        images,
        colors,
        brands,
        color,
        brand,
    } = values;

    const { user } = useSelector((state) => ({ ...state }));
    const [loading, setLoading] = useState(false);
    const [currentColors, setCurrentColors] = useState([]);

    const [showUpload, setShowUpload] = useState(false);

    const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;

    useEffect(() => {
        const color = values.color;
        if (color && color.length > 0) {
            setShowUpload(true);
        } else {
            setShowUpload(false);
        }
    }, [values]);

    useEffect(() => {
        if (currentColors) {
            handleColorImagesRemove(currentColors);
            setValues({ ...values, color: currentColors });
        } else {
            setLoading(false);
        }
    }, [currentColors]);

    const handleColorImagesRemove = async (value) => {
        const colorObj = {};
        for (let i = 0; i < value.length; i++) {
            colorObj[value[i]] = true;
        }
        const deletedColor = [...color].find(
            (c) => !colorObj.hasOwnProperty(c)
        );
        const imgs = images.filter((image) => image.color === deletedColor);

        if (!deletedColor || !imgs) {
            setLoading(false);
        }

        for await (let i of imgs) {
            const public_id = i.public_id;
            axios
                .post(
                    `${process.env.REACT_APP_API}/removeimage`,
                    { public_id },
                    {
                        headers: {
                            authtoken: user ? user.token : '',
                        },
                    }
                )
                .then((res) => {
                    const { images } = values;
                    let filteredImages = images.filter((item) => {
                        return item.color !== deletedColor;
                    });
                    setValues({
                        ...values,
                        images: filteredImages,
                        color: value,
                    });

                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
            // handleChange(value, 'color');
        }
    };

    const handleImageRemove = (public_id) => {
        setLoading(true);
        // console.log("remove image", public_id);
        axios
            .post(
                `${process.env.REACT_APP_API}/removeimage`,
                { public_id },
                {
                    headers: {
                        authtoken: user ? user.token : '',
                    },
                }
            )
            .then((res) => {
                setLoading(false);
                const { images } = values;
                let filteredImages = images.filter((item) => {
                    return item.public_id !== public_id;
                });
                setValues({ ...values, images: filteredImages });
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="add-product-form">
            <div className="row">
                <div className="col-12 col-md-6 px-2 mb-4">
                    <div className="form-group">
                        <label>Product Brand</label>
                        {/* <select
                            name="brand"
                            className="form-control"
                            onChange={handleChange}
                        >
                            <option>Please select</option>
                            {brands.map((b) => (
                                <option key={b} value={b}>
                                    {b}
                                </option>
                            ))}
                        </select> */}
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Select Brand"
                            // value={color}
                            onChange={(e) => handleChange(e, 'brand')}
                        >
                            {brands.map((b) => (
                                <Option key={b} value={b}>
                                    {b}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="col-12 col-md-6 px-2 mb-4">
                    <div className="form-group">
                        <label>Product Category</label>
                        {/* <select
                            name="category"
                            className="form-control"
                            onChange={handleCatagoryChange}
                        >
                            <option>Please select</option>
                            {categories.length > 0 &&
                                categories.map((c) => (
                                    <option key={c._id} value={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                        </select> */}
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Select Category"
                            // value={color}
                            onChange={(e) => handleCatagoryChange(e)}
                        >
                            {categories.length > 0 &&
                                categories.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                        </Select>
                    </div>
                </div>

                {showSub && (
                    <div className="col-12 col-md-6 px-2 mb-4">
                        <div className="form-group">
                            <label>Product Sub Categories</label>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Select Sub Categories"
                                // value={subs}
                                onChange={(value) =>
                                    setValues({ ...values, subs: value })
                                }
                            >
                                {subOptions.length &&
                                    subOptions.map((s) => (
                                        <Option key={s._id} value={s._id}>
                                            {s.name}
                                        </Option>
                                    ))}
                            </Select>
                        </div>
                    </div>
                )}

                <div className="col-12 col-md-6 px-2 mb-4">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input
                            type="text"
                            placeholder="Product Name"
                            name="title"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="col-12 col-md-6 px-2 mb-4">
                    <div className="form-group">
                        <label>Product Description</label>
                        <input
                            type="text"
                            placeholder="Product Description"
                            name="description"
                            className="form-control"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="col-12 col-md-6 px-2 mb-4">
                    <div className="form-group">
                        <label>Product Price</label>
                        {/* <input
                            type="number"
                            name="price"
                            className="form-control"
                            value={price}
                            onChange={handleChange}
                        /> */}
                        <InputNumber
                            min={1}
                            defaultValue={1}
                            style={{ width: '100%' }}
                            onChange={(value) => handleChange(value, 'price')}
                        />
                    </div>
                </div>

                <div className="col-12 col-md-6 px-2 mb-4">
                    <div className="form-group">
                        <label>Product Quantity</label>

                        <InputNumber
                            min={1}
                            // max={10}
                            defaultValue={1}
                            style={{ width: '100%' }}
                            onChange={(value) =>
                                handleChange(value, 'quantity')
                            }
                        />
                    </div>
                </div>

                <div className="col-12 col-md-6 px-2 mb-4">
                    <div className="form-group">
                        <label>Product Shipping</label>

                        <Select
                            style={{ width: '100%' }}
                            placeholder="Shipping ?"
                            // value={color}
                            onChange={(e) => handleChange(e, 'shipping')}
                        >
                            <Option value="Yes">Yes</Option>
                            <Option value="No">No</Option>
                        </Select>
                    </div>
                </div>

                <div className="col-12 col-md-6 px-2 mb-4">
                    <div className="form-group">
                        <label>Product Colors</label>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Select Colors"
                            value={[...color]}
                            onChange={(value) => {
                                // setValues({ ...values, color: value });
                                setLoading(true);
                                console.log(value);
                                setCurrentColors(value);
                            }}
                        >
                            {colors.length &&
                                colors.map((s) => (
                                    <Option key={s} value={s}>
                                        {s}
                                    </Option>
                                ))}
                        </Select>
                    </div>
                </div>
                {showUpload ? (
                    <div className="col-12 col-md-6 px-0 mb-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>
                ) : null}
                {color && showUpload ? (
                    <>
                        {values.images ? (
                            <div
                                className={`row mx-1 py-4 px-3 bg-white border image-view ${
                                    loading
                                        ? 'd-flex align-items-center justify-content-center bg-light'
                                        : ''
                                }`}
                                style={{ minHeight: '0', minHeight: '15rem' }}
                            >
                                {!loading ? (
                                    values.images.map((image) => {
                                        console.log(image.color);
                                        return (
                                            <div
                                                className="col-4 px-2 col-md-3 col-lg-2 my-3"
                                                key={image.public_id}
                                            >
                                                <div
                                                    className={`image-uploaded ${image.color}`}
                                                >
                                                    <span
                                                        className="remove-image"
                                                        onClick={() =>
                                                            handleImageRemove(
                                                                image.public_id
                                                            )
                                                        }
                                                    >
                                                        X
                                                    </span>
                                                    <span
                                                        className="image-color"
                                                        style={{
                                                            color: `${
                                                                image.color ===
                                                                'White'
                                                                    ? 'rgb( 224, 224, 224)'
                                                                    : image.color
                                                            }`,
                                                        }}
                                                    >
                                                        {image.color}
                                                    </span>
                                                    <div className="image-container">
                                                        <img
                                                            src={image.url}
                                                            alt="product image"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <Spin indicator={antIcon} />
                                )}
                            </div>
                        ) : null}
                    </>
                ) : null}
            </div>
            <div className="row mt-5">
                <div className="col-3 pl-0">
                    <button className="form-save-button">Save</button>
                </div>
            </div>
        </form>
    );
};

export default ProductCreateForm;
