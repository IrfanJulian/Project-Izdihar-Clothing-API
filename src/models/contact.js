const pool = require('../configs/db')

const get = () => {
    return pool.query(`SELECT * FROM contact`)
}

const getById = (id) => {
    return pool.query(`SELECT * FROM contact WHERE id = ${id}`)
}

const insert = (data) => {
    const { id_user, address, zip, city, recipient_name, recipient_phone } = data
    return pool.query(`INSERT INTO contact(id_user, address, zip, city, recipient_name, recipient_phone)VALUES('${id_user}', '${address}', '${zip}', '${city}', '${recipient_name}', '${recipient_phone}')`)
}

module.exports = {
    get,
    getById,
    insert
}