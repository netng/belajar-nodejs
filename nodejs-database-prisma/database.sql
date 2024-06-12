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