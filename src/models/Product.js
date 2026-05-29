const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: "Sin descripción"
    },

    price: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        default: 0
    },

    image: {
        type: String,
        default: "/images/default-product.png"
    }
    
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
