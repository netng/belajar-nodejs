# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contact_id/addresses

Headers :
- Authorization : token

Request Body :

```json
{
    "street" : "nama jalan",
    "city" : "nama kota",
    "province" : "nama provinsi",
    "country" : "nama negara",
    "postal_code" : "kode pos"
}
```

Response Body Success :
```json
{
    "data" : {
        "id" : 1,
        "street" : "nama jalan",
        "city" : "nama kota",
        "province" : "nama provinsi",
        "country" : "nama negara",
        "postal_code" : "kode pos"
    }
}
```

Response Body Error :

```json
    {
        "errors" : "city is required"
    }
```

## Update Address API

Endpoint : PUT /api/contacts/:contact_id/addresses/:address_id

Headers :
- Authorization : token

Request Body :

```json
{
    "street" : "nama jalan",
    "city" : "nama kota",
    "province" : "nama provinsi",
    "country" : "nama negara",
    "postal_code" : "kode pos"
}
```

Response Body Success :

```json
{
    "data" :
        {
            "id" : 1,
            "street" : "nama jalan",
            "city" : "nama kota",
            "province" : "nama provinsi",
            "country" : "nama negara",
            "postal_code" : "kode pos"
        }
}
```

Response Body Error :

```json
    {
        "errors" : "city is required"
    }
```

## Get Addresses API

Endpoint : GET /api/contact/:contact_id/addresses

Headers :
- Authorization : token

Response Body Success :

```json
{
    "data" : [
        {
            "id" : 1,
            "street" : "nama jalan",
            "city" : "nama kota",
            "province" : "nama provinsi",
            "country" : "nama negara",
            "postal_code" : "kode pos"
        },
        {
            "id" : 1,
            "street" : "nama jalan",
            "city" : "nama kota",
            "province" : "nama provinsi",
            "country" : "nama negara",
            "postal_code" : "kode pos"
        }
    ]
        
}
```

Response Body Error :

```json
{
    "errors" : "address is not found"
}
```

## Remove Address API

Enpoint : DELETE /api/contacts/:contact_id/addresses/:address_id

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
    "errors" : "address is not found"
}
```