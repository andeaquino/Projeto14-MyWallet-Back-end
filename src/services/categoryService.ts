import Category from '../entities/Entry';

async function findCategories() {
  const categories = await Category.find();
  return categories;
}

export { findCategories };
