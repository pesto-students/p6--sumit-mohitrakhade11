CREATE DATABASE warehouse; 

USE warehouse; 

CREATE TABLE cities 
  ( 
     cityid INT(3) PRIMARY KEY, 
     city   VARCHAR(20), 
     state  VARCHAR(20) 
  ); 

CREATE TABLE warehouses 
  ( 
     warehouseid   INT(4) PRIMARY KEY, 
     warehousename VARCHAR(30), 
     location      VARCHAR(30), 
     extra         JSON, 
     cityid        INT(3), 
     FOREIGN KEY (cityid) REFERENCES cities (cityid) 
  ); 

CREATE TABLE stores 
  ( 
     storeid     INT(5) PRIMARY KEY, 
     storename   VARCHAR(30), 
     location    VARCHAR(30), 
     warehouseid INT(4), 
     FOREIGN KEY (warehouseid) REFERENCES warehouses(warehouseid) 
  ); 

CREATE TABLE customer 
  ( 
     customerid      INT(5) PRIMARY KEY, 
     customername    VARCHAR(50), 
     customeraddress VARCHAR(50), 
     customercity    VARCHAR(30) 
  ); 

CREATE TABLE orders 
  ( 
     orderid    INT(5) PRIMARY KEY, 
     orderdate  DATE, 
     customerid INT(5), 
     FOREIGN KEY (customerid) REFERENCES customer (customerid) 
  ); 

CREATE TABLE items 
  ( 
     itemid          INT(5) PRIMARY KEY, 
     itemdescription VARCHAR(100), 
     itemweight      DECIMAL(5, 2), 
     itemcost        DECIMAL(5, 2) 
  ); 

CREATE TABLE ordereditems 
  ( 
     itemid          INT(5), 
     orderid         INT(5), 
     orderedquantity INT(5), 
     FOREIGN KEY (itemid) REFERENCES items(itemid), 
     FOREIGN KEY (orderid) REFERENCES orders (orderid) 
  ); 

CREATE TABLE storeditems 
  ( 
     itemid         INT(5), 
     storeid        INT(5), 
     storedquantity INT(5), 
     FOREIGN KEY (storeid) REFERENCES stores(storeid), 
     FOREIGN KEY (itemid) REFERENCES items(itemid) 
  ); 