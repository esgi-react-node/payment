
const mongo = require("../lib/db");
const sequelize = require("../lib/sequelize");
const Rate = require('../models/sequelize/Rate');
const Merchant = require('../models/sequelize/Merchant');
const Transaction = require('../models/sequelize/Transaction');
const User = require('../models/sequelize/User');
const Operation = require("../models/sequelize/Operation");
const Address = require('../models/sequelize/Address');
const MongoMerchant = require('../models/mongoose/Merchant');
const MongoOperation = require('../models/mongoose/Operation');
const MongoTransaction = require('../models/mongoose/Transaction');

sequelize
  .sync({ force: true})
  .then(
    async () => {
        //DELETE MONGOOSE MODELS
        await MongoMerchant.remove();
        await MongoOperation.remove();
        await MongoTransaction.remove();
       
        //CREATE USER
        let user = await User.create({
            username: "john.doe@gmail.com",
            password: "test",
            firstname:"John",
            lastname:"Doe",
            role: "admin"
        });
        // CREATE MERCHANT
        let merchant = await Merchant.create({
            name: "John Insdustry",
            KBISUrl: "451 962 587 00010",
            currency: "EUR",
            confirmUrl: "http://merchant-api:3000/orders/confirm",
            cancelUrl: "http://merchant-api:3000/orders/cancel",
            contactName: "John Doe",
            email: "john@gmail.com",
            phoneNumber: "0652130101",
            status:"pending",
            credit:0,
            UserId: user.id
        });
        // FOREIGN KEYS MERCHANT
        await Address.create({
            fullName: "Marcel Patoulachi",
            address: "place de la tour Eiffel",
            town: "Paris",
            zip: "75001",
            country: "France",
            MerchantId:merchant.id   
        })
        // CREATE TRANSACTION
        let AddressBillingUser = await Address.create({
            fullName: "Thomas Corio",
            address: "100 AVE FRANCOIS MITTERRAND",
            town: "ATHIS MONS",
            zip: "91200",
            country: "France",
            MerchantId:merchant.id
        })
        let AddressShippingUser = await Address.create({
            fullName: "Thomas Corio",
            address: "100 AVE FRANCOIS MITTERRAND",
            town: "ATHIS MONS",
            zip: "91200",
            country: "France",
            MerchantId: merchant.id
        })
        await Transaction.create({
            customerId: 2,
            tag: "orderId: 12341234",
            orderId: "3",
            cart: [
                {
                  "id": "1",
                  "label": "Macbook Pro 16 pouces",
                  "price": 270000,
                  "quantity": 2
                },
                {
                  "id": "2",
                  "label": "Macbook Pro 13 pouces",
                  "price": 230000,
                  "quantity": 4
                }
              ],
            amount: 200,
            status:"created",
            billingId: AddressBillingUser.id,
            shippingId:AddressShippingUser.id,
            MerchantId:merchant.id
        })
        // CREATE TRANSACTION
        AddressBillingUser = await Address.create({
            fullName: "Lucas Lavander",
            address: "9 RUE DE LA CHEMINEE BLANCHE",
            town: "VERT LE PETIT",
            zip: "91710",
            country: "France",
            MerchantId:merchant.id    
        })
        AddressShippingUser = await Address.create({
            fullName: "Lucas Lavander",
            address: "9 RUE DE LA CHEMINEE BLANCHE",
            town: "VERT LE PETIT",
            zip: "91710",
            country: "France",
            MerchantId:merchant.id 
        })
        await Transaction.create({
            customerId: 3,
            tag: "orderId: 12341234",
            orderId: "4",
            cart: [
                {
                  "id": "1",
                  "label": "Macbook Pro 16 pouces",
                  "price": 270000,
                  "quantity": 2
                },
                {
                  "id": "2",
                  "label": "Macbook Pro 13 pouces",
                  "price": 230000,
                  "quantity": 4
                }
              ],
            amount: 250,
            status:"created",
            billingId: AddressBillingUser.id,
            shippingId:AddressShippingUser.id,
            MerchantId:merchant.id
        })
        // FOREIGN KEYS MERCHANT
        await Address.create({
            fullName: "Marcel Patoulachi",
            address: "place de la tour Eiffel",
            town: "Paris",
            zip: "75001",
            country: "France",
            MerchantId:merchant.id   
        })

        //CREATE USER
        user = await User.create({
            username: "a.nairi@test.com",
            password: "test",
            firstname:"Amin",
            lastname:"Nairi",
            role: "user"
        });
        // CREATE MERCHANT
        merchant = await Merchant.create({
            name: "Doe Industry",
            KBISUrl: "451 962 587 00010",
            currency: "EUR",
            confirmUrl: "http://merchant-api:3000/orders/confirm",
            cancelUrl: "http://merchant-api:3000/orders/cancel",
            contactName: "Doe",
            email: "Doe@test.com",
            phoneNumber: "0652130101",
            status:"pending",
            credit:0,
            UserId: user.id
        });
        // FOREIGN KEYS MERCHANT
        await Address.create({
            fullName: "Doe",
            address: "place de la tour Eiffel",
            town: "Paris",
            zip: "75001",
            country: "France",
            MerchantId:merchant.id   
        })
        // CREATE TRANSACTION
        AddressBillingUser = await Address.create({
            fullName: "Doe",
            address: "404 PLACE VANDOME",
            town: "PARIS",
            zip: "75008",
            country: "France",
            MerchantId:merchant.id
        })
        AddressShippingUser = await Address.create({
            fullName: "Doe",
            address: "404 PLACE VANDOME",
            town: "PARIS",
            zip: "75008",
            country: "France",
            MerchantId:merchant.id
        })
        await Transaction.create({
            customerId: 13,
            tag: "orderId: 12341234",
            orderId: "6",
            cart: [
                {
                  "id": "1",
                  "label": "Coca",
                  "price": 270,
                  "quantity": 2
                },
                {
                  "id": "2",
                  "label": "Panacota",
                  "price": 4000,
                  "quantity": 4
                }
              ],
            amount: 4270,
            status:"created",
            billingId: AddressBillingUser.id,
            shippingId:AddressShippingUser.id,
            MerchantId:merchant.id
        })
        await Transaction.create({
            customerId: 13,
            tag: "orderId: 12341234",
            orderId: "5",
            cart: [
                {
                  "id": "1",
                  "label": "Coca",
                  "price": 470,
                  "quantity": 6
                },
                {
                  "id": "2",
                  "label": "Panacota",
                  "price": 4000,
                  "quantity": 10
                }
              ],
            amount: 4470,
            status:"created",
            billingId: AddressBillingUser.id,
            shippingId:AddressShippingUser.id,
            MerchantId:merchant.id
        })
        await Transaction.create({
            customerId: 13,
            tag: "orderId: 12341234",
            orderId: "3",
            cart: [
                {
                  "id": "1",
                  "label": "Coca",
                  "price": 470,
                  "quantity": 6
                }
              ],
            amount: 470,
            status:"created",
            billingId: AddressBillingUser.id,
            shippingId:AddressShippingUser.id,
            MerchantId:merchant.id
        })
        //CREATE USER
        user = await User.create({
            username: "q.hermiteau@test.com",
            password: "test",
            firstname:"Quentin",
            lastname:"Hermiteau",
            role: "user"
        });
        // CREATE MERCHANT
        merchant = await Merchant.create({
            name: "HERMITEAU INDUSTRY",
            KBISUrl: "451 962 587 00010",
            currency: "EUR",
            confirmUrl: "http://merchant-api:3000/orders/confirm",
            cancelUrl: "http://merchant-api:3000/orders/cancel",
            contactName: "HERMITEAU",
            email: "hermiteau@test.com",
            phoneNumber: "0652130101",
            status:"pending",
            credit:0,
            UserId: user.id
        });
        // CREATE TRANSACTION
        AddressBillingUser = await Address.create({
            fullName: "Doe",
            address: "404 PLACE VANDOME",
            town: "PARIS",
            zip: "75008",
            country: "France",
            MerchantId:merchant.id
        })
        AddressShippingUser = await Address.create({
            fullName: "Doe",
            address: "404 PLACE VANDOME",
            town: "PARIS",
            zip: "75008",
            country: "France",
            MerchantId:merchant.id
        })
        await Transaction.create({
            customerId: "14",
            tag: "orderId: 12341234",
            orderId: "6",
            cart: [
                {
                  "id": "1",
                  "label": "Panacota",
                  "price": 5000,
                  "quantity": 5
                },
                {
                  "id": "2",
                  "label": "Pâte",
                  "price": 4000,
                  "quantity": 4
                }
              ],
            amount: 9000,
            status:"created",
            billingId: AddressBillingUser.id,
            shippingId:AddressShippingUser.id,
            MerchantId:merchant.id
        })
        await Transaction.create({
            customerId: "14",
            tag: "orderId: 12341234",
            orderId: "6",
            cart: [
                {
                  "id": "1",
                  "label": "Coca",
                  "price": 320,
                  "quantity": 3
                }
              ],
            amount: 320,
            status:"created",
            billingId: AddressBillingUser.id,
            shippingId:AddressShippingUser.id,
            MerchantId:merchant.id
        })
        //CREATE USER
        user = await User.create({
            username: "a.oussaidi@test.com",
            password: "test",
            firstname:"Alicia",
            lastname:"Oussaidi",
            role: "user"
        });
        // CREATE MERCHANT
        merchant = await Merchant.create({
            name: "OUSSAIDI INDUSTRY",
            KBISUrl: "451 962 587 00010",
            currency: "EUR",
            confirmUrl: "http://merchant-api:3000/orders/confirm",
            cancelUrl: "http://merchant-api:3000/orders/cancel",
            contactName: "OUSSAIDI",
            email: "oussaidi@test.com",
            phoneNumber: "0652130101",
            status:"pending",
            credit:0,
            UserId: user.id
        });
        // CREATE TRANSACTION
        AddressBillingUser = await Address.create({
            fullName: "John",
            address: "AVE JULE QUENTIN",
            town: "NANTERRE",
            zip: "92000",
            country: "France",
            MerchantId:merchant.id
        })
        AddressShippingUser = await Address.create({
            fullName: "John",
            address: "AVE JULE QUENTIN",
            town: "NANTERRE",
            zip: "92000",
            country: "France",
            MerchantId:merchant.id
        })
        await Transaction.create({
            customerId: "15",
            tag: "orderId: 12341234",
            orderId: "7",
            cart: [
                {
                  "id": "1",
                  "label": "Pâte",
                  "price": 4000,
                  "quantity": 40
                },
                {
                  "id": "2",
                  "label": "Panacota",
                  "price": 40000,
                  "quantity": 100
                }
              ],
            amount: 44000,
            status:"created",
            billingId: AddressBillingUser.id,
            shippingId:AddressShippingUser.id,
            MerchantId:merchant.id
        })
        await Transaction.create({
            customerId: "15",
            tag: "orderId: 12341234",
            orderId: "7",
            cart: [
                {
                  "id": "1",
                  "label": "Coca",
                  "price": 3000,
                  "quantity": 30
                }
              ],
            amount: 3000,
            status:"created",
            billingId: AddressBillingUser.id,
            shippingId:AddressShippingUser.id,
            MerchantId:merchant.id
        })
    })
.then((result) => console.log("Fixtures done"))
.catch((error) => console.error("Error during fixture", error));