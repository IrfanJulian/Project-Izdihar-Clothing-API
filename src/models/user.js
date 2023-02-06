const pool = require('../configs/db')

const getData = () =>{
    return pool.query(`SELECT * FROM users`)
}

const findByEmail = (email) =>{
    return pool.query(`SELECT * FROM users WHERE email='${email}'`)
}

const getDataById = (id) => {
    return pool.query(`SELECT * FROM users WHERE id='${id}'`)
}

const insertData = (data) =>{
    const { id, name, email, password, phone_number, otp} = data
    return pool.query(`INSERT INTO users(id, name, email, password, phone_number, role, otp)VALUES('${id}', '${name}', '${email}', '${password}', '${phone_number}', 'user', '${otp}')`)
}

const verify = (data) => {
    const { email, otp } = data
    return pool.query(`UPDATE users SET status_activation = 'actived', otp = '${otp}' WHERE email = '${email}'`)
}

const updateData = (id, data) =>{
    const { name, email, birth, phone_number, photo, store_description, store_name } = data
    return pool.query(`UPDATE users SET name='${name}', email='${email}', birth='${birth}', phone_number='${phone_number}', photo='${photo}', store_description='${store_description}', store_name='${store_name}' WHERE id='${id}'`)
}

const updateContact = (id, data) =>{
    const { address, zip, city, recipient_name, recipient_phone } = data
    return pool.query(`UPDATE users SET address='${address}', zip='${zip}', city='${city}', recipient_name='${recipient_name}', recipient_phone='${recipient_phone}'`)
}

const deleteData = (id) =>{
    return pool.query(`DELETE FROM users WHERE id='${id}'`)
}

module.exports = {
    getData,
    insertData,
    updateData,
    verify,
    updateContact,
    deleteData,
    findByEmail,
    getDataById
}