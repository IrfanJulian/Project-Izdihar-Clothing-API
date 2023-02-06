const pool = require('../configs/db')

const historyCheckout = (id) => {
    return pool.query(`SELECT checkout.*, product.name, product.price, product.brand, product.photo FROM checkout INNER JOIN product ON product.id = checkout.id_product WHERE checkout.id_user = '${id}'`)
}

// const orderCustomer = (id) => {
//     return pool.query(`SELECT checkout.*, product.name, product.price, product.photo, product.brand, users.recipient_name, users.address, users.zip, users.city FROM checkout INNER JOIN product ON product.id = checkout.id_product INNER JOIN users ON users.id = checkout.id_user WHERE checkout.id_user = '${id}'`)
// }

const myOrder = (id) => {
    return pool.query(`SELECT checkout.*, product.name AS product_name, product.photo, product.brand, product.price, product.stock, users.name, users.address, users.zip, users.city, users.phone_number, transaction.total_price FROM checkout INNER JOIN product ON product.id = checkout.id_product INNER JOIN users ON users.id = checkout.id_user INNER JOIN transaction ON transaction.id = checkout.id_transaction WHERE checkout.id_seller = '${id}'`)
}

const processOrder = (id, data) => {
    const {status} = data
    return pool.query(`UPDATE checkout SET status = '${status}' WHERE id = ${id}`)
}

const confirmOrder = (id, status) => {
    return pool.query(`UPDATE checkout SET status = '${status}' WHERE id = ${id}`)
}

const postCheckout = (data) => {
    const { id_transaction, status, id_seller, id_user, id_product } = data
    return pool.query(`INSERT INTO checkout(id_transaction, status, id_seller, id_user, id_product)VALUES(${id_transaction}, '${status}', '${id_seller}', '${id_user}', ${id_product})`)
}

module.exports = {
    historyCheckout,
    postCheckout,
    myOrder,
    confirmOrder,
    processOrder
}