const pool = require('../configs/db')

const getData = ({search, limit, offset, sortBy, sortList}) =>{
    return new Promise((resolve, reject)=>{
        pool.query(`SELECT * FROM product WHERE (name) ILIKE ('%${search}%') ORDER BY ${sortBy} ${sortList} LIMIT ${limit} OFFSET ${offset}`, (err, result)=>{
            if(!err){
                resolve(result)
            }else{
                reject(err)
                console.log(err);
            }
        }) 
    });
}

const getDetailProduct = (id) =>{
    return pool.query(`SELECT * FROM product WHERE id = (${id})`)
    // return pool.query(`SELECT products.*, category.name AS category FROM products INNER JOIN category ON products.id_category = category.id WHERE products.id=${id}`)
}

const getMyProduct = (id) => {
    return pool.query(`SELECT * FROM product WHERE id_seller = '${id}'`)
}

const countData = () =>{
    return pool.query(`SELECT COUNT(*) AS total_products FROM product`)
}

const insert = (data) => {
    const {name,id_seller,description,condition,photo,brand,category,stock,price,size} = data
    return pool.query(`INSERT INTO product(name,id_seller,description,condition,photo,brand,category,stock,price,size)VALUES('${name}','${id_seller}','${description}','${condition}','${photo}','${brand}','${category}',${stock},${price},${size})`);
}

// const insert = ({ name,brand,condition,description,stock,price,userid,photo,size }) => {
//     return new Promise((resolve, reject) => {
//       pool.query("INSERT INTO products(name,brand,condition,description,stock,price,userid,photo,size)VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)", [name,brand,condition,description,stock,price,userid,photo,size], (err, result) => {
//         if (!err) {
//           resolve(result);
//         } else {
//           reject(new Error(err));
//         }
//       });
//     });
//   };

// const update = (id, data) =>{
    // const {name, id_seller, id_customer, id_category, brand, condition, description, stock, price, photo, size} = data
    // return pool.query(`UPDATE products SET name='${name}', brand='${brand}', condition='${condition}', description='${description}', stock=${stock}, id_category=${id_category}, price=${price}, photo=${photo} WHERE id=${id}`)
// }

const deleteData = (id) =>{
    return pool.query(`DELETE FROM product WHERE id = ${id}`)
}

module.exports = {
    getData,
    getDetailProduct,
    getMyProduct,
    insert,
    // update,
    deleteData,
    countData
    // getRelation
}