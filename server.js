const express = require('express');
const mysql = require('mysql')
const app = express();
const port = process.env.PORT || 3000;
const mysqlConnection = process.env.MYSQL_CONNECTION || { host: 'localhost', user: 'root', password: null, database: 'products' };

var connection = mysql.createConnection(mysqlConnection);

require('dotenv').config();
connection.connect()

app.get(`/`, (req,res) => {
    res.send('please reference the API docs to get started');
});

app.get(`/products`, (req,res) => {
    const page = req.query.page || 1;
    const number = req.query.number || 5;
    let sql = `
    SELECT
        id, name, slogan, description, category, default_price
    FROM products
    LIMIT ${number}
    OFFSET ${number * (page - 1)};`;
    connection.query(sql, (err, rows, fields) => {
        if (err) throw err;
        res.json(rows);
    })
});

app.get(`/products/:product_id`, (req,res) => { // [ REQUIRES JOINED FEATURES ]
    const product_id = req.params.product_id;
    let sql = `
    SELECT
        products.id, products.name, products.slogan, products.description, products.category, products.default_price,
        group_concat(features.feature SEPARATOR "|") AS features, group_concat(features.value SEPARATOR "|") AS values_group
    FROM products
        INNER JOIN features
            ON products.id = features.product_id
    WHERE products.id = "${product_id}"
    GROUP BY products.id;`;
    connection.query(sql, (err, rows, fields) => {
        if (err) throw err;
        for (let i = 0; i < rows.length; i++) {
            var featsArray = rows[i].features.split("|")
            var valsArray = rows[i].values_group.split("|")
            if (rows[i].value === null) rows[i].value = true;
            rows[i].features = [];
            delete rows[i].values_group;
            for (let j = 0; j < featsArray.length; j++) {
                rows[i].features.push({ feature: featsArray[j], value: valsArray[j] })
            }
        }
        res.send(rows[0]);
    })
});

app.get(`/products/:product_id/styles`, (req,res) => { // FIX PHOTOS
    const product_id = req.params.product_id;
    let sql = `
    SELECT
        styles.style_id,styles.style_name,styles.original_price,styles.sale_price,styles.style_is_default,
        group_concat(photos.thumbnail_url SEPARATOR "|") AS thumbnails, group_concat(photos.url SEPARATOR "|") AS urls,
        group_concat(skus.sku SEPARATOR "|") AS skus, group_concat(skus.size SEPARATOR "|") AS sizes, group_concat(skus.quantity SEPARATOR "|") AS quantities
    FROM styles
        INNER JOIN photos
            ON styles.style_id = photos.style_id
        INNER JOIN skus
            ON styles.style_id = skus.style_id
    WHERE styles.product_id = ${product_id}
    GROUP BY styles.style_id;`;
    connection.query(sql, (err, rows, fields) => {
        if (err) throw err;
        for (let i = 0; i < rows.length; i++) {
            var thumbnails = rows[i].thumbnails.split('|');
            var urls = rows[i].thumbnails.split('|');
            delete rows[i].thumbnails;
            delete rows[i].urls;
            rows[i].photos = [];
            for (let j = 0; j < thumbnails.length; j++) {
                rows[i].photos.push({ thumbnail_url: thumbnails[j], url: urls[j] });
            }
            var skus_list = rows[i].skus.split('|');
            var sizes = rows[i].sizes.split('|');
            var quantities = rows[i].quantities.split('|');
            delete rows[i].sizes;
            delete rows[i].quantities;
            rows[i].skus = {};
            for (let j = 0; j < skus_list.length; j++) {
                rows[i].skus[skus_list[j]] = { quantity: quantities[j], size: sizes[j]}
            }
        }
        res.send(rows);
    })
});

app.get(`/products/:product_id/related`, (req,res) => {
    const product_id = req.params.product_id;
    let sql = `
    SELECT related_product_id
        FROM related_products
        WHERE current_product_id = "${req.params.product_id}";`;
    connection.query(sql, (err, rows, fields) => {
        if (err) throw err;
        let valuesArray = [];
        for (let object of rows) {
            valuesArray.push(object.related_product_id)
        }
        res.send(valuesArray);
    })
});

app.post(`/`, (req, res) => {
    return res.send('post request received!');
});

app.listen(port, () => {
    console.log(`SDC LISTENING ON PORT ${port}...`);
})