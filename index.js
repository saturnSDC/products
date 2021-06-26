const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const characteristics = 'characteristics.csv';
const features = 'features.csv';
const photos = 'photos.csv';
const product = 'product.csv';
const related = 'related.csv';
const skus = 'skus.csv';
const styles = 'styles.csv';
const SAMPLEPRODUCT = 'SAMPLEPRODUCT.csv';

const sequelize = new Sequelize('products', 'root', null, { pool: {}, dialect: 'mysql', logging: false});


// PRODUCTS ==================================================================================================
function seedDBFromCSVStream(fileName) {
    var errors = [];
    var readStream = fs.createReadStream(path.join('./data/', fileName), { encoding: 'utf8' });
    var count = 0;
    var lineRemainder = '';
    readStream
    .on('data', async function(chunk) {
        readStream.pause();
        count++;
        let lines = chunk.split('\n');
        lines[0] = lineRemainder + lines[0];
        lineRemainder = lines.pop();
        let firstLine = lines[0];
        // console.log('lines ', lines)
        let inputArray = [];
        for (let i in lines) {
            let splitLines = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            inputArray.push(`(${splitLines[0]},${splitLines[1]},${splitLines[2]},${splitLines[3]},${splitLines[5]},"${splitLines[6]}")`);
        }
        const sql = `
            INSERT INTO products (id, name, slogan, description, category, default_price)
            VALUES ${inputArray.slice(1).join()};
            `;
        try {
            await sequelize.query(sql, { type: sequelize.QueryTypes.INSERT });
        }
        catch(err) { errors.push(err) }
        // console.log('input ', input);
        lines = null;
        readStream.resume();
    })
    .on('error', (err) => { throw new Error(err) })
    .on('end', () => console.log(count, 'errors ', errors));
}


// FEATURES ==================================================================================================
function seedFeatures() {
    var fileName = features;
    var readStream = fs.createReadStream(path.join('./data/', fileName), { encoding: 'utf8' });
    var count = 0;
    var lineRemainder = '';
    readStream
    .on('data', async function(chunk) {
        readStream.pause();
        count++;
        let lines = chunk.split('\n');
        lines[0] = lineRemainder + lines[0];
        lineRemainder = lines.pop();
        let firstLine = lines[0];
        // console.log('lines ', lines)
        let inputArray = [];
        for (let i in lines) {
            let splitLines = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            inputArray.push(`(${splitLines[0]},${splitLines[2]},${splitLines[3]})`);
        }
        const sql = `
            INSERT INTO features (id, feature, value)
            VALUES ${inputArray.slice(1).join()};
            `;
        await sequelize.query(sql, { type: sequelize.QueryTypes.INSERT });
        lines = null;
        readStream.resume();
    })
    .on('error', (err) => { throw new Error(err) })
    .on('end', () => console.log(count));
}

// STYLES ====================================================================================================
function seedStyles() {
    var fileName = styles;
    var readStream = fs.createReadStream(path.join('./data/', fileName), { encoding: 'utf8' });
    var count = 0;
    var lineRemainder = '';
    readStream
    .on('data', async function(chunk) {
    readStream.pause();
        count++;
        let lines = chunk.split('\n');
        lines[0] = lineRemainder + lines[0];
        lineRemainder = lines.pop();
        let firstLine = lines[0];
        // console.log('lines ', lines)
        let inputArray = [];
        for (let i in lines) {
            let splitLines = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            inputArray.push(`(${splitLines[0]},${splitLines[2]},${splitLines[3]},${splitLines[4]},${Number(splitLines[5])}, ${splitLines[1]})`);
        }
        const sql = `
            INSERT INTO styles (style_id,style_name,sale_price,original_price,style_is_default, product_id)
            VALUES ${inputArray.slice(1).join()};
            `;
        await sequelize.query(sql, { type: sequelize.QueryTypes.INSERT });
        // console.log('input ', input);
        lines = null;
        readStream.resume();
    })
    .on('error', (err) => { throw new Error(err) })
    .on('end', () => console.log(count));
}


