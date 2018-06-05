'use strict';

const mongo = require('../../lib/mongo');
const ObjectID = require('mongodb').ObjectID;

class ShippingMethodsLightService {
  constructor() {}

  getMethods(filter = {}) {
    return mongo.db.collection('shippingMethods').find(filter).toArray().then(items => items.map(item => this.changeProperties(item)));
  }

  getMethodPrice(id) {
    let filter = {};
    if (id) {
      filter._id = new ObjectID(id);
    }

    return this.getMethods(filter).then(methods => {
      return methods.length > 0
        ? methods[0].price || 0
        : 0
    })
  }

  changeProperties(item) {
    if (item) {
      item.id = item._id.toString();
      delete item._id;
    }
    return item;
  }
}

module.exports = new ShippingMethodsLightService();
