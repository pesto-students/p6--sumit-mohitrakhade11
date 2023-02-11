/* Find the item that has minimum weight */
select * from items order by itemweight asc limit 1;

/* Find the different warehouses in “Pune”.*/
select * from warehouses as w join cities as c where w.warehouseid=c.cityid and c.city="PUNE";

/*Find the details of items ordered by a customer “Mr. Patil”.*/
select * from orders as o join customer as c on o.customerid = c.customerid and c.customername="Mr. Patil" join ordereditems as oi on oi.orderid=o.orderid join items as i on i.itemid=oi.itemid;

/*Find a Warehouse which has maximum stores.*/
select w.* from warehouses as w join stores as s on w.warehouseid=s.warehouseid group by w.warehouseid order by count(w.warehouseid) desc limit 1;

/* Find an item which is ordered for a minimum number of times.*/
select i.* from ordereditems as oi join items as i on i.itemid=oi.itemid group by oi.itemid order by count(oi.itemid) asc limit 1;

/*Find the detailed orders given by each customer */
select c.*,i.* from customer as c join orders as o on c.customerid=o.customerid join ordereditems as oi on oi.orderid=o.orderid join items as i on i.itemid=oi.itemid order by c.customerid;
