import React, { useState } from 'react';
import { Card } from 'antd';
import laptop from '../../images/laptop.png';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import RatingModal from '../modal/RatingModal';

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
    // destructure
    const { title, description, images, slug } = product;

    const [modalVisible, setModalVisible] = useState(false);
    //  setModalVisible(false);
    //  toast.success('Thanks for your review. It will apper soon');
    return (
        <div>
            <Card
                cover={
                    <div className="admin-image-container">
                        <img
                            alt={slug}
                            src={
                                images && images.length ? images[0].url : laptop
                            }
                            style={{
                                // height: '150px',
                                width: '100%',
                                objectFit: 'cover',
                            }}
                            className="p-1"
                        />
                    </div>
                }
                actions={[
                    <Link to={`/admin/product/${slug}`}>
                        <EditOutlined className="text-warning" />
                    </Link>,
                    <DeleteOutlined
                        onClick={() => setModalVisible(true)}
                        className="text-danger"
                    />,
                ]}
            >
                <Meta
                    title={`${
                        title.length > 50
                            ? title.substring(0, 50) + '...'
                            : title
                    }`}
                    description={`${
                        description.length > 50
                            ? description.substring(0, 50) + '...'
                            : description
                    }`}
                />
            </Card>
            <RatingModal
                type="delete"
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                title="Are You Sure You Want To Delete This Product?"
                onOk={handleRemove}
                pSlug={slug}
                okText="Delete"
            />
        </div>
    );
};

export default AdminProductCard;
