const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
var checkRole = require('../services/checkRole');

//adding product

//, auth.authenticateToken, checkRole.checkRole
router.post('/add', (req, res) => {
    let product = req.body;
    var query = "insert into product(name,categoryId,description,price,status) values(?,?,?,?,'true')";
    connection.query(query, [product.name, product.categoryId, product.description, product.price], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Product Added Successfully." });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

//showing product
//, auth.authenticateToken
router.get('/get', (req, res, next) => {
    var query = "select p.id, p.name, p.description, p.price, p.status, c.id as categoryId, c.name as categoryName from product as p INNER JOIN category as c where p.categoryId = c.id";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    })
})

//get product by category
//, auth.authenticateToken

router.get('getByCategory/:id', (req, res, next) => {
    const id = req.params.id;
    var query = "select id,name from product where categoryId= ? and status='true'";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    })
})

//get product by id

//auth.authenticateToken,
router.get('/getById/:id', (req, res, next) => {
    const id = req.params.id;
    var query = "select id,name,description,price from product where id = ?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json(results[0]);
        }
        else {
            return res.status(500).json(err);
        }
    })
})

//update product

//auth.authenticateToken, checkRole.checkRole,
router.patch('/update', (req, res, next) => {
    let product = req.body;
    //const productId = req.params.id;
    let query = "update product set name=?, categoryId=?, description=?,price=? where id=?";
    connection.query(query, [product.name, product.categoryId, product.description, product.price, product.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id does not found" });
            }
            return res.status(200).json({ message: "Product Updated Successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

//delete product

//, auth.authenticateToken, checkRole.checkRole

router.delete('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    var query = "delete from product where id=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id does not found" })
            }
            return res.status(200).json({ message: "Product Deleted Successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

//, auth.authenticateToken, checkRole.checkRole
router.patch('/updateStatus', (req, res, next) => {
    let user = req.body;
    var query = "update product set status=? where id=?";
    connection.query(query, [user.status, user.id], (err, results) => {

        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id does not found" });
            }
            return res.status(200).json({ message: "Product status updated Successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })


})

module.exports = router; 