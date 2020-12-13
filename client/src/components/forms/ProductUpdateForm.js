import React, { useState, useEffect } from 'react';
import { Select, InputNumber } from 'antd';
import FileUpload from '../forms/FileUpload';

import { Spin } from 'antd';
import { useSelector } from 'react-redux';

import { LoadingOutlined } from '@ant-design/icons';

import axios from 'axios';

const { Option } = Select;

const ProductUpdateForm = ({
    handleSubmit,
    handleChange,
    setValues,
    values,
    handleCategoryChange,
    categories,
    subOptions,
    arrayOfSubs,
    setArrayOfSubs,
    selectedCategory,
}) => {
    // destructure
    const {
        title,
        description,
        price,
        category,
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

    const [showUpload, setShowUpload] = useState(false);
    const [currentColors, setCurrentColors] = useState(color);

    // const [currentColors, setCurrentColors] = useState(color);
    // console.log(currentColors);

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
        setLoading(false);
    }, []);

    useEffect(() => {
        if (currentColors) {
            handleColorImagesRemove(currentColors);
            setValues({ ...values, color: currentColors });
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

        if (deletedColor === undefined || imgs.length === 0) {
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
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-12 col-md-6 px-2 mb-4">
                    <div className="form-group">
                        <label>Product Brand</label>

                        <Select
                            style={{ width: '100%' }}
                            placeholder="Select Brand"
                            value={brand}
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
                        <label>Category</label>

                        <Select
                            style={{ width: '100%' }}
                            placeholder="Select Category"
                            // value={color}
                            value={
                                selectedCategory
                                    ? selectedCategory
                                    : category._id
                            }
                            onChange={(e) => handleCategoryChange(e)}
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
                <div className="col-12 col-md-6 px-2 mb-4">
                    <div className="form-group">
                        <label>Product Sub Categories</label>
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            value={arrayOfSubs}
                            onChange={(value) => setArrayOfSubs(value)}
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
                <div className="col-12 col-md-6 px-2 mb-4">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={title}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="col-12 col-md-6 px-2 mb-4">
                    <div className="form-group">
                        <label>Product Description</label>
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            value={description}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="col-12 col-md-6 px-2 mb-4">
                    <div className="form-group">
                        <label>Product Price</label>

                        <InputNumber
                            min={1}
                            value={price}
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
                            value={quantity}
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
                            value={shipping === 'Yes' ? 'Yes' : 'No'}
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
                {/* 
                <div className="form-group">
                    <label>Color</label>
                    <select
                        value={color}
                        name="color"
                        className="form-control"
                        onChange={handleChange}
                    >
                        {colors.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div> */}

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
                                style={{ minHeight: '15rem' }}
                            >
                                {!loading ? (
                                    values.images.map((image) => {
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
                                                            alt={
                                                                image.public_id
                                                            }
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

export default ProductUpdateForm;
