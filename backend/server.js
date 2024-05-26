const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/userSchema')
const Product = require('./models/productSchema')
const Transaction = require('./models/transactionSchema')

const SECRET_KEY = 'secretkey'

//connect to express app
const app = express()

//connect to MongoDB
const dbURI = 'mongodb+srv://bisimbulan1:QRGtFPZERGgmQwoc@cluster0.cvskgn9.mongodb.net/UsersDB?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(3001, () => {
        console.log('Server is connected to port 3001 and connected to MongoDb')
    })
})
    .catch((error) => {
        console.log('Unable to connect to Server and/or MongoDb')
    })
//middleware
app.use(bodyParser.json())
app.use(cors())



//Routes
//USER REGISTRATION
//POST REGISTER
app.post('/register', async (req, res) => {
    try {
        const { firstname, middlename, lastname, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10) //10 is how hard the password can be unhashed
        const customerType = 'Customer'
        const newUser = new User({ firstname, middlename, lastname, usertype: customerType, email, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Error signing up' })
    }
})

app.post('/checkout', async (req, res) => {
    try {
        console.log('This is req.body: ', req.body)
        const { productId, orderQuantity, email } = req.body;
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0].replace(/-/g, ' ');
        const formattedTime = date.toTimeString().split(' ')[0];


        const newTransaction = new Transaction({
            productId,
            orderQuantity,
            orderStatus: 0, // Initially set to Pending
            email,
            date: formattedDate,
            time: formattedTime
        });
        await newTransaction.save();
        res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

//GET REGISTERED USERS
app.get('/register', async (req, res) => {
    try {
        const users = await User.find()
        res.status(201).json(users)
    } catch (error) {
        res.status(500).json({ error: 'Unable to get users' })
    }
})


//GET LOGIN
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' })
        res.json({ message: 'Login successful', token, usertype: user.usertype, firstname: user.firstname, lastname: user.lastname, userEmail: user.email })
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' })
    }
})


app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch products' });
    }
});


// Create // POST REQUEST
// Read // GET REQUEST
// Update // PUT or PATCH REQUEST
// Delete // DELETE REQUEST
