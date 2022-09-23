const getTitle = (
  curMainCategoryName: string | null,
  curSubCategoryName: string | null,
  curSubSubCategoryName: string | null,
) => {
  if(!curMainCategoryName) return 'Выберите категорию';
  if(!!curMainCategoryName && !curSubCategoryName) {
    return curMainCategoryName;
  }
  if(!curSubSubCategoryName) {
    return `${curMainCategoryName} | ${curSubCategoryName}`;
  }
  return `${curMainCategoryName} | ${curSubCategoryName} | ${curSubSubCategoryName}`;
};

export default getTitle;