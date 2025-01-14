require('dotenv').config({path:  "./config.env"})
const express =require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
var cors = require('cors')

//Connect DB
connectDB();

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api/auth',require('./routes/auth'));
app.use('/api/private',require('./routes/private'));
app.use('/api/category',require('./routes/category'));
app.use('/api/petcategory',require('./routes/petcategory'));
app.use('/api/product',require('./routes/product'));
app.use('/api/user',require('./routes/user'));
app.use('/api/favorites',require('./routes/favorite'));
app.use('/api/cart',require('./routes/cart'));
app.use('/api/announcement',require('./routes/announcement'));
app.use('/api/order',require('./routes/order'));



//Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

process.on("unhandleRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(()=> process.exit(1));
})