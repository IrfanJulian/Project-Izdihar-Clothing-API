const bagModel = require('../models/mybag')
const { response } = require('../helpers/common')

exports.getBag = async (req,res) => {
    const {rows} = await bagModel.getDataBag()
    response(res, rows, 'sucess', 200, 'get data bag success')
}

exports.insertBag = async (req,res) => {
    const { id_user, id_product, qty, total } = req.body
    const data = { id_user, id_product, qty, total }
    try {
        const { rows } = await bagModel.insertDataBag(data);
        response(res, rows, 'sucess', 200, 'insert data sucess');
    } catch (error) {
        response(res, null, 'failed', 400, 'insert data failed' );
    }
}