const pool = require('../configs/db')

const getDataBag = (id) => {
    return pool.query(`SELECT bag.id, bag.qty, bag.total_price, product.name, product.price, product.brand, product.photo FROM bag RIGHT JOIN product ON product.id = bag.id_product WHERE bag.id_user = '${id}'`);
}

const findbyId = (id) => {
    return pool.query(`SELECT * FROM bag WHERE id = ${id}`)
}

const insertDataBag = (data) => {
    const { id_user, id_product, qty, total_price } = data
    return pool.query(`INSERT INTO bag(id_user, id_product, qty, total_price)VALUES('${id_user}', ${id_product}, ${qty}, ${total_price})`)
}

const deleteData = (id) =>{
    return pool.query(`DELETE FROM bag WHERE id='${id}'`)
}

module.exports = {
    getDataBag,
    insertDataBag,
    deleteData,
    findbyId
}