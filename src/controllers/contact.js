const modelContact = require('../models/contact')
const { response } = require('../helpers/common')

exports.getContact = async(req,res) => {
    try {
        const {rows} = await modelContact.get()
        response(res, rows, 'suucess', 200, 'get data contact success')
    } catch (error) {
        console.log(error);
    }
}

exports.getContactById = async(req,res) => {
    const id = req.params.id
    try {
        const {rows} = await modelContact.getById(id)
        response(res, rows, 'suucess', 200, 'get data contact success')
    } catch (error) {
        console.log(error);
    }
}

exports.insertContact = async(req,res) => {
    const { id_user, address, zip, city, recipient_name, recipient_phone } = req.body
    const data = { id_user, address, zip, city, recipient_name, recipient_phone }
    try {
        const {rows} = await modelContact.insert(data)
        response(res, rows, 'suucess', 200, 'get data contact success')
    } catch (error) {
        console.log(error);
    }
}