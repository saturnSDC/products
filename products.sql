DROP DATABASE IF EXISTS products;
CREATE DATABASE IF NOT EXISTS products;

USE products;

    CREATE TABLE IF NOT EXISTS products (
        id INT NOT NULL,
        name VARCHAR(30),
        slogan VARCHAR(200),
        description VARCHAR(600),
        category VARCHAR(25),
        default_price VARCHAR(20),
        PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS features (
        id INT NOT NULL AUTO_INCREMENT,
        product_id INT,
        feature VARCHAR(25),
        value VARCHAR(30),
        PRIMARY KEY (id)
    );
    
    CREATE TABLE IF NOT EXISTS styles (
        style_id INT NOT NULL,
        style_name VARCHAR(30),
        original_price VARCHAR(10),
        sale_price VARCHAR(10),
        style_is_default TINYINT(1),
        product_id INT,
        PRIMARY KEY (style_id)
    );
    
    CREATE TABLE IF NOT EXISTS skus (
        sku INT NOT NULL,
        style_id INT,
        quantity INT,
        size VARCHAR(9),
        PRIMARY KEY (sku)
    );

    CREATE TABLE IF NOT EXISTS photos (
        id INT NOT NULL,
        style_id INT,
        thumbnail_url VARCHAR(180),
        url VARCHAR(180),
        PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS related_products (
        id INT NOT NULL AUTO_INCREMENT,
        current_product_id INT,
        related_product_id INT,
        PRIMARY KEY (id)
    );
