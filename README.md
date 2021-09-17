# Books API by Oscar Eder Velázquez Pineda

REST Service to serve information about book wishlist and using API Google Book. 
This project requires __docker-compose__ to launch api and database (mongo).

- **Post Methods**
    - `/signup`: To registry a new user.
    - `/signin`: To login with user registed previously and return an access token.
    - `/wishlist`: To create a new wishlist.
    - `/wishlist/<wishlist name>/books`: Add a book to wishlist assigned.
- **Get Methods**
    - `/books/?title=<title book>^&author=<author>&publisher=<publisher>&key=<google-books-api-key>`: To search a book.
    - `/wishlist`: To retrieve all wishlist created by user.
    - `/wishlist/<wishlist-name>`: To retrieve a wishlist and its books created by user.
- **Delete Methods**
    - `/wishlist/{wishlist-name}`: Delete a wishlist by user.
    - `/wishlist/<wishlist name>/books/<bookId>`: Delete a book from wishlist by user.

## Running Locally

1. Clone repository:

    ```bash
    git clone https://github.com/eder-abi/booksApi.git 
    ```

2. Build API:

    ```bash
    docker-compose build
    ```

3. Execute Project:

    ```bash
    docker-compose up
    ```

## API Examples
1. To registry a new user.
    - WIN
        ```bash
        curl -X POST http://localhost:3000/api/signup -H "Content-Type: application/json" -d "{\"username\":\"eder\",\"password\":\"pwd1\"}"
        ```
    - LINUX
        ```bash
        curl --location --request POST 'http://localhost:3000/api/signup' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "username": "eder1",
            "password": "pwd1"
        }'
        ```
    - Response
        ```bash
        Sign up OK, please login.
        ```

2. To login with user registed previously and return an access token.
    - WIN
        ```bash
        curl -X POST http://localhost:3000/api/signin -H "Content-Type: application/json" -d "{\"username\":\"eder\",\"password\":\"pwd1\"}"
        ```
    - LINUX
        ```bash
        curl --location --request POST 'http://localhost:3000/api/signin' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "username": "eder",
            "password": "pwd1"
        }'
        ```
    - Response (access token)
        ```bash
        {
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTc2NDE3OX0.-y0KKusxTB3BdSVaQFjPJ-vKZLn8zbpwwFvORHjeOj8"
        }
        ```

3. To create a new wishlist.
    - WIN
        ```bash
        curl -X POST http://localhost:3000/api/wishlist -H "Content-Type: application/json" -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTY3MDgwN30.M7nuedPfaxtSt7zsWOeHV_1JN8YMsahDMsl97IsacEk" -d "{\"name\":\"Lista 001\"}"
        ```
    - LINUX
        ```bash
        curl --location --request POST 'http://localhost:3000/api/wishlist' \
        --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTc2NDE3OX0.-y0KKusxTB3BdSVaQFjPJ-vKZLn8zbpwwFvORHjeOj8' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "name": "Lista 001"
        }'
        ```
    - Response (new wishlist)
        ```bash
        {
            "user":"eder",
            "name":"Lista 001",
            "books":[],
            "_id":"6141768420816c9bb8a1e7de",
            "__v":0
        }
        ```

4. To search a book.
    - WIN
        ```bash
        curl http://localhost:3000/api/books?title=Silmarillion^&author=Tolkien^&publisher=Grupo+Planeta+Spain^&key=AIzaSyASo8XKSmmll_QoPh9lvXOuWJ4ViqkglZM -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTc2NDE3OX0.-y0KKusxTB3BdSVaQFjPJ-vKZLn8zbpwwFvORHjeOj8"
        ```
    - LINUX
        ```bash
        curl --location --request GET 'http://localhost:3000/api/books?author=Tolkien&publisher=Grupo Planeta Spain&key=AIzaSyASo8XKSmmll_QoPh9lvXOuWJ4ViqkglZM&title=Silmarillion' \
        --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlcjEiLCJpYXQiOjE2MzE3NjMzNjR9.iT93bpSb6EaCeoooYbg7b18amYeMY38yOtSR9tccpr8' \
        --data-raw ''
        ```
    - Response (books found)
        ```bash
        {
            "items": [
                {
                    "bookId": "_LIfNCn06J8C",
                    "title": "El Libro de los Cuentos Perdidos Historia de la Tierra Media, 1",
                    "authors": [
                        "J. R. R. Tolkien"
                    ],
                    "publisher": "Grupo Planeta Spain",
                    "language": "es"
                },
                {
                    "bookId": "E8pnh7H5gMgC",
                    "title": "Cuentos desde el reino peligroso",
                    "authors": [
                        "J. R. R. Tolkien"
                    ],
                    "publisher": "Grupo Planeta Spain",
                    "language": "es"
                }
            ]
        }
        ```

