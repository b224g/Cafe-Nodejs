const express = require('express');
const connection = require('../connection');
const router = express.Router();
const ejs = require('ejs');
const pdf = require('html-pdf');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const auth = require('../services/authentication');

// Middleware d'authentification
const authenticateToken = (req, res, next) => {
    // Votre logique d'authentification pour extraire l'email de l'utilisateur
    // Exemple simplifié :
    res.locals.email = "admin@gmail.com"; // Remplacez cette ligne par votre logique d'authentification
    next();
};

// Route pour générer un rapport
router.post('/generateReport', authenticateToken, (req, res) => {
    const generatedUuid = uuid.v1();
    const orderDetails = req.body;

    let productDetailsReport;
    try {
        productDetailsReport = JSON.parse(orderDetails.productDetails);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid product details format' });
    }

    const query = "INSERT INTO bill (name, uuid, email, contactNumber, paymentMethod, total, productDetails, createBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(query, [orderDetails.name, generatedUuid, orderDetails.email, orderDetails.contactNumber, orderDetails.paymentMethod, orderDetails.totalAmount, orderDetails.productDetails, res.locals.email], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        ejs.renderFile(
            path.join(__dirname, 'report.ejs'),
            {
                productDetails: productDetailsReport,
                name: orderDetails.name,
                email: orderDetails.email,
                contactNumber: orderDetails.contactNumber,
                paymentMethod: orderDetails.paymentMethod,
                totalAmount: orderDetails.totalAmount
            },
            (err, renderedHtml) => {
                if (err) {
                    return res.status(500).json(err);
                }

                const pdfPath = './generated_pdf/' + generatedUuid + ".pdf";
                pdf.create(renderedHtml).toFile(pdfPath, (err, data) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    return res.status(200).json({ uuid: generatedUuid });
                });
            }
        );
    });
});

// Route pour obtenir un PDF
router.post('/getPdf', (req, res) => {
    const { uuid, productDetails, name, email, contactNumber, paymentMethod, totalAmount } = req.body;
    const pdfPath = './generated_pdf/' + orderDetails.uuid+ '.pdf';

    if (fs.existsSync(pdfPath)) {
        res.contentType("application/pdf");
        fs.createReadStream(pdfPath).pipe(res);
    } else {
        let productDetailsReport;
        try {
            productDetailsReport = JSON.parse(productDetails);
        } catch (error) {
            return res.status(400).json({ error: 'Invalid product details format' });
        }

        ejs.renderFile(
            path.join(__dirname, 'report.ejs'),
            {
                productDetails: productDetailsReport,
                name,
                email,
                contactNumber,
                paymentMethod,
                totalAmount
            },
            (err, renderedHtml) => {
                if (err) {
                    return res.status(500).json(err);
                }

                pdf.create(renderedHtml).toFile(pdfPath, (err, data) => {
                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.contentType("application/pdf");
                    fs.createReadStream(pdfPath).pipe(res);
                });
            }
        );
    }
});

// Route pour obtenir les factures
router.get('/getBills', (req, res) => {
    const query = "SELECT * FROM bill ORDER BY id DESC";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

// Route pour supprimer une facture
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM bill WHERE id = ?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Bill ID not found" });
            }
            return res.status(200).json({ message: "Bill deleted successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});

// Middleware de gestion des erreurs (doit être défini après les routes)
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router;