const express = require('express')
const app = express();
const sessionRoute = require('./api/session');
const booksGoogle = require('./api/books-google');
const wishlistRoute = require('./api/wishlist');

process.env.JWTKEY = "appPr1vat3K3y";
process.env.GOOGLE_BOOKS_API_KEY = "AIzaSyASo8XKSmmll_QoPh9lvXOuWJ4ViqkglZM";

app.use(express.json());
app.use("/api", sessionRoute);
app.use("/api", wishlistRoute);
app.use("/api", booksGoogle);

app.listen(3000,() => console.log(`Welcome to Book’s wishlists API. PORT 3000`));