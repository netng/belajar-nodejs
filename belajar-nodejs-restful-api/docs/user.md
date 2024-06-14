# User Spec API

## Register User API

Endpoint : POST /api/users

Request Body :
```json
{
    "username": "nandang",
    "password": "rahasia",
    "name": "nandang keren"
}
```

Response Body Success :

```json
{
    "data": {
        "username": "nandang",
        "name": "nandang keren"
    }
}
```

Response Body Error :

```json
{
    "errors": "Username already registered"
}
```


## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
    "username": "nandang",
    "password": "rahasia"
}
```

Request Body Success :

```json
{
    "data": {
        "token": "unique-token"
    }
}
```

Request Body Failed :

```json
{
    "errors": "Username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Request Header :
- Authorization : token

Request Body :

```json
{
    "name": "nandang updated", //optional
    "password": "new password" //optional
}
```

Response Body Success :

```json
{
    "data": {
        "username": "nandang",
        "name": "nandang updated"    
    }
}
```

Response Body Error :

```json
{
    "errors": "Name length max 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Request Header :
- Authorization : token

Response Body Success :

```json
{
    "data": {
        "username": "nandang",
        "name": "nandang keren"
    }
}
```

Response Body Error :

```json
{
    "errors": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Request Header :
- Authorization : token

Response Body Success :

```json
{
    "data": "OK"
}
```

Response Body Error :

```json
{
    "errors": "Unauthorized"
}
```