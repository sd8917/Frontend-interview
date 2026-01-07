
// Select the database to use.
use('BlogApp');

// Insert a few documents into the sales collection.
// db.getCollection('users').aggregate([
//     {$group: {
//       _id: "$experience",
//       users: {
//         $sum: 1
//       }
//     }},
//     {
//         $lookup: {
//           from: users,
//           localField: email,
//           foreignField: _id,
//           as: result
//         }
//     },
//     {
//         $project: {
//           experience_year: "$_id",
//           users: 1,
//           _id: 0
//         }
//     }
// ])

db.getCollection('blogs').aggregate([
  {
    $lookup: {
      from: "users",           // collection to join
      localField: "author",    // field in blogs
      foreignField: "_id",     // field in users
      as: "authorInfo"         // output array field
    }
  },
  {
    $project: {
      authorInfo: 1
    }
  }
    
])