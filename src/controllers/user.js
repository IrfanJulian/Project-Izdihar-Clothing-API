/* eslint-disable no-undef */
const userModel = require('../models/user')
const {v4: uuidv4} = require('uuid')
const commonHelper = require('../helpers/common')
const bcrypt = require('bcryptjs')
const { generateToken, generateRefreshToken } = require('../helpers/auth')
const { sendGmail } = require('../helpers/mailer')
const cloudinary = require('cloudinary').v2
// const client = require('../configs/redis')

cloudinary.config({ 
  cloud_name: 'ddpo9zxts', 
  api_key: '713177134711193', 
  api_secret: 'LPrYJjwuotkDzsvBwCDlsUoIycw' 
});


exports.getData = async(req,res) =>{
    try {
        const {rows} = await userModel.getData()
        commonHelper.response(res, rows, 'sucess', 200, 'get data user sucess')
    } catch (error) {
        res.send({message: 'error', error})
    }
}

exports.insertData = async(req, res) =>{
    try {
        const dataUser = await userModel.findByEmail(req.body.email)
        const digits = "0123456789";
        let otp = "";
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < 6; i++) {
          otp += digits[Math.floor(Math.random() * 10)];
        }
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(req.body.password, salt);
        if(!dataUser.rowCount){
            let data = {
                id: uuidv4(),
                name: req.body.name,
                email: req.body.email,
                password: passwordHash,
                phone_number: req.body.phone_number,
                otp
            }
            let result = await userModel.insertData(data)
            if(result){
                await sendGmail(data.email, data.otp)
                return res.send({status: 200, message: 'success check email'})
            }
            // console.log(data);
            res.send({status: 200, message: 'add data success'})
        }else{
            res.send({message: 'email is already exist'})
        }
    } catch (error) {
        console.log(error)
        res.send({message: 'error'})
    }
}

exports.verifyAccount = async(req,res) => {
    const { email, otp } = req.body
    const {rows: [dataUser]} = await userModel.findByEmail(email)
    const data = { email, otp }    
    if(dataUser === null){
        return commonHelper.response(res, null, 'error', 404, 'email or OTP wrong')
    }else{
        console.log('masuk');
        if(otp === dataUser.otp){
            await userModel.verify(data)
            return commonHelper.response(res, null, 'sucess', 200, 'validation OTP sucess')
        }else{
            console.log('otp salah');
            return commonHelper.response(res, null, 'error', 401, 'wrong OTP!')
        }
    }
}

exports.login = async (req,res) => {
    const {email, password} = req.body
    const {rows: [dataUser]} = await userModel.findByEmail(email)
    if(dataUser.status_activation == 'not_actived'){
        return commonHelper.response(res, null, failed, 403, 'Your account is doesn`t actived' )
    }
    if(!dataUser){
        return commonHelper.response(res, null, 'failed', 403, 'login failed! wrong email or password')
    }
    const validationPassword = bcrypt.compareSync(password, dataUser.password)
    if(!validationPassword){
        return commonHelper.response(res, null, 'failed', 403, 'login failed! wrong email or password')
    }
    let payload = {
        email: dataUser.email,
        password: dataUser.password,
        role: dataUser.role
    }
        dataUser.token = generateToken(payload)
        dataUser.refreshToken= generateRefreshToken(payload)
        commonHelper.response(res, dataUser, 'success', 200, 'login success')
}

exports.getProfile = async(req, res)=>{
    try {
        const id = req.params.id
        const {rows} = await userModel.getDataById(id)
        commonHelper.response(res, rows, 'suuccess', 200, 'get profile success')
    } catch (error) {
        console.log(error);
        res.json({message: 'error', error})
    }
}


exports.updateData = async(req, res) => {
    try {
        const id = req.params.id
        const {name, email, phone_number, birth, store_description, store_name} = req.body
        let photo = req.file
        const image = await cloudinary.uploader.upload(photo.path, { folder: 'Backend Blanja/products' })    
        const data = {name, email, birth, phone_number, photo: image.secure_url, store_description, store_name} 
        userModel.updateData(id, data)
          return commonHelper.response(res, data, 'success', 200, 'data updated')
      } catch (error) {
        console.log(error);
          // res.send({message: 'error', error})
      }
    },

exports.updateContact = (req,res) => {
    const id = req.params.id
    const { address, zip, city, recipient_name, recipient_phone } = req.body
    const data = { address, zip, city, recipient_name, recipient_phone }
    try {
        userModel.updateContact(id, data)
        return commonHelper.response(res, data, 'success', 200, 'data contact updated')
    } catch (error) {
        commonHelper.response(res, error, 'failed', 403)
    }
}

exports.deleteData = (req,res) =>{
    userModel.deleteData(req.params.id)
    .then(()=>{
        res.send({status: 200, message: 'delete data success'})
    })
    .catch((error)=>{
        res.send({message: 'error', error})
    })
}