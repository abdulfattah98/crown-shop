const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: ObjectId,
                    ref: 'Product',
                },
                count: Number,
                color: String,
            },
        ],
        paymentIntent: {},
        orderStatus: {
            type: String,
            default: 'Not Processed',
            enum: [
                'Not Processed',
                'Cash On Delivery',
                'processing',
                'Dispatched',
                'Cancelled',
                'Completed',
            ],
        },
        orderdBy: { type: ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

orderSchema.pre(/^find/, function (next) {
    this.populate({ path: 'orderdBy', select: 'name email address' });
    next();
});

module.exports = mongoose.model('Order', orderSchema);
