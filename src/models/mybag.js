const pool = require('../configs/db')

const getDataBag = () => {
    return pool.query(`SELECT mybag.*, products.name, products.brand, products.price, contact.recipients_name, contact.address, contact.zip, contact.city_subditrict, contact`);
}

const insertDataBag = (data) => {
    const { id_user, id_product, qty, total } = data
    return pool.query(`INSERT INTO mybag(id_user, id_product, qty, total)VALUES('${id_user}', ${id_product}, ${qty}, ${total})`)
}

module.exports = {
    getDataBag,
    insertDataBag
}