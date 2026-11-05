# MIT 8103 – Advanced Database Systems

## Library Management System: Portfolio Collection

This repository brings together five portfolios that build on a single case study, a **Library Management System**. Starting from a relational design in MySQL, the work moves through query optimisation, transactions and concurrency, a NoSQL implementation in MongoDB, and finally a cloud-hosted deployment on MongoDB Atlas.

---

## Contents

| # | Portfolio | Technology | Focus |
|---|-----------|------------|-------|
| 1 | [Database Design](#portfolio-1-database-design) | MySQL | Tables, relationships, keys and constraints |
| 2 | [Query Optimisation](#portfolio-2-query-optimisation) | MySQL | Indexing and query execution plans |
| 3 | [Concurrency and Transactions](#portfolio-3-concurrency-and-transactions) | MySQL 8.0 | Transactions, locking, isolation levels |
| 4 | [Implementing a NoSQL Database](#portfolio-4-implementing-a-nosql-database) | MongoDB | Document-oriented data model |
| 5 | [Distributed and Cloud Databases](#portfolio-5-distributed-and-cloud-databases) | MongoDB Atlas (AWS) | Cloud deployment, replication, availability |

---

## Portfolio 1: Database Design

### Introduction
This portfolio shows how to use MySQL to build and implement a relational database for a library management system. It uses primary keys, foreign keys and constraints to manage library patrons, books and book loans while preserving data integrity.

### Database Tables
The `library_management` database contains three primary tables:

| Table | Purpose | Key fields |
|-------|---------|------------|
| **Members** | Stores details about library members | Member ID, full name, phone number, email address |
| **Books** | Stores details about books | Book ID, title, author, available copies |
| **Loans** | Tracks book loans | Loan ID, member ID, book ID, borrow date, due date, return date |

### Relationships
- One member may have more than one loan record.
- Over time, a single book can appear in several loan records.
- Each loan record references one member and one book.
- The Loans table uses foreign keys to link the Members and Books tables.

### Constraints and Keys
- **Primary keys:** give each record in a table a unique identity.
- **Foreign keys:** maintain the connections among books, members and loans.
- **NOT NULL:** ensures that required fields contain values.
- **UNIQUE:** prevents duplicate email addresses in the Members table.
- **CHECK:** ensures the number of available book copies is not negative.
- **AUTO_INCREMENT:** generates IDs for new records automatically.

---

## Portfolio 2: Query Optimisation

### Introduction
This portfolio uses the Library Management System from Portfolio 1 to show how query performance can be improved in MySQL. The experiment looks at how adding an index changes the way a query searches for a book by its title.

### Objective
To examine the query execution plan before and after creating an index on the `title` column of the `Books` table.

### Initial Query
```sql
EXPLAIN
SELECT book_id, title, author
FROM Books
WHERE title = 'Hamlet';
```

| Measure | Result |
|---------|--------|
| Access type | `ALL` |
| Index used | `NULL` |
| Estimated rows examined | 5 |

The plan showed that MySQL performed a **full table scan**.

### Index Creation
```sql
CREATE INDEX idx_books_title
ON Books(title);
```
MySQL confirmed the index was created, and it was verified with:
```sql
SHOW INDEX FROM Books;
```

### Query Plan After Indexing
The same query was run again with `EXPLAIN`.

| Measure | Result |
|---------|--------|
| Access type | `ref` |
| Index used | `idx_books_title` |

MySQL used the new index to find the matching book title.

### Conclusion
The experiment shows how indexing can influence MySQL query execution plans. The optimiser selected the title index for the exact-match query, showing how indexes help the database locate matching records.

> **Note:** The experiment used a small table of five books, so the change in query plan does not in itself establish a measurable improvement in execution time. Further testing with a larger dataset would give a more meaningful performance comparison.

---

## Portfolio 3: Concurrency and Transactions

### Overview
This portfolio uses MySQL 8.0 and the Library Management System database from Portfolio 1 to illustrate database transactions, transaction control commands, row-level locking and transaction isolation.

### Goals
- Use `START TRANSACTION`, `COMMIT` and `ROLLBACK` to demonstrate transaction management.
- Use `SELECT ... FOR UPDATE` to observe row-level locking.
- Examine concurrent use of the same database record.
- Determine the current transaction isolation level.

### Transaction Management
A transaction groups database operations into a logical unit of work.

- `START TRANSACTION` begins a transaction.
- `COMMIT` permanently saves changes made during a transaction.
- `ROLLBACK` cancels uncommitted changes.

In the practical exercise, a transaction decreased the number of available copies of a book and `ROLLBACK` restored the original value. In another case, `COMMIT` was used to make a change permanent.

### Concurrency and Row-Level Locking
Two MySQL sessions were used to investigate concurrent access to the same book record. The query below requests a lock on the selected row:

```sql
START TRANSACTION;

SELECT book_id, title, available_copies
FROM Books
WHERE book_id = 1
FOR UPDATE;
```

The experiment showed that one transaction can hold a row lock while another waits to obtain a conflicting lock on the same record.

### Lock Wait Timeout
MySQL returned the following during the experiment:

```
Error 1205 (HY000): Lock wait timeout exceeded; try restarting transaction
```

This occurred because a transaction waited too long for a lock held by another transaction, and it showed how MySQL manages lock contention.

### Transaction Isolation
The current session isolation level was checked using:

```sql
SELECT @@transaction_isolation;
```

MySQL supports four standard isolation levels:

- `READ UNCOMMITTED`
- `READ COMMITTED`
- `REPEATABLE READ`
- `SERIALIZABLE`

The level in effect is the value returned by the query.

### Conclusion
The exercises illustrated how MySQL manages transactions through commit, rollback, row-level locking and lock contention. These mechanisms are essential for preserving data consistency when multiple users access or modify library records at the same time.

---

## Portfolio 4: Implementing a NoSQL Database

### Introduction
This portfolio shows how to create a NoSQL database with MongoDB for the Library Management System used in the earlier portfolios.

### Database Model
MongoDB was chosen for its document-oriented data model. Instead of conventional relational tables, data is stored as flexible BSON documents.

- **Database:** `library_nosql`
- **Collection:** `books`

Each book document contains:
- Book ID
- Title
- Author
- Available copies

### Data Implementation
Five book records were inserted into the collection, matching the five books used in the MySQL implementation in Portfolio 1.

### Database Functions
The MongoDB implementation includes queries for:
- Retrieving every book record
- Looking up a specific book by title
- Sorting books by available copies
- Updating a temporary test document
- Deleting a temporary test document

### Suitability of MongoDB
The document model supports flexible data formats, which suits the library system. Documents do not all need the same structure, so extra book details such as categories, publishers and tags can be added easily. MongoDB also supports searching, filtering, updating and deleting documents.

### Conclusion
This exercise gave hands-on practice in creating MongoDB databases, inserting documents and manipulating data. It also showed how the Library Management System can be supported by a document-oriented NoSQL database.

### Evidence
Screenshots of the MongoDB collection and query operations are provided as practical evidence.

---

## Portfolio 5: Distributed and Cloud Databases

### Introduction
This portfolio shows how to set up a cloud-hosted database for the Library Management System using MongoDB Atlas.

### Cloud Database Deployment
The database was deployed on MongoDB Atlas using the Free (M0) cluster tier.

| Setting | Value |
|---------|-------|
| Cluster name | Cloud LibraryCluster |
| Provider | AWS |
| Region | Cape Town, South Africa |
| Cluster tier | M0 (Free) |

This demonstrates setting up a cloud database without installing database servers locally.

### Distributed Database Concepts

**Replication.** The Atlas deployment uses a 3-node replica set. A replica set keeps multiple copies of the database across different nodes, improving availability and resilience if one node becomes unavailable.

**Sharding.** Sharding divides data across several servers to handle heavier workloads. Because the Free (M0) cluster is adequate for the current Library Management System, sharding was not configured for this project.

**Availability.** Hosting on MongoDB Atlas improves availability through replica set support and managed cloud infrastructure.

### Backup Status
The cluster shows **Backup: Inactive**. This is expected on the MongoDB Atlas Free (M0) tier and does not affect the practical implementation.

### Practical Evidence
- MongoDB Atlas cloud deployment
- AWS hosting in the Cape Town region
- 3-node replica set
- Configuration screenshot

### Conclusion
This exercise demonstrates how a Library Management System can be hosted on a cloud database platform using MongoDB Atlas. It also introduced distributed database concepts, including replication, cloud deployment and availability.

---

## Summary

Across the five portfolios, the Library Management System was taken from a normalised relational design (Portfolio 1), tuned with indexing (Portfolio 2), and protected with transactions and locking (Portfolio 3). It was then reimagined as a flexible document store (Portfolio 4) and deployed on a replicated cloud platform (Portfolio 5).
