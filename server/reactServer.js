// import cors from 'cors'
// import bcryptjs from 'bcryptjs'
// import express from 'express';
// import nodemailer from 'nodemailer';
// // import jwt from 'jsonwebtoken';
// import { userCollection, productCollection, cartCollection, orderCollection } from "./mongo.js"
// import dotenv from 'dotenv/config';
// import path from 'path'
const cors = require("cors")
const bcryptjs = require("bcryptjs")
const express = require("express")
const nodemailer = require("nodemailer")
const { userCollection, productCollection, cartCollection, orderCollection } = require("./mongo")

const PORT = process.env.PORT || 8000
// const BASE_URL=process.env.BASE_URL

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
// app.use(express.static(path.join(__dirname,'../client/build')))

// app.get("*",function(res,req){
//     res.sendFile("../client/build/index.html")
// })

async function hashPass(password) {

    const res = await bcryptjs.hash(password, 10)
    return res

}
async function compare(userPass, hashPass) {

    const res = await bcryptjs.compare(userPass, hashPass)
    return res

}



app.get("/", cors(), (req, res) => {
    res.redirect('/orders');

})


// let ff

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, '/images')
//     },
//     filename: (req, file, cb) => {
//         // ff = file
//         cb(null, file.originalname)
//     } 
// })
// const uploading = multer({ storage: storage })


app.post("/pageChange", async (req, res) => {
    try {
        const type = req.body.selectedOption
        const pageNum = req.body.pageNum

        if (type == "All") {

            const allProducts = await productCollection.find({}).skip((pageNum - 1) * 12).limit(12)


            res.json(allProducts)
        }
        else {

            const allProducts = await productCollection.find({ type: type }).skip((pageNum - 1) * 12).limit(12)


            res.json(allProducts)
        }


    }
    catch (e) {
        res.json("fail")
    }
})


app.post("/getProducts", async (req, res) => {
    try {
        const type = req.body.selectedOption
        // await productCollection.updateMany()
        // await productCollection.updateMany({}, {$set: {allRatings:[],reviews:[]}})
        await productCollection.updateMany({}, { $unset: { numOfRatings: 1 } })


        if (type == "All") {

            const allProducts = await productCollection.find({}).skip(0).limit(12)
            const totalItems = await productCollection.find({}).countDocuments()
            const data = {
                allProducts,
                totalItems
            }

            res.json(data)
        }
        else {

            const allProducts = await productCollection.find({ type: type }).skip(0).limit(12)
            const totalItems = await productCollection.find({ type: type }).countDocuments()
            const data = {
                allProducts,
                totalItems
            }

            res.json(data)
        }


    }
    catch (e) {
        res.json("fail")
    }
})

app.post("/myaccount", async (req, res) => {
    try {

        const email = req.body.cookieValue
        const check = await userCollection.findOne({ email: email })
        res.json(check.name)

    }
    catch (e) {

    }

})



app.post("/search", async (req, res) => {
    const searchVal = req.body.query
    const words = searchVal.split(' ');
    let finalArr = []
    // let totalItems = 0

    try {
        const products = await productCollection.find({})

        products.forEach(e => {
            let sum = 0
            for (let i = 0; i < words.length; i++) {
                const name = e.name;
                const type = e.type;
                const regex = new RegExp(`\\b${words[i].toLowerCase()}\\b`, 'i');

                if (regex.test(name.toLowerCase())) {
                    sum++
                }
                else if (regex.test(type.toLowerCase())) {
                    sum++
                }


            }

            if (sum == words.length) {

                finalArr.push(e)

                // totalItems++
            }

        })
        //    let obj = {
        //         finalArr,
        //         totalItems
        //     }
        res.json(finalArr)
    }
    catch (e) {
        res.json("fail")
    }
})

// app.post("/searchPageChange", async (req, res) => {

//     const searchVal = req.body.query
//     const words = searchVal.split(' ');
//     
//     let finalArr = []
//     let totalItems = 0