// SKUS ======================================================================================================
function seedSKUS() {
    var fileName = skus;
    var readStream = fs.createReadStream(path.join('./data/', fileName), { encoding: 'utf8' });
    var count = 0;
    var lineRemainder = '';
    readStream
    .on('data', async function(chunk) {
    readStream.pause();
        count++;
        let lines = chunk.split('\n');
        lines[0] = lineRemainder + lines[0];
        lineRemainder = lines.pop();
        let firstLine = lines[0];
        // console.log('lines ', lines)
        let inputArray = [];
        for (let i in lines) {
            let splitLines = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            inputArray.push(`(${splitLines[0]},${splitLines[1]},${splitLines[2]},${splitLines[3]})`);
        }
        const sql = `
            INSERT INTO skus (sku,style_id,size,quantity)
            VALUES ${inputArray.slice(1).join()};
            `;
        await sequelize.query(sql, { type: sequelize.QueryTypes.INSERT });
        // console.log('input ', input);
        lines = null;
        readStream.resume();
    })
    .on('error', (err) => { throw new Error(err) })
    .on('end', () => console.log(count));
}


// PHOTOS ====================================================================================================
function seedPhotos() {
    var fileName = photos;
    var readStream = fs.createReadStream(path.join('./data/', fileName), { encoding: 'utf8' });
    var count = 0;
    var lineRemainder = '';
    readStream
    .on('data', async function(chunk) {
    readStream.pause();
        count++;
        let lines = chunk.split('\n');
        lines[0] = lineRemainder + lines[0];
        lineRemainder = lines.pop();
        let firstLine = lines[0];
        // console.log('lines ', lines)
        let inputArray = [];
        for (let i in lines) {
            let splitLines = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            inputArray.push(`(${splitLines[0]},${splitLines[1]},${splitLines[2]},${splitLines[3]})`);
        }
        const sql = `
            INSERT INTO photos (id,style_id,url,thumbnail_url)
            VALUES ${inputArray.slice(1).join()};
            `;
        await sequelize.query(sql, { type: sequelize.QueryTypes.INSERT });
        // console.log('input ', input);
        lines = null;
        readStream.resume();
    })
    .on('error', (err) => { throw new Error(err) })
    .on('end', () => console.log(count));
}


// RELATED ===================================================================================================
function seedRelated() {
    var fileName = related;
    var readStream = fs.createReadStream(path.join('./data/', fileName), { encoding: 'utf8' });
    var count = 0;
    var lineRemainder = '';
    readStream
    .on('data', async function(chunk) {
    readStream.pause();
        count++;
        let lines = chunk.split('\n');
        lines[0] = lineRemainder + lines[0];
        lineRemainder = lines.pop();
        let firstLine = lines[0];
        // console.log('lines ', lines)
        let inputArray = [];
        for (let i in lines) {
            let splitLines = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            inputArray.push(`(${splitLines[0]},${splitLines[1]},${splitLines[2]})`);
        }
        const sql = `
            INSERT INTO related_products (id,current_product_id,related_product_id)
            VALUES ${inputArray.slice(1).join()};
            `;
        await sequelize.query(sql, { type: sequelize.QueryTypes.INSERT });
        // console.log('input ', input);
        lines = null;
        readStream.resume();
    })
    .on('error', (err) => { throw new Error(err) })
    .on('end', () => console.log(count));
}


seedDBFromCSVStream(product); // rows 989847, 963009 / 1000011
seedFeatures(); // rows 2213176, 2210246 / 2219279 
seedStyles(); // rows 1957098, 1953638 / 1958102
seedSKUS(); // rows 11023952, 11020606 / 11323917
seedPhotos(); // rows 5540397, 5547709 / 5655719

seedRelated(); // rows 4497788, 4498024 / 4508263