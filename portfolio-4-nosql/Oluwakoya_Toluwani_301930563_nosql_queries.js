use("library_nosql");

// 1. Display all books
db.books.find();

// 2. Find Hamlet
db.books.find({ title: "Hamlet" });

// 3. Find books with more than 4 available copies
db.books.find({
    available_copies: { $gt: 4 }
});

// 4. Update the temporary test book
db.books.updateOne(
    { book_id: 99 },
    { $set: { available_copies: 3 } }
);

// 5. Delete the temporary test book
db.books.deleteOne({ book_id: 99 });