//     try {
//         const products = await productCollection.find({})

//         const query = req.body.query
//         const pageNum = req.body.pageNum
//         for (let j = 0; j < products.length; j++) {
//             let sum = 0
//             for (let i = 0; i < words.length; i++) {
//                 // const name = e.name;
//                 const name = products[j].name;
//                 const regex = new RegExp(`\\b${words[i].toLowerCase()}\\b`, 'i');

//                 if (regex.test(name.toLowerCase())) {

//                     sum++
//                 }
//                 // const match = name.toLowerCase().includes(words[i].toLowerCase());
//                 // if (match) {
//                 // }

//             }
//             // if(finalArr.length>=12){
//             //     break
//             // }


//             if (sum == words.length) {
//                 if (finalArr.length < 12) {

//                     finalArr.push(products[j])
//                 }
//                 totalItems++
//             }

//             // })
//         }
//         let obj = {
//             finalArr,
//             totalItems
//         }
//         console.log(obj)
//         res.json(obj)

//     }
//     catch (e) {
//         res.json("fail")
//         console.log(e)
//     }
// })


app.post("/adminUpdate", async (req, res) => {
    const formData = req.body.formData
    const messages = req.body.messages


    try {
        const data = {
            name: formData.name,
            type: formData.type,
            price: formData.price,
            stocks: formData.stocks,
            img: messages,
            // rating:0,
            allRatings: [],
            reviews: []
        }

        await productCollection.insertMany([data])

        res.json("pass")
    }
    catch (e) {
        res.json("fail")
    }
})




app.post("/addToCart", async (req, res) => {
    try {
        const cookieVal = req.body.cookieVal
        const nameOfProduct = req.body.nameOfProduct
        const qty = parseInt(req.body.qty)
        const cartEmailCheck = await cartCollection.findOne({ email: cookieVal })


        if (cartEmailCheck) {
            const cartItemCheck = (cartEmailCheck.allProducts).some(obj => obj.nameOfProduct == nameOfProduct);
            if (cartItemCheck) {
                res.json("alreadyAdded")
            }
            else {

                let arr = cartEmailCheck.allProducts
                let obj = {
                    nameOfProduct: nameOfProduct,
                    qty: qty
                }

                arr.push(obj)
                await cartCollection.updateOne({ email: cookieVal }, { $set: { allProducts: arr } });

                res.json("pass")
            }
        }
        else {
            let arr = []
            let obj = {
                nameOfProduct: nameOfProduct,
                qty: qty
            }

            arr.push(obj)

            const data = {
                email: cookieVal,
                allProducts: arr

            }
            await cartCollection.insertMany([data]);
            res.json("pass")

        }


    }
    catch (e) {
        res.json("fail")
    }

})



app.post("/getItemsFromcart", async (req, res) => {
    const cookieVal = req.body.cookieVal
    try {

        const check = await cartCollection.findOne({ email: cookieVal })


        if (check) {
            if ((check.allProducts).length == 0) {
                res.json("noitems")

            }
            else {
                let arr = []
                check.allProducts.map(async (e) => {
                    const checkInProducts = await productCollection.findOne({ name: e.nameOfProduct })
                    let SingleItemPageObj = checkInProducts
                    let qty
                    if (checkInProducts.stocks > e.qty) {
                        qty = e.qty
                    }
                    else {
                        qty = checkInProducts.stocks
                        await cartCollection.updateOne(
                            { email: cookieVal, "allProducts.nameOfProduct": e.nameOfProduct },
                            { $set: { "allProducts.$.qty": qty } }
                        );

                    }

                    arr.push({ SingleItemPageObj, qty })


                })

                setTimeout(() => {
                    res.json(arr)
                }, 200)


            }
        }
        else {
            res.json("noitems")
        }

    }
    catch (e) {
        res.json("fail")
    }

})


