The tables are organised to reduce unnecessary duplication and maintain consistent records.

First Normal Form (1NF): Each table has a primary key, and each column is designed to hold a single value for each record. The tables do not use repeating groups of values.

Second Normal Form (2NF): Each table uses a single-column primary key. The non-key attributes in each table are intended to depend on the whole primary key, so there are no partial dependencies on part of a composite key.

Third Normal Form (3NF): Book details are stored in books, member details are stored in members, and borrowing details are stored in loans. This separation avoids repeating book and member details in every loan record and is designed to prevent transitive dependencies among non-key attributes.
