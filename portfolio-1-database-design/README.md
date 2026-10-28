MIT 8103 – Advanced Database Systems
Portfolio 1: Database Design
Case Study: Library Management System
1. Introduction
This project shows how to use MySQL to build and implement a relational database for a library management system.
The system uses primary keys, foreign keys, and constraints to manage library patrons, books, and book loans while preserving data integrity.
2. Database Tables
There are three primary tables in the library_management database:
Members: Store details about members, such as member ID, complete name, phone number, email address, and copies that are available.
Books: Stores details about books, such as their ID, title, author, and number of copies that are available.
Loans: Keeps track of book loans, including loan ID, member ID, book ID, borrow date, due date, and return date.
3. Relationships
One member may have more than one loan record.
Over time, a single book can appear  in several lending records.
Each loan record references one member and one book.
Foreign keys are used by the Loans table to link the Members and Books tables.
4. Constraints and Keys
Primary keys: Give each table's records a unique identity.
Foreign keys: Maintain connections among books, members, and loans.
NOT NULL: Verifies that necessary fields contain values.
UNIQUE: Prevents the Members table from having multiple email addresses.
CHECK: Ensures the number of available book copies is not negative.
AUTO_INCREMENT: Creates IDs for new records automatically.
5. Normalization
To prevent needless data duplication and maintain data integrity, the database divides loan transactions, book details, and member details into separate tables.
The entire schema and its functional dependencies should be used to evaluate any additional normalization.
6. Conclusion
This project shows how to use MySQL to construct a relational database, including table setup, relationships, key restrictions, and sample data for a library management system.
