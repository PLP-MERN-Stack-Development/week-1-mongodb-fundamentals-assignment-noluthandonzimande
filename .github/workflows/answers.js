// Task 2: Basic CRUD Operations

// 1. Find all books in a specific genre
db.books.find({ genre: "Fiction" })

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 1950 } })

// 3. Find books by a specific author
db.books.find({ author: "George Orwell" })

// 4. Update the price of a specific book
db.books.updateOne(
  { title: "1984" },
  { $set: { price: 13.99 } }
)

// 5. Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" })



// Task 3: Advanced Queries

// 1. 
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

// 2. 
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
)

// 3. 
db.books.find().sort({ price: 1 })

// 4. 
db.books.find().sort({ price: -1 })

// 5. 
db.books.find().skip(0).limit(5)

// 6. 
db.books.find().skip(5).limit(5)


// Task 4: Aggregation Pipelines

// 1. 
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// 2. 
db.books.aggregate([
  { $group: { _id: "$author", totalBooks: { $sum: 1 } } },
  { $sort: { totalBooks: -1 } },
  { $limit: 1 }
])

// 3. 
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $substr: ["$published_year", 0, 3] },
          "0s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])


// Task 5: Indexing

// 1. 
db.books.createIndex({ title: 1 })

// 2. 
db.books.createIndex({ author: 1, published_year: 1 })

// 3. 
db.books.find({ title: "The Alchemist" }).explain("executionStats")
