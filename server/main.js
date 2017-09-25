import { Meteor } from "meteor/meteor";
var ObjectID = require("mongodb").ObjectID;
Meteor.startup(() => {
  payCollection = new Mongo.Collection("payCollection");
  var match = payCollection.aggregate(
    [
      {
        $group: {
          _id: {
            userId: "$userId",
            productName: "$productName"
          },
          units: {
            $sum: "$units"
          },
          payment: {
            $sum: "$payment"
          }
        }
      },
      {
        $project: {
          payment: 1,
          units: 1,
          userId: "$_id.userId",
          productName: "$_id.productName",
          averagePrice: {
            $divide: ["$payment", "$units"]
          }
        }
      },
      {
        $project: {
          _id: 0,
          userId: 1,
          productName: 1,
          averagePrice: 1
        }
      }
    ],
    { allowDiskUse: true }
  );
  console.log("Explain Report:", JSON.stringify(match));
  console.log("Group Count Result:", Object.keys(match).length);
  console.log("Collection Row Count:", payCollection.find().count());
  // function randomString(length, chars) {
  //   var result = "";
  //   for (var i = length; i > 0; --i)
  //     result += chars[Math.floor(Math.random() * chars.length)];
  //   return result;
  // }
  // function randomInteger(min, max) {
  //   var rand = min - 0.5 + Math.random() * (max - min + 1);
  //   rand = Math.round(rand);
  //   return rand;
  // }
  // var mongoObjectId = function() {
  //   var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  //   return (
  //     timestamp +
  //     "xxxxxxxxxxxxxxxx"
  //       .replace(/[x]/g, function() {
  //         return ((Math.random() * 16) | 0).toString(16);
  //       })
  //       .toLowerCase()
  //   );
  // };
  // for (i = 0; i < 200000; i++) {
  //   payCollection.insert({
  //     id: i,
  //     userId: randomInteger(10000, 199999),
  //     productName: "shoeds",
  //     units: 12,
  //     payment: 36,
  //     transactionDate: "1-1-1977"
  //   });
  // }
});
