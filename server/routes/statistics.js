const express = require('express');
const { List } = require('../models/list');
const router = express.Router();

router.get('/', async (request, response) => {
  const items = await List.find({ user: request.user._id }).select('items');
  const topItems = items
    .reduce((prev, curr) => prev.concat(curr.items), [])
    .map((item) => ({
      _id: item._id,
      name: item.name,
      quantity: item.quantity,
    }))
    .reduce((prev, curr) => {
      const item = prev.find((p) => p.name === curr.name);
      if (item) {
        item.quantity += curr.quantity;
      } else {
        return prev.concat(curr);
      }
      return prev;
    }, [])
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 3);

  const topCategories = items
    .reduce(
      (prev, curr) =>
        prev.concat(
          curr.items.map((i) => ({
            _id: i.category._id,
            name: i.category.name,
            quantity: i.quantity,
          }))
        ),
      []
    )
    .reduce((prev, curr) => {
      const category = prev.find((p) => p.name === curr.name);
      if (category) {
        category.quantity += curr.quantity;
      } else {
        return prev.concat(curr);
      }
      return prev;
    }, [])
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 3);

  const itemsPerMonth = items
    .map((i) => ({
      month: new Intl.DateTimeFormat('en', { month: 'long' }).format(
        i._id.getTimestamp()
      ),
      items: i.items
        .map((j) => j.quantity)
        .reduce((prev, current) => prev + current, 0),
    }))
    .reduce((prev, curr) => {
      const el = prev.find((p) => p.month === curr.month);
      if (el) {
        el.items += curr.items;
      } else {
        return prev.concat(curr);
      }
      return prev;
    }, []);

  const totalItems = items.reduce(
    (prev, curr) => prev + curr.items.reduce((p, c) => p + c.quantity, 0),
    0
  );

  response.send({ topItems, topCategories, itemsPerMonth, totalItems });
});

module.exports = router;