5. Add a book to wishlist assigned.
    - WIN
        ```bash
        curl -X POST http://localhost:3000/api/wishlist/Lista%20001/books -H "Content-Type: application/json" -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTc2NDE3OX0.-y0KKusxTB3BdSVaQFjPJ-vKZLn8zbpwwFvORHjeOj8" -d "{\"bookId\":\"_LIfNCn06J8C\",\"title\":\"El Libro de los Cuentos Perdidos Historia de la Tierra Media, 1\",\"authors\":[\"J. R. R. Tolkien\"],\"publisher\":\"Grupo Planeta Spain\",\"language\":\"es\"}"
        ```
    - LINUX
        ```bash
        curl --location --request POST 'http://localhost:3000/api/wishlist/Lista 001/books' \
        --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTc2NDE3OX0.-y0KKusxTB3BdSVaQFjPJ-vKZLn8zbpwwFvORHjeOj8' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "bookId": "_LIfNCn06J8C",
            "title": "El Libro de los Cuentos Perdidos Historia de la Tierra Media, 1",
            "authors": [
                "J. R. R. Tolkien"
            ],
            "publisher": "Grupo Planeta Spain",
            "language": "es"
        }'       
        ```
    - Response (book added)
        ```bash
        {
            "_id":"6142bfd114bbe4f8f754e4fb",
            "user":"eder",
            "name":"Lista 001",
            "books": [
                {
                    "bookId":"_LIfNCn06J8C",
                    "title":"El Libro de los Cuentos Perdidos Historia de la Tierra Media, 1",
                    "authors": [
                        "J. R. R. Tolkien"
                    ],
                    "publisher":"Grupo Planeta Spain",
                    "language":"es"
                }
            ],
            "__v":1
        }
        ```

6. To retrieve all wishlist created by user.
    - WIN
        ```bash
        curl http://localhost:3000/api/wishlist -H "Content-Type: application/json" -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTc2NDE3OX0.-y0KKusxTB3BdSVaQFjPJ-vKZLn8zbpwwFvORHjeOj8"
        ```
    - LINUX
        ```bash
        curl --location --request GET 'http://localhost:3000/api/wishlist' \
        --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTc2NDE3OX0.-y0KKusxTB3BdSVaQFjPJ-vKZLn8zbpwwFvORHjeOj8' \
        --data-raw ''
        ```
    - Response (list of wishlist)
        ```bash
        [
            {
                "_id": "6142bc3c48a2b3a8174152d7",
                "user": "eder",
                "name": "Lista 001",
                "__v": 1
            }
        ]
        ```

7. To retrieve a wishlist and its books created by user.
    - WIN
        ```bash
        curl http://localhost:3000/api/wishlist/Lista%20001 -H "Content-Type: application/json" -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTc2NDE3OX0.-y0KKusxTB3BdSVaQFjPJ-vKZLn8zbpwwFvORHjeOj8"
        ```
    - LINUX
        ```bash
        curl --location --request GET 'http://localhost:3000/api/wishlist/Lista 001' \
        --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTc2NDE3OX0.-y0KKusxTB3BdSVaQFjPJ-vKZLn8zbpwwFvORHjeOj8' \
        --data-raw ''
        ```
    - Response (wishlist and books)
        ```bash
        {
            "_id":"6142bfd114bbe4f8f754e4fb",
            "user":"eder",
            "name":"Lista 001",
            "books":[
                {
                    "bookId":"_LIfNCn06J8C",
                    "title":"El Libro de los Cuentos Perdidos Historia de la Tierra Media, 1",
                    "authors":[
                        "J. R. R. Tolkien"
                    ],
                    "publisher":"Grupo Planeta Spain",
                    "language":"es"
                }
            ],
            "__v":1
        }
        ```

8. Delete a book from wishlist.
    - WIN
        ```bash
        curl -X DELETE http://localhost:3000/api/wishlist/Lista%20001/books/_LIfNCn06J8C -H "Content-Type: application/json" -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTc2NDE3OX0.-y0KKusxTB3BdSVaQFjPJ-vKZLn8zbpwwFvORHjeOj8"
        ```
    - LINUX
        ```bash
        curl --location --request DELETE 'http://localhost:3000/api/wishlist/Lista 001/books/_LIfNCn06J8C' \
        --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTc2NDE3OX0.-y0KKusxTB3BdSVaQFjPJ-vKZLn8zbpwwFvORHjeOj8' \
        --header 'Content-Type: application/json' \
        --data-raw ''
        ```
    - Response (book deleted)
        ```bash
        {
            _id: new ObjectId("6142bfd114bbe4f8f754e4fb"),
            user: 'eder',
            name: 'Lista 001',
            books: [],
            __v: 1
        }
        ```

9. Delete a wishlist.
    - WIN
        ```bash
        curl -X DELETE http://localhost:3000/api/wishlist/Lista%20001 -H "Content-Type: application/json" -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTc2NDE3OX0.-y0KKusxTB3BdSVaQFjPJ-vKZLn8zbpwwFvORHjeOj8"
        ```
    - LINUX
        ```bash
        curl --location --request DELETE 'http://localhost:3000/api/wishlist/Lista 001' \
        --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTc2NDE3OX0.-y0KKusxTB3BdSVaQFjPJ-vKZLn8zbpwwFvORHjeOj8' \
        --data-raw ''
        ```
    - Response (wishlist deleted)
        ```bash
        {
            "_id":"6142bfd114bbe4f8f754e4fb",
            "user":"eder",
            "name":"Lista 001",
            "books":[],
            "__v":1
        }
        ```
