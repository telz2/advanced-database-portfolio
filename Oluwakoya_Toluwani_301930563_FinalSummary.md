MIT 8103 ADVANCED DATABASE SYSTEMS
Library Management System – Portfolio Report
Name: Oluwakoya Toluwani
Student ID: 301930563
GitHub repository: https://github.com/telz2/advanced-database-portfolio.git
1. Case study
I used a simulated Library Management System for this assignment. Information about books, members, and loans is stored in the system. Library employees use it to check the catalog and track books borrowed by members. It also stores borrowing dates, due dates, and the number of available copies. For the MySQL and MongoDB exercises, I utilized the identical library sample.
2. Portfolio 1: Modeling and database design
I created a MySQL database called library management with three tables: members, books and loans. Members keep track of each member's information, Books keep track of the title, author, and available copies, and Loans keep track of which member borrowed a book, and with the relevant dates.
Every table has a primary key of its own. Additionally, member_id and book_id are foreign keys associated with Members and Books in the Loans table. I made member_email unique, added a check constraint on available_copies to prevent negative values, and used NOT NULL for fields that must have a value. Keeping the three types of information in separate tables avoids repeating member and book details every time a loan is recorded.
 
                     Figure: Relationships among Members, Loans, and Books
3. Portfolio 2 - Query Processing and Optimization
I used EXPLAIN to see how MySQL prepared the query after searching the Books table for the title "Hamlet" for this experiment. The plan displayed type=ALL and no key was chosen before I inserted an index. This indicated that the table was being scanned by MySQL.I then ran EXPLAIN once more after creating an index called idx_books_title on the title column. The second plan showed type=ref and selected idx_books_title, with an estimated one row. This demonstrated that MySQL was conducting the search using the index. There were just five book records in the database; therefore, I have not treated this small test as proof of a large improvement in query speed.
TABLE	MAIN ATTRIBUTE	KEY RULES
Members	member_id, full_name, email, phone	PK member_id; email UNIQUE
Books	book_id, title, author, available_copies	PK book_id; available_copies >= 0
Loans	loan_id, member_id, book_id, borrow_date, due_date, return_date	PK loan_id; FKs to Members and Books


4. Portfolio 3 - Transactions and concurrency
I used MySQL transactions to practice COMMIT and ROLLBACK. In the COMMIT test, I changed the available-copy value inside a transaction and committed it. As a result, the transformation became irreversible. I began the ROLLBACK test with book_id 1 showing four available copies, decreased the value within a transaction, and then ran ROLLBACK. I also started two MySQL Command Line Client sessions, and the final check showed that the value was still 4. I used SELECT... FOR UPDATE in Session A to choose the row for book_id 1. I attempted to lock the same row in Session B. After waiting for the first session to hold the lock, Session B displayed Error 1205, a lock-wait timeout. This showed that when two transactions request locks in the same row, one transaction may cause the other to wait.
To see the server's isolation configuration, I also performed SELECT @@transaction_isolation. The Portfolio 3 folder contains the transaction SQL and screenshots.
5. Portfolio 4 - NoSQL and advanced data models
I utilized MongoDB Atlas for the NoSQL part. I made a collection called books and a database called library_nosql. The fields book_id, title, author, and available_copies were added to five book records. This stored each book as a document while maintaining the same library data used in the MySQL exercise. I tested three queries: one to show every book, another to locate Hamlet, and a third to locate books with more than four copies. Additionally, I added a temporary test document, modified its available_copies value, and then removed it.
The books.json file, query script and screenshots are in the Portfolio 4 folder.
6. Portfolio 5 - Distributed and cloud database
For the cloud database exercise, I utilized MongoDB Atlas. I made a deployment called LibraryCluster. It used the free M0 tier on AWS in the Cape Town region. A three-node replica-set topology was displayed in the Atlas overview. This provided me with the chance to observe how replication may be used in the availability structure of a managed cloud database.The Atlas page indicated that backups were not active since I had not set up sharding. Backups were displayed as inactive on the Atlas page. I have include these points because they were limitations of the setup I worked with. The Portfolio 5 folder contains cluster details and annotations.
7. My reflection
Prior to working on this project, I was more acquainted with the concept of a database than with executing commands. I was able to comprehend the relationships between the tables and the necessity of primary and foreign keys by working on the library example. I also learned that a query could return the right answer but still use a less efficient way of searching the table. I was able to understand the impact an index has on the query plan thanks to the EXPLAIN experiment. Because I could observe how COMMIT and ROLLBACK affected the real book count, the transaction exercise was helpful. Additionally, the two-session exercise clarified the concept of locking, particularly when the second session had to wait before returning a timeout.
While completing the activities, I had to repeat and correct a few orders. This made me more cautious when verifying the database name, the command output, and the existence of an index or transaction. I also learned that using a cloud database doesn't mean every distributed feature is configured; I needed to check what the Atlas cluster provided.
8. Declaration of AI use
I used ChatGPT to organize sections of this report, troubleshoot various MySQL and MongoDB issues, and explain database vocabulary and procedures. I completed the MySQL and MongoDB Atlas practical exercises and verified the report's outputs and configuration information.
9. Repository and references
GitHub repository: https://github.com/telz2/advanced-database-portfolio.git
1. Oracle. (2026). MySQL 8.0 Reference Manual. https://dev.mysql.com/doc/refman/8.0/en/
2. MongoDB, Inc. (2026). MongoDB CRUD Operations. https://www.mongodb.com/docs/v8.0/crud/
3. MongoDB, Inc. (2026). Free Cluster Backups - MongoDB Atlas Documentation. https://www.mongodb.com/docs/atlas/backup/cloud-backup/free-cluster-backup/
The repository contains MySQL files, MongoDB files, README documents, and supporting evidence for the portfolio activities

