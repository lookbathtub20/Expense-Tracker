const CATEGORIES = ['All', 'Food', 'Travel', 'Bills', 'Other']

// CategoryFilter receives the selected category and change callback through props; App owns the filter state.
function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="field-group">
      <label htmlFor="category-filter">Filter by category</label>
      <select
        id="category-filter"
        data-cy="filter"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        {CATEGORIES.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CategoryFilter
