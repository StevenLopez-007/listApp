CREATE TABLE IF NOT EXISTS products (
id_product INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT NOT NULL,
precio REAL NOT NULL,
categoria_id INTEGER NOT NULL,CONSTRAINT "categoria-products"
FOREIGN KEY (categoria_id)
REFERENCES categoria(id_categoria));


CREATE TABLE IF NOT EXISTS list (
id_list INTEGER PRIMARY KEY AUTOINCREMENT,
date TEXT NOT NULL,
nameList TEXT NOT NULL);
-- categoria_id INTEGER NOT NULL,CONSTRAINT "categoria-list"
-- FOREIGN KEY (categoria_id)
-- REFERENCES categoria(id_categoria));


CREATE TABLE IF NOT EXISTS detail_list (
id_detail_list INTEGER PRIMARY KEY AUTOINCREMENT,
products_id INTEGER NOT NULL,
list_id INTEGER NOT NULL,CONSTRAINT "products-detail_list"
FOREIGN KEY (products_id)
REFERENCES products(id_product)
,CONSTRAINT "list-detail_list"
FOREIGN KEY (list_id)
REFERENCES list(id_list));


CREATE TABLE IF NOT EXISTS categoria (
id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
nameCat TEXT NOT NULL);




