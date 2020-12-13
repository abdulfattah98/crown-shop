import React, { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
// import { Avatar, Badge } from 'antd';
import { Select } from 'antd';
const { Option } = Select;

const FileUpload = ({ values, setValues, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }));
    let color = values.color;
    const [color_item, setColor_item] = useState('');
    const fileUploadAndResize = (e) => {
        // console.log(e.target.files);
        // resize
        let files = e.target.files; // 3
        let allUploadedFiles = values.images;

        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    (uri) => {
                        // console.log(uri);
                        axios
                            .post(
                                `${process.env.REACT_APP_API}/uploadimages`,
                                { image: uri },
                                {
                                    headers: {
                                        authtoken: user ? user.token : '',
                                    },
                                }
                            )
                            .then((res) => {
                                setLoading(false);
                                // const color_img = {};
                                const new_data = {
                                    ...res.data,
                                    color: color_item,
                                };
                                //new_data.push(color_img)
                                allUploadedFiles.push(new_data);

                                setValues({
                                    ...values,
                                    images: allUploadedFiles,
                                });
                                // setColor_item('');
                            })
                            .catch((err) => {
                                setLoading(false);
                                console.log('CLOUDINARY UPLOAD ERR', err);
                            });
                    },
                    'base64'
                );
            }
        }
        // send back to server to upload to cloudinary
        // set url to images[] in the parent component state - ProductCreate
    };
    // const handleChange = (e) => {
    //     setValues({ ...values, [e.target.name]: e.target.value });
    //     // console.log(e.target.name, " ----- ", e.target.value);
    // };

    return (
        <>
            <div
                className="row align-items-center"
                style={{ marginTop: '-1px' }}
            >
                <div className="col-12 col-md-8 col-lg-8 px-1">
                    <div className="form-group">
                        <label>Select Color To Upload</label>
                        {/* <select
                                name="color"
                                className="form-control"
                                value={color_item}
                                onChange={(e) => {
                                    setColor_item(e.target.value);
                                }}
                            >
                                <option>Please select</option>
                                {color.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select> */}
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Select Color"
                            onChange={(value) => {
                                setColor_item(value);
                            }}
                        >
                            {color.length &&
                                color.map((item) => {
                                    return (
                                        <Option key={item} value={item}>
                                            {item}
                                        </Option>
                                    );
                                })}
                        </Select>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-lg-4 px-1 mt-md-0 mt-lg-3 text-right">
                    <label
                        type="button"
                        title="Please Select The Product Color Before Upload"
                        className={`btn btn-primary btn-raised button-upload ${
                            color_item === '' && 'button-disabled'
                        }`}
                    >
                        Choose Image
                        <input
                            type="file"
                            multiple
                            hidden
                            disabled={color_item === '' ? true : false}
                            accept="images/*"
                            onChange={fileUploadAndResize}
                        />
                    </label>
                </div>
            </div>
        </>
    );
};

export default FileUpload;
