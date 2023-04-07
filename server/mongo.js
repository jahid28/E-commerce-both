const mongoose=require("mongoose")

mongoose.connect("mongodb://0.0.0.0:27017/mern_ecommerce")
    // .then(() => {
    //     console.log("react mongodb connected");
    // })
    // .catch(() => {
    //     console.log('failed');
    // })

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stocks: {
        type: Number,
        required: true
    },
    img: {
        type: Array,
        required: true
    },
    allRatings: {
        type: Array,
        required: true
    },
    reviews: {
        type: Array,
        required: true
    }
})
const cartSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    allProducts: {
        type: Array,
        required:true
    }
})
const orderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    nameOfProduct: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    phoneNum: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    cardNum: {
        type: Number,
        required: true
    }
   
})


const userCollection = mongoose.model("userCollection", userSchema)
const productCollection = mongoose.model("productCollection", productSchema)
const cartCollection = mongoose.model("cartCollection", cartSchema)
const orderCollection = mongoose.model("orderCollection", orderSchema)


// export { userCollection, productCollection, cartCollection,orderCollection };
const collections = {
    userCollection,
    productCollection,
    cartCollection,
    orderCollection,
  };
  
  module.exports = collections;