# Books API by Oscar Eder Velázquez Pineda

REST Service to server information about book wishlist and using API Google Book.

- **Post Methods**
    - `signup`: To registry a new user.
    - `signin`: To login with user registed previously and return an access token.
    - `wishlist`: To create a new wishlist.
    - `books/{wishlist_name}`: Add a book to wishlist assigned.
- **Get Methods**
    - `search/{book_name}?author={author_name}`: To search a book. Parameter ___author___ is optional
    - `wishlist`: To retrieve all wishlist created by user.
    - `wishlist/{wishlist-name}`: To retrieve a wishlist and its books created by user.
- **Delete Methods**
    - `wishlist/{wishlist-name}`: Delete a wishlist.
    - `books/{wishlist_name}`: Delete a book from wishlist.

## Running Locally

1. Clone repository