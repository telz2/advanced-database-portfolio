MIT 8103 – Advanced Database Systems
Portfolio 2: Query Optimisation
1. Introduction
This portfolio shows how to improve query performance using MySQL and the Library Management System created in Portfolio 1.
The experiment looks at how adding an index changes the way a query searches for a book by its title.
2. Objective
To examine the query execution plan before and after creating an index on the title column of the Books table.
3. Initial Query
EXPLAIN
SELECT book_id, title, author
FROM Books
WHERE title = 'Hamlet';
Initial result:
Access type: ALL
Index used: NULL
Estimated rows examined: 5
The initial query plan showed that MySQL performed a full table scan.
4. Index Creation
The following index was created:
CREATE INDEX idx_books_title
ON Books(title);
MySQL confirmed that the index was created successfully. The index was verified using:
SHOW INDEX FROM Books;
5. Query Plan After Indexing
The same query was executed again using EXPLAIN.
Observed result:
* Access type: ref
* Index used: idx_books_title
The query plan showed that MySQL used the new index to find the matching book title.
6. Conclusion
This experiment shows how indexing can influence MySQL query execution plans. The optimizer selected the title index for the exact-match query, showing how indexes help the database locate matching records.
The experiment used a small table containing five books. Therefore, the change in the query plan does not by itself establish a measurable improvement in execution time. Further testing with a larger dataset would provide a more meaningful performance comparison.
