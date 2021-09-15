# Books API by Oscar Eder Velázquez Pineda

REST Service to serve information about book wishlist and using API Google Book. 
This project requires __docker-compose__ to launch api and database (mongo).

- **Post Methods**
    - `signup`: To registry a new user.
    - `signin`: To login with user registed previously and return an access token.
    - `wishlist`: To create a new wishlist.
    - `books/{wishlist_name}`: Add a book to wishlist assigned.
- **Get Methods**
    - `search/{book_name}?author={author_name}`: To search a book. ___author___ parameter is optional
    - `wishlist`: To retrieve all wishlist created by user.
    - `wishlist/{wishlist-name}`: To retrieve a wishlist and its books created by user.
- **Delete Methods**
    - `wishlist/{wishlist-name}`: Delete a wishlist by user.
    - `books/{wishlist_name}`: Delete a book from wishlist by user.

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
            "username": "eder",
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
        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTY3ODg5MH0.zzrxnpTNTEtNOcxT3BzcC5DdF7ce96o0wkYczd8pwUA
        ```

3. To create a new wishlist.
    - WIN
        ```bash
        curl -X POST http://localhost:3000/api/wishlist -H "Content-Type: application/json" -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTY3MDgwN30.M7nuedPfaxtSt7zsWOeHV_1JN8YMsahDMsl97IsacEk" -d "{\"name\":\"Lista 003\"}"
        ```
    - LINUX
        ```bash
        curl --location --request POST 'http://localhost:3000/api/wishlist' \
        --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTY3MDgwN30.M7nuedPfaxtSt7zsWOeHV_1JN8YMsahDMsl97IsacEk' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "name": "Lista 003"
        }'
        ```
    - Response (new wishlist)
        ```bash
        {
            "user":"eder",
            "name":"Lista 003",
            "books":[],
            "_id":"6141768420816c9bb8a1e7de",
            "__v":0
        }
        ```

4. To search a book. Parameter author is optional
    - WIN
        ```bash
        curl http://localhost:3000/api/search/Silmarillion?author=Tolkien -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTY3MDgwN30.M7nuedPfaxtSt7zsWOeHV_1JN8YMsahDMsl97IsacEk"
        ```
    - LINUX
        ```bash
        curl --location --request GET 'http://localhost:3000/api/search/Silmarillion?author=Tolkien' \
        --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTY3MDgwN30.M7nuedPfaxtSt7zsWOeHV_1JN8YMsahDMsl97IsacEk' \
        --data-raw ''
        ```
    - Response (books found)
        ```bash
        {
            "items": [
                {
                    "bookId":"P8ZXcgAACAAJ",
                    "title":"El Silmarillion",
                    "authors": [
                        "J. R. R. Tolkien"
                    ]
                },
                {
                    "bookId":"iYAQjwEACAAJ",
                    "title":"El silmarillion",
                    "authors": [
                        "John Ronald Reuel Tolkien"
                    ]
                },
                {
                    "bookId":"bVP2CwAAQBAJ",
                    "title":"La historia de Kullervo",
                    "authors": [
                        "J. R. R. Tolkien"
                    ]
                }
            ]
        }
        ```

5. Add a book to wishlist assigned.
    - WIN
        ```bash
        curl -X POST http://localhost:3000/api/books/Lista%20003 -H "Content-Type: application/json" -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTY3MDgwN30.M7nuedPfaxtSt7zsWOeHV_1JN8YMsahDMsl97IsacEk" -d "{\"bookId\":\"112122\",\"title\":\"El Silmarrllion\",\"authors\":[\"J. R. R. Tolkien\"]}"
        ```
    - LINUX
        ```bash
        curl --location --request POST 'http://localhost:3000/api/books/Lista 003' \
        --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTY3MDgwN30.M7nuedPfaxtSt7zsWOeHV_1JN8YMsahDMsl97IsacEk' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "bookId": "112122",
            "title": "El Silmarrllion",
            "authors": [
                "J. R. R. Tolkien"
            ]
        }'        
        ```
    - Response (book added)
        ```bash
        {
            "_id":"6141768420816c9bb8a1e7de",
            "user":"eder",
            "name":"Lista 003",
            "books":[
                {
                    "bookId":"112122",
                    "title":"El Silmarrllion",
                    "authors":[
                        "J. R. R. Tolkien"
                    ]
                }
            ],
            "__v":1
        }
        ```

6. To retrieve all wishlist created by user.
    - WIN
        ```bash
        curl http://localhost:3000/api/wishlist -H "Content-Type: application/json" -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTY3MDgwN30.M7nuedPfaxtSt7zsWOeHV_1JN8YMsahDMsl97IsacEk"
        ```
    - LINUX
        ```bash
        curl --location --request GET 'http://localhost:3000/api/wishlist' \
        --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTY3MDgwN30.M7nuedPfaxtSt7zsWOeHV_1JN8YMsahDMsl97IsacEk' \
        --data-raw ''
        ```
    - Response (list of wishlist)
        ```bash
        [
            {
                "_id": "6141332106304f7ef0157ff2",
                "user": "eder",
                "name": "Lista 001",
                "__v": 2
            },
            {
                "_id": "6141333206304f7ef0157ff6",
                "user": "eder",
                "name": "Lista 002",
                "__v": 0
            },
            {
                "_id": "6141768420816c9bb8a1e7de",
                "user": "eder",
                "name": "Lista 003",
                "__v": 1
            }
        ]
        ```

7. To retrieve a wishlist and its books created by user.
    - WIN
        ```bash
        curl http://localhost:3000/api/wishlist/Lista%20003 -H "Content-Type: application/json" -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTY3MDgwN30.M7nuedPfaxtSt7zsWOeHV_1JN8YMsahDMsl97IsacEk"
        ```
    - LINUX
        ```bash
        curl --location --request GET 'http://localhost:3000/api/wishlist/Lista 003' \
        --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTY3MDgwN30.M7nuedPfaxtSt7zsWOeHV_1JN8YMsahDMsl97IsacEk' \
        --data-raw ''
        ```
    - Response (wishlist and books)
        ```bash
        {
            "_id": "6141768420816c9bb8a1e7de",
            "user": "eder",
            "name": "Lista 003",
            "books": [
                {
                    "bookId": "112122",
                    "title": "El Silmarrllion",
                    "authors": [
                        "J. R. R. Tolkien"
                    ]
                }
            ],
            "__v": 1
        }
        ```

8. Delete a book from wishlist.
    - WIN
        ```bash
        curl -X DELETE http://localhost:3000/api/books/Lista%20003 -H "Content-Type: application/json" -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTY3MDgwN30.M7nuedPfaxtSt7zsWOeHV_1JN8YMsahDMsl97IsacEk" -d "{\"bookId\":\"112122\"}"
        ```
    - LINUX
        ```bash
        curl --location --request DELETE 'http://localhost:3000/api/books/Lista 003' \
        --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTY3MDgwN30.M7nuedPfaxtSt7zsWOeHV_1JN8YMsahDMsl97IsacEk' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "bookId": "112122"
        }'
        ```
    - Response (book deleted)
        ```bash
        {
            "_id":"6141768420816c9bb8a1e7de",
            "user":"eder",
            "name":"Lista 003",
            "books":[],
            "__v":1
        }
        ```

9. Delete a wishlist.
    - WIN
        ```bash
        curl -X DELETE http://localhost:3000/api/wishlist/Lista%20003 -H "Content-Type: application/json" -H "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTY3MDgwN30.M7nuedPfaxtSt7zsWOeHV_1JN8YMsahDMsl97IsacEk"
        ```
    - LINUX
        ```bash
        curl --location --request GET 'http://localhost:3000/api/wishlist' \
        --header 'x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZWRlciIsImlhdCI6MTYzMTY3MDgwN30.M7nuedPfaxtSt7zsWOeHV_1JN8YMsahDMsl97IsacEk' \
        --data-raw ''
        ```
    - Response (wishlist deleted)
        ```bash
        {
            "_id":"6141768420816c9bb8a1e7de",
            "user":"eder",
            "name":"Lista 003",
            "books":[],
            "__v":1
        }
        ```