app.post("/deleteItemFromCart", async (req, res) => {

    const cookieVal = req.body.cookieVal
    const deleteItem = req.body.deleteItem
    try {

        const check = await cartCollection.findOne({ email: cookieVal })
        let arr = check.allProducts

        arr = arr.filter(obj => obj.nameOfProduct != deleteItem);

        await cartCollection.updateOne({ email: cookieVal }, { $set: { allProducts: arr } });


        let newArr = []
        arr.map(async (e) => {
            const checkInProducts = await productCollection.findOne({ name: e.nameOfProduct })
            let SingleItemPageObj = checkInProducts
            let qty = e.qty
            // subTotal=subTotal+ qty*(checkInProducts.price)

            newArr.push({ SingleItemPageObj, qty })


        })

        setTimeout(() => {
            res.json(newArr)
        }, 200)


    }
    catch (e) {
        res.json("fail")
    }

})


app.post("/qtyChanged", async (req, res) => {
    const cookieVal = req.body.cookieVal
    const qty = req.body.qty
    const itemName = req.body.itemName
    try {



        await cartCollection.updateOne(
            { "email": cookieVal, "allProducts.nameOfProduct": itemName },
            { "$set": { "allProducts.$.qty": qty } }
        )
        const check = await cartCollection.findOne({ email: cookieVal })


        let arr = []

        check.allProducts.map(async (e) => {
            const checkInProducts = await productCollection.findOne({ name: e.nameOfProduct })
            let SingleItemPageObj = checkInProducts
            let qty = e.qty
            // subTotal=subTotal+ qty*(checkInProducts.price)

            arr.push({ SingleItemPageObj, qty })


        })

        setTimeout(() => {
            res.json(arr)
        }, 200)


    }
    catch (e) {
        res.json("fail")
    }

})



app.post("/addToOrders", async (req, res) => {
    const allOrders = req.body.arr
    const cookieVal = req.body.cookieVal
    const isProductFromCart = req.body.isProductFromCart
    try {

        const product = await productCollection.find({})
        let outOfStockSent = false // Create a variable to check if outOfStock response has already been sent

        allOrders.map(async (item1) => {
            const item2 = product.find((i) => i.name == item1.nameOfProduct);

            // if (item2) {
            if (item2.stocks < item1.qty) {
                outOfStockSent = true // Set the variable to true if the response has been sent

                // return
            }
            // }

        });

        if (outOfStockSent == true) { // Check if the response has already been sent, and return if it has
            res.json("outOfStock")
        }
        else {
            //update the stocks in productcollection:
            allOrders.map(async (item1) => {
                const item2 = product.find((i) => i.name == item1.nameOfProduct);

                // if (item2) {
                await productCollection.updateOne({ name: item1.nameOfProduct }, { $set: { stocks: item2.stocks - item1.qty } });
                // }

                const data = {
                    email: cookieVal,
                    nameOfProduct: item1.nameOfProduct,
                    qty: item1.qty,
                    date: item1.date,
                    time: item1.time,
                    phoneNum: item1.phoneNum,
                    address: item1.address,
                    pincode: item1.pincode,
                    cardNum: item1.cardNum
                }
                await orderCollection.insertMany([data])
            });




            // const check = await orderCollection.findOne({ email: cookieVal })

            // if (check) {


            //     await orderCollection.updateOne(
            //         { email: cookieVal },
            //         { $push: { allOrders: { $each: allOrders } } },
            //       );

            // }
            // else {
            //     const data = {
            //         email: cookieVal,
            //         allOrders: allOrders
            //     }
            //     await orderCollection.insertMany([data])

            // }

            if (isProductFromCart == true) {
                await cartCollection.updateOne({ email: cookieVal }, { $set: { allProducts: [] } });
            }


            res.json("pass")
        }
    }
    catch (e) {
        res.json("fail")
    }

})




