# Payment API


## Installation
```
cd server
npm install
```

__adminer__ will run on `localhost:8080`
__postgreSQL__ db will run on `localhost:5432`
__API__ will run on `localhost:3000`

## Start
```make start```

## Routes

### Login
`POST /login_check`
```
{
  username: 'johndoe',
  password: 'password123'
}
```

### Users
User model :
```
{
  id: 3,
  username: 'johndoe',
  password: 'password123',
  firstname: 'John',
  lastname: 'Doe',
  role: 'user',
  "createdAt": "2020-07-01 14:23:50.807+00",
  "updatedAt": "2020-07-01 14:23:50.807+00",
}
```

Get all users : `GET /users/`

Get a single user : `GET /users/:id`

Create a user : `POST /users/`

Example of data to send :
```
{
  "username": "fake@email.fake",
  "password": "test"
}
```

Update user : `PUT /users/:id`
Example of data to send :
```
{
  username: 'johndoe2',
  firstname: 'Marcel',
  lastname: 'Patulacci'
}
```

Delete user : `DELETE /users/:1`

### Merchant
Request result will vary over the user role, variations are detailed for each calls.
User role is retreived throught authentication.

Merchant model :
```
{
  "id": 2,
  "name": "marchant",
  "KBISUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "currency": "EUR",
  "confirmUrl": "http://localhost:3004/orders/confirmation",
  "cancelUrl": "http://localhost:3004/orders/cancel",
  "contactName": "Marcel Patulacci",
  "email": "fake@email.fake",
  "phoneNumber": "0100000000",
  "credit": 10000,
  "createdAt": "2020-07-01 14:23:50.807+00",
  "updatedAt": "2020-07-01 14:23:50.807+00",
  "address": {
    "id": 3,
    "fullName": "Marcel Patulacci",
    "address": "place de la tour Eiffel",
    "town": "Paris",
    "zip": "75001",
    "country": "France"
  }
}
```

Get all merchant : `GET /merchants`
if the user is admin, every merchant on the plateform will be returned. Else, only user's merchants will be returned.


Get a single merchant : `GET /merchants/:id`
Admin can get any merchant
User can only get merchant if he's the owner


Add a merchant : `POST /merchants`
```
{
  "name": "marchant",
  "KBISUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "currency": "EUR",
  "confirmUrl": "http://localhost:3004/orders/confirmation",
  "cancelUrl": "http://localhost:3004/orders/cancel",
  "contactName": "Marcel Patoulachi",
  "email": "fake@email.fake",
  "phoneNumber": "0100000000",
  "address": {
    "fullName": "Marcel Patoulachi",
    "address": "place de la tour Eiffel",
    "town": "Paris",
    "zip": "75001",
    "country": "France"
  }
}
```

Update a merchant : `PUT /merchants/:id`
Update possible only if admin or owner
```
{
  "name": "marchant2",
  "currency": "USD"
}
```

Get merchant transactions : `GET /merchants/:id/transactions`
Only admin and owner will have a result

### Transaction
Transaction model :
```
{
  "id":1,
  "customerId": "1", // Refer to the merchant customerId
  "tag": "orderId: 12341234", // Free metadata for merchant
  "createdAt": "2020-07-01 14:23:50.807+00",
  "updatedAt": "2020-07-01 14:23:50.807+00",
  "shippingId": 4, // Address foreign key
  "billingId": 4, // Address foreign key
  "cart": { // Free format json
    "patrick": 2,
    "michel": 3
  },
  "amount": 1050,
  "billing": {
    "fullName": "Marcel Patoulachi",
    "address": "place de la tour Eiffel",
    "town": "Paris",
    "zip": "75001",
    "country": "France"
  },
  "shipping": {
    "fullName": "Marcel Patoulachi",
    "address": "place de la tour Eiffel",
    "town": "Paris",
    "zip": "75001",
    "country": "France"
  },
  "merchantId": 1 // Address foreign key
}
```

Get all transactions : `GET /transactions/`

Get single transaction: `GET /transactions/:id`

Create transaction : `POST /transactions/`
```
{
  "customerId": "1",
  "tag": "orderId: 12341234",
  "cart": {
    "patrick": 2,
    "michel": 3
  },
  "amount": 1050,
  "billing": {
    "fullName": "Marcel Patoulachi",
    "address": "place de la tour Eiffel",
    "town": "Paris",
    "zip": "75001",
    "country": "France"
  },
  "shipping": {
    "fullName": "Marcel Patoulachi",
    "address": "place de la tour Eiffel",
    "town": "Paris",
    "zip": "75001",
    "country": "France"
  },
  "merchantId": 1
}
```

Refund transaction : `POST /transactions/:id/refund`
```
{
  "amount": 200
}
```
#### External endpoints for transactions
*Following endpoints shall only be used by PSP*
Confirm successful transaction : `PUT /transactions/:id/confirm`

*Following endpoints shall only be used by payment API (this one)*
Process transaction payment : `POST /transactions/:id/payment`
```
{
  "amount": 1050,
  "creditCardInfo": {
    "CCNumber": "12345",
    "CCOwner": "Marcel Patulacci"
    "expirationDate": "01/22",
    "secureCode": "123"
  }
}
```
Cancel transaction : `POST /transactions/:id/cancel/`
```
{
  "cancelUrl": "http://github.com" // Url to redirect user
}
```
### Dashboard
Get all KPI : GET /dashboard
averageTransaction :
```
{
  [ { _id: null, countAmount: 2, avgAmount: 625 } ]
}
```
countMerchant : 
```
 [ { _id: null, countMerchant: 1 } ]
```
averageTransactionByMerchant : 
```
[ { _id: 'marchant', countTransactionByMerchant: 2 } ]
```
averageAmountByMerchant : 
```
[ { _id: 'marchant', avgAmountByMerchant: 625 } ]
```


