const checkoutModel = require('../models/checkout')
const {response} = require('../helpers/common')

exports.historyCheckout = async(req,res) => {
    try {
        const id = req.params.id;
        const {rows} = await checkoutModel.historyCheckout(id);
        response(res, rows, 'success', 200, 'success get history')
    } catch (error) {
        console.log(error);
    }
}

exports.myOrder = async(req,res) => {
    try {
        const id = req.params.id;
        const {rows} = await checkoutModel.myOrder(id);
        response(res, rows, 'success', 200, 'success get history')
    } catch (error) {
        console.log(error);
    }
}

// exports.proccessOrder = async(req,res) => {
//     try {
//         const id = req.params.id;
//         const status = req.body
//         console.log(req.body);
//         const {rows} = await checkoutModel.confirmOrder(id, status);
//         response(res, rows, 'success', 200, 'success confirm your order')
//     } catch (error) {
//         console.log(error);
//     }
// }


exports.processCheckout = async(req, res) => {
    const id = req.params.id
    const {status} = req.body
    const data = {status}
    // console.log(req.body);
    try {
        await checkoutModel.processOrder(id, data)
        response(res, null, 'process order success', 200, 'success')
    } catch (error) {
        response(res, error, 'error', 400, 'process order error')
    }
}


exports.postCheckout = async(req,res) => {
    const {id_transaction, status, id_seller, id_user, id_product} = req.body;
    const data = {id_transaction, status, id_seller, id_user, id_product}
    try {
        const {rows} = await checkoutModel.postCheckout(data)
        response(res, rows, 'success', 200, 'post checkout success')
    } catch (error) {
        console.log(error);
    }
}