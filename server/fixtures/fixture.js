
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
        await User.create({
            username: "john.doe@gmail.com",
            password: "test",
            firstname:"John",
            lastname:"Doe",
            role: "admin"
        });
        // CREATE MERCHANT
        await Merchant.create({
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
            UserId: 1
        });
        // FOREIGN KEYS MERCHANT
        await Address.create({
            fullName: "Marcel Patoulachi",
            address: "place de la tour Eiffel",
            town: "Paris",
            zip: "75001",
            country: "France",
            MerchantId:1   
        })
        // CREATE TRANSACTION
        await Address.create({
            fullName: "Thomas Corio",
            address: "100 AVE FRANCOIS MITTERRAND",
            town: "ATHIS MONS",
            zip: "91200",
            country: "France",
            MerchantId:1  
        })
        await Address.create({
            fullName: "Thomas Corio",
            address: "100 AVE FRANCOIS MITTERRAND",
            town: "ATHIS MONS",
            zip: "91200",
            country: "France",
            MerchantId:1  
        })
        await Transaction.create({
            customerId: 2,
            tag: "orderId: 12341234",
            orderId: "3",
            cart: {
                "Thé": 2,
                "Café": 3
            },
            amount: 200,
            status:"created",
            billingId: 2,
            shippingId:3,
            MerchantId:1
        })
        // CREATE TRANSACTION
        await Address.create({
            fullName: "Lucas Lavander",
            address: "9 RUE DE LA CHEMINEE BLANCHE",
            town: "VERT LE PETIT",
            zip: "91710",
            country: "France",
            MerchantId:1    
        })
        await Address.create({
            fullName: "Lucas Lavander",
            address: "9 RUE DE LA CHEMINEE BLANCHE",
            town: "VERT LE PETIT",
            zip: "91710",
            country: "France",
            MerchantId:1  
        })
        await Transaction.create({
            customerId: 3,
            tag: "orderId: 12341234",
            orderId: "4",
            cart: {
                "Thé": 3,
                "Café": 3
            },
            amount: 250,
            status:"created",
            billingId: 4,
            shippingId:5,
            MerchantId:1
        })
    })
.then((result) => console.log("Fixtures done"))
.catch((error) => console.error("Error during fixture", error));