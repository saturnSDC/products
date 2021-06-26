CREATE KEYSPACE IF NOT EXISTS products WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' }
AND durable_writes = 'true';

USE products;

CREATE TYPE feature (
    feature text,
    value text
);

CREATE TYPE photo (
    thumbnail_url text,
    url text
);

CREATE TYPE sku (
    sku text,
    quantity int,
    size text
);

CREATE TYPE style (
    style_id int,
    name text,
    original_price text,
    sale_price text,
    default? boolean,
    photos map<photo>,
    skus list<skus>
);

CREATE TABLE IF NOT EXISTS store.shopping_cart (
    product_id int PRIMARY KEY,
    name int,
    slogan text,
    description text,
    category text,
    default_price text,
    features set<feature>,
    styles list<style>,
    related_products set<int>
);
