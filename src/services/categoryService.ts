import Category from '../entities/Category';

async function findCategories() {
  const categories = await Category.find();
  return categories;
}

async function findCategoryEntries(userId: number) {
  const categories = await Category.findEntries(userId);
  return categories;
}

export { findCategories, findCategoryEntries };
