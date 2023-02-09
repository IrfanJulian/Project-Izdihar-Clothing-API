const bagModel = require('../models/mybag')
const { response } = require('../helpers/common')

exports.getBag = async (req,res) => {
    const id = req.params.id
    const {rows} = await bagModel.getDataBag(id)
    response(res, rows, 'sucess', 200, 'get data bag success')
}

exports.insertBag = async (req,res) => {
    const { id_user, id_product, qty, total_price } = req.body
    const data = { id_user, id_product, qty, total_price }
    try {
        await bagModel.insertDataBag(data);
        response(res, null, 'sucess', 200, 'insert data sucess');
    } catch (error) {
        console.log(error);
        response(res, error, 'failed', 400, 'insert data failed' );
    }
}

exports.deleteData = async (req,res) =>{
    await bagModel.deleteData(req.params.id)
    try {
        res.send({status: 200, message: 'delete data success'})
    } catch (error) {
        res.send({message: 'error', error})
    }

}