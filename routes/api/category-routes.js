const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
      res.status(500).json(err);
      console.log(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
      res.status(400).json(err);
      console.log(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
          category_id: req.params.id, 
      }
  
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }    
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
});

router.delete('/:categoryid', async (req, res) => {

  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
          category_id: req.params.id, 
      }
  
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
  }
});

module.exports = router;