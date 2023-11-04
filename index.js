const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/Geekchic')
  .then(() => console.log('Connected!'));

const productSchema = new mongoose.Schema({
    id: Number, 
    name: String, 
    price: Number
})

const billingSchema = new mongoose.Schema({
    name: String,
    mobile: Number,
    address: String,
    email: String
})

const Product = mongoose.model('Product', productSchema)
const Bill = mongoose.model('Bill', billingSchema)

const server = express()
server.use(bodyParser.json())
server.use(cors())

server.post('/products',async (req, res) => {
    let product = new Product()
    product.id = req.body.id
    product.name = req.body.name
    product.price = req.body.price
    const doc = await product.save()

    console.log(doc)
})

server.get('/products', async (req, res) => {
    const docs = await Product.find({})
    res.json(docs)
})
server.post('/billing', async (req, res)=>{
    let bill = new Bill()
    bill.mobile = req.body.mobile
    bill.email = req.body.email
    bill.address = req.body.address
    bill.name = req.body.name
    const doc = await bill.save()
    console.log(doc)
})
server.listen(8080, ()=>{
    console.log('Server is running...')
})