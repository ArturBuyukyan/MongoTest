import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
  payCollection = new Mongo.Collection("payCollection");
  var match = payCollection.aggregate([
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
  ]);
  console.log(match);
});
