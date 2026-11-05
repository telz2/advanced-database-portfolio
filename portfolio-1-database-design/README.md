MIT 8103 – Advanced Database Systems
Portfolio 1: Database Design
Portfolio 1: Database Design and Modelling
Library Management System
1. Case Study
The Library Management System is designed to organise basic library records and keep track of books, registered members, and book loans. The database stores information about books available in the library, members who use the library, and borrowing transactions that connect members to the books they borrow.

The database is named library_management and was implemented using MySQL 8.0.46.
2. Database Tables
The database contains three tables: books, members, and loans.
Books
The books table stores information about each book.
Column	Data type	Constraint / purpose
book_id	INT	Primary key; auto-increment
title	VARCHAR(150)	NOT NULL
author	VARCHAR(100)	NOT NULL
available_copies	INT	NOT NULL; CHECK value is 0 or greater


Members
The members table stores information about people registered with the library.
Column	Data type	Constraint / purpose
member_id	INT	Primary key; auto-increment
full_name	VARCHAR(100)	NOT NULL
email	VARCHAR(100)	UNIQUE; nullable
phone	VARCHAR(20)	Nullable


Loans
The loans table records books borrowed by members.
Column	Data type	Constraint / purpose
loan_id	INT	Primary key; auto-increment
member_id	INT	NOT NULL; foreign key referencing members.member_id
book_id	INT	NOT NULL; foreign key referencing books.book_id
borrow_date	DATE	NOT NULL
due_date	DATE	NOT NULL
return_date	DATE	Nullable; remains NULL until a return date is recorded


3. Entity Relationships
The database has the following relationships:
- Members to Loans: One member can have many loan records. Each loan record belongs to one member.
- Books to Loans: One book can appear in many loan records over time. Each loan record refers to one book.
The loans table connects the members and books tables through the foreign keys member_id and book_id.
4. Relational Schema
BOOKS(
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    author VARCHAR(100) NOT NULL,
    available_copies INT NOT NULL CHECK (available_copies >= 0)
)

MEMBERS(
    member_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20)
)

LOANS(
    loan_id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT NOT NULL,
    book_id INT NOT NULL,
    borrow_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE,
    FOREIGN KEY (member_id) REFERENCES MEMBERS(member_id),
    FOREIGN KEY (book_id) REFERENCES BOOKS(book_id)
)
5. Keys and Constraints
Primary keys
- books.book_id uniquely identifies each book.
- members.member_id uniquely identifies each member.
- loans.loan_id uniquely identifies each loan record.
Foreign keys
- loans.member_id references members.member_id.
- loans.book_id references books.book_id.
Other constraints
- Required fields are defined with NOT NULL.
- The members.email column has a UNIQUE constraint. It is nullable, so an email address is not compulsory.
- The books.available_copies column has a CHECK constraint to prevent a negative number of available copies.
- loans.return_date is nullable because a book may not yet have been returned.
6. Database Normalisation
The tables are organised to reduce unnecessary duplication and maintain consistent records.

First Normal Form (1NF): Each table has a primary key, and each column is designed to hold a single value for each record. The tables do not use repeating groups of values.

Second Normal Form (2NF): Each table uses a single-column primary key. The non-key attributes in each table are intended to depend on the whole primary key, so there are no partial dependencies on part of a composite key.

Third Normal Form (3NF): Book details are stored in books, member details are stored in members, and borrowing details are stored in loans. This separation avoids repeating book and member details in every loan record and is designed to prevent transitive dependencies among non-key attributes.
