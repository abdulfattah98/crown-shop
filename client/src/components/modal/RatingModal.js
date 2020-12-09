import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { StarOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';

const RatingModal = ({
    children,
    modalVisible,
    setModalVisible,
    title,
    onOk,
    pSlug,
    okText,
    type,
}) => {
    const { user } = useSelector((state) => ({ ...state }));

    let history = useHistory();
    let { slug } = useParams();

    const handleModal = () => {
        if (user && user.token) {
            setModalVisible(true);
        } else {
            history.push({
                pathname: '/login',
                state: { from: `/product/${slug}` },
            });
        }
    };

    return (
        <>
            <div onClick={handleModal}>
                {/* <StarOutlined className="text-danger" /> <br />{' '} */}
            </div>
            <Modal
                className={`${type === 'delete' ? 'delete-modal' : ''}`}
                centered
                okText={`${okText ? okText : 'Save'}`}
                title={title}
                visible={modalVisible}
                onOk={() => {
                    if (onOk) {
                        onOk(pSlug);
                    } else {
                        setModalVisible(false);
                        toast.success(
                            'Thanks for your review. It will apper soon'
                        );
                    }
                }}
                onCancel={() => setModalVisible(false)}
            >
                {children}
            </Modal>
        </>
    );
};

export default RatingModal;
