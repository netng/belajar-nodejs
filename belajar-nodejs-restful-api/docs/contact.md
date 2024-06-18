# Contact API Spec

## Create Contact API

Endpoint : POST /api/contacts

Headers :
- Authorization : token

Request Body :

```json
{
    "first_name" : "Nandang",
    "last_name" : "Sopyan",
    "email" : "nandang@gmail.com",
    "phone" : "123456789"
}
```

Response Body Success :
```json
{
    "data" :
        {
            "id": 1,
            "first_name" : "Nandang",
            "last_name" : "Sopyan",
            "email" : "nandang@gmail.com",
            "phone" : "123456789"
        }
}
```

Response Body Error :

```json
    {
        "errors" : "Email is not valid format"
    }
```

## Update Contact API

Endpoint : PUT /api/contacts/:id

Headers :
- Authorization : token

Request Body :

```json
{
    "first_name" : "Nandang",
    "last_name" : "Sopyan",
    "email" : "nandang@gmail.com",
    "phone" : "123456789"
}
```

Response Body Success :

```json
{
    "data" :
        {
            "id": 1,
            "first_name" : "Nandang",
            "last_name" : "Sopyan",
            "email" : "nandang@gmail.com",
            "phone" : "123456789"
        }
}
```

Response Body Error :

```json
    {
        "errors" : "Email is not valid format"
    }
```

## Get Contact API

Endpoint : GET /api/contacts/:id

Headers :
- Authorization : token

Response Body Success :

```json
{
    "data" :
        {
            "id": 1,
            "first_name" : "Nandang",
            "last_name" : "Sopyan",
            "email" : "nandang@gmail.com",
            "phone" : "123456789"
        }
}
```

Response Body Error :

```json
{
    "errors" : "contact is not found"
}
```

## Search Contact API

Endpoint : GET /api/contacts

Headers :
- Authorization : token

Query params :
- name : Search by first_name or last_name using Like, optional
- email : Search by email using Like, optional
- phone : Search by phone using Like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
    "data" : [
        {
            "id": 1,
            "first_name" : "Nandang",
            "last_name" : "Sopyan",
            "email" : "nandang@gmail.com",
            "phone" : "123456789"
        },
        {
            "id": 2,
            "first_name" : "Nandang",
            "last_name" : "Sopyan",
            "email" : "nandang@gmail.com",
            "phone" : "123456789"
        },
        {
            "id": 3,
            "first_name" : "Nandang",
            "last_name" : "Sopyan",
            "email" : "nandang@gmail.com",
            "phone" : "123456789"
        },
    ],
    "paging" : {
        "page" : 1,
        "page_size" : 10,
        "total_page" : 3,
        "total_item" : 30
    }
}
```

Response Body Error :



## Remove Contact API

Enpoint : DELETE /api/contacts/:id

Headers :
- Authorization : token

Request Body :

Response Body Success :

```json
{
    "data": "OK"
}
```

Response Body Error :

```json
{
    "errors" : "contact is not found"
}
```