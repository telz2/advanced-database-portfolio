# Portfolio 3: Concurrency and Transactions 
##  Course Code: MIT 8103
- Course Title: Advanced Database Systems
- Case Study: Library Management System
 ## Overview
This portfolio uses MySQL 8.0 and the Library Management System database created in Portfolio 1 to illustrate database transactions, transaction control commands, row-level locking, and transaction isolation.
## Goals
-Use START TRANSACTION, COMMIT, and ROLLBACK to demonstrate transaction management.
-Use SELECT... FOR UPDATE to observe row-level locking.
-Examine using the same database record concurrently.
-Determine the current level of transaction isolation.
## 3. Transaction Management
A transaction groups database operations into a logical unit of work.
-START TRANSACTION begins a transaction.
-COMMIT permanently saves changes made during a transaction.
-ROLLBACK cancels uncommitted changes.
In the practical exercise, a transaction decreased the number of copies of a book that were available. The original value was restored by using ROLLBACK. In another instance, COMMIT was used to maintain a change permanently.
## 4. Concurrency and Row-Level Locking
Two MySQL sessions were used to investigate concurrent access to the same book record.
The query below requests a lock on the selected record:
START TRANSACTION;

SELECT book_id, title, available_copies
FROM Books
WHERE book_id = 1
FOR UPDATE;
The experiment showed that a row lock can be held by one transaction while another waits to obtain a conflicting lock on the same record.
## 5. Lock Wait Timeout
MySQL returned the following during the experiment:
Error 1205 (HY000): Lock wait timeout exceeded; try restarting transaction
This happened as a result of a transaction waiting too long to get a lock that was being held by another transaction. The outcome showed how MySQL manages lock contention.
## 6. Transaction Isolation
The current session isolation level was checked using:
SELECT @@transaction_isolation;
MySQL supports four standard isolation levels:
-READ UNCOMMITTED
-READ COMMITTED
-REPEATABLE READ
-SERIALIZABLE
The actual isolation level is determined by the value returned by the query.
This portfolio will show how database integrity is maintained through transactions when multiple users access or modify library records
## 7. Conclusion
The practical exercises illustrated how MySQL manages transactions through commit, rollback, row-level locking, and lock contention. These mechanisms are essential for preserving data consistency when multiple transactions access the database simultaneously.
