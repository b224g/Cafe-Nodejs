create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(255),
    contactNumber varchar(20),
    email varchar(255),
    password varchar(255),
    status enum('true','false'),
    role enum('admin','user'),
    UNIQUE (email)
);

insert into cafenodejs.user(
    name,
    contactNumber,
    email,
    password,
    status,
    role
) values(
    'admin',
    '+79996675404',
    'admin@gmail.com',
    'admin',
    'true',
    'admin'
    );

create table cafenodejs.category(
    id int primary key AUTO_INCREMENT,
    name varchar(255) NOT NULL
);

create table cafenodejs.product(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    description varchar(255),
    price integer,
    status varchar(20),
    primary key(id)
);

create table cafenodejs.bill(
    id int NOT NULL AUTO_INCREMENT,
    uuid varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    contactNumber varchar(20) NOT NULL,
    paymentMethod varchar(50) NOT NULL,
    total int NOT NULL,
    productDetails JSON DEFAULT NULL,
    createBy varchar(255) NOT NULL,
    primary key(id)
);
