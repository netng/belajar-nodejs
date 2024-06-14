create table sample (
    id varchar(100) not null,
    name varchar(100) not null,
    primary key (id)
) engine innodb;


SELECT * FROM sample;


CREATE  TABLE IF NOT EXISTS customers (
    id  VARCHAR(100) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    
    primary key(id),
    constraint customers_email_unique unique(email),
    constraint customers_phone_unique unique(phone)
) engine innodb;

SELECT * FROM customers;

DELETE FROM customers;

DELETE FROM customers where email = 'sopyan@gmail.com'




create table products (
    id  varchar(100) not null,
    name varchar(100) not null,
    price int not null,
    stock int not null,
    category varchar(100) not null,
    primary key (id)
) engine innodb;

SELECT * FROM products;



INSERT INTO products(id, name, price, stock, category)
VALUES ('P0001', 'A', 1000, 100, 'K1'),
        ('P0002', 'B', 2000, 200, 'K1'),
        ('P0003', 'C', 3000, 300, 'K1'),
        ('P0004', 'D', 4000, 400, 'K2'),
        ('P0005', 'E', 5000, 500, 'K2');



CREATE TABLE IF NOT EXISTS categories (
    id  INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    primary key (id)
) engine innodb;


SELECT * FROM categories;

CREATE TABLE IF NOT EXISTS wallet (
    id varchar(100) not null,
    balance int not null,
    customer_id varchar(100) not null,
    primary key (id),
    constraint wallet_customer_id_fk foreign key (customer_id) references customers(id),
    constraint wallet_customer_id_unique unique (customer_id)
 ) engine innodb;

SELECT * from wallet;



CREATE TABLE IF NOT EXISTS comments (
    id INT NOT NULL AUTO_INCREMENT,
    customer_id varchar(100) NOT NULL,
    title varchar(200) NOT NULL,
    description TEXT,
    
    primary key (id),
    constraint comments_customer_id_fk FOREIGN KEY(customer_id) REFERENCES customers(id)
) engine innodb;

SELECT * FROM comments;

INSERT INTO comments(customer_id, title, description)
VALUES ('nandang', 'comment 1', 'description comment 1'),
    ('nandang', 'comment 2', 'description comment 2'),
    ('jaka', 'comment 1', 'description comment 1'),
    ('jaka', 'comment 2', 'description comment 2');

DROP table likes;
CREATE TABLE IF NOT EXISTS likes (
    customer_id VARCHAR(100) not null,
    product_id VARCHAR(100) not null,
    primary key(customer_id, product_id),

    constraint likes_customer_id_fk foreign key(customer_id) references customers(id),
    constraint likes_product_id_fk foreign key(product_id) references products(id)
) engine innodb;

SELECT * FROM likes;


CREATE DATABASE belajar_nodejs_prisma;
USE belajar_nodejs_prisma;
SHOW TABLE belajar_nodejs_prisma;