app.post("/submitRating", async (req, res) => {
    const cookieVal = req.body.cookieVal
    const selectedOption = parseInt(req.body.selectedOption)
    const productName = req.body.productName
    try {

        // let check=await userCollection.findOne({email:cookieVal})

        let obj = {
            name: cookieVal,
            rating: selectedOption
        }
        // const check = await orderCollection.findOne({ email: cookieVal })
        await productCollection.updateOne(
            { name: productName },
            { $push: { allRatings: obj } }
        )
        res.json("pass")

    }
    catch (e) {
        res.json("fail")
    }

})

app.post("/submitReview", async (req, res) => {
    const cookieVal = req.body.cookieVal
    const review = req.body.review
    const productName = req.body.productName
    try {

        // let check=await userCollection.findOne({email:cookieVal})

        let obj = {
            name: cookieVal,
            message: review
        }
        // const check = await orderCollection.findOne({ email: cookieVal })
        await productCollection.updateOne(
            { name: productName },
            { $push: { reviews: obj } }
        )
        res.json("pass")

    }
    catch (e) {
        res.json("fail")
    }

})


app.post("/getItemsFromOrderCollection", async (req, res) => {
    try {
        const cookieVal = req.body.cookieVal

        const check = await orderCollection.find({ email: cookieVal })

        if (check.length != 0) {

            let arr = []

            check.map(async (e) => {
                const checkInProducts = await productCollection.findOne({ name: e.nameOfProduct })
                let SingleItemPageObj = checkInProducts
                let qty = e.qty
                let date = e.date
                let time = e.time
                let phoneNum = e.phoneNum
                let address = e.address
                let pincode = e.pincode
                let cardNum = e.cardNum


                // arr.push({ SingleItemPageObj, date, time })
                arr.push({ SingleItemPageObj, qty, date, time, phoneNum, address, pincode, cardNum })


            })

            setTimeout(() => {
                res.json(arr)
            }, 200)



        }
        else {
            res.json("noitems")
        }

    }
    catch (e) {
        res.json("fail")
    }

})

// const MY_EMAIL=process.env.REACT_APP_MY_EMAIL

app.post('/sendEmail', async (req, res) => {

    try {
        const email = req.body.email;
        const otp = req.body.OTP;

        const check = await userCollection.findOne({ email: email })

        if (check) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MY_EMAIL, // replace with your email address
                    pass: process.env.MY_EMAIL_PASS  // replace with your email password or app password
                }
            });

            const mailOptions = {
                from: 'Ecommerce', // replace with your email address
                to: email,
                subject: 'Password Reset',
                text: `The code to create a new password for the demo Ecommerce website is ${otp}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.json("fail")
                } else {
                    res.json('pass');
                }
            });
        }
        else {
            res.json("notexist")
        }
    }
    catch (e) {
        res.json("fail")
    }


});


app.post("/resetPassword", async (req, res) => {
    const cookieVal = req.body.cookieVal
    const password = req.body.password
    try {
        const newPass = await hashPass(password)
        await userCollection.updateOne({ email: cookieVal }, { $set: { password: newPass } });

        res.json("pass")
    }
    catch (e) {
        res.json("fail")
    }

})

app.post("/login", async (req, res) => {
    const formData = req.body.formData
    try {

        const check = await userCollection.findOne({ email: formData.email })


        if (check) {
            const passCheck = await compare(formData.password, check.password)
            passCheck ? res.json("loginPass") : res.json("loginFail")

        }
        else {
            res.json("nouser")
        }

    }
    catch (e) {
        res.json("fail")
    }

})



app.post("/signup", async (req, res) => {
    const formData = req.body.formData

    const data = {
        name: formData.name,
        email: formData.email,
        password: await hashPass(formData.password)
    }

    try {
        const check = await userCollection.findOne({ email: formData.email })

        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
            await userCollection.insertMany([data])
        }

    }
    catch (e) {
        res.json("fail")
    }

})



// app.listen(PORT, () => {
//     console.log('Server listening on port');
// });

app.listen(PORT);