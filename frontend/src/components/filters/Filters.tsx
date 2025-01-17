interface FiltersProps {
  filters: {
    sortBy: string;
    order: string;
    priceRange?: string;
    rating?: number;
  };
  onFilterChange: (filters: Partial<FiltersProps["filters"]>) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    // Очищуємо старі фільтри перед відправкою нових
    let newFilters: Partial<FiltersProps["filters"]> = {};

    switch (value) {
      case "A to Z":
        newFilters = { sortBy: "name", order: "asc" };
        break;
      case "Z to A":
        newFilters = { sortBy: "name", order: "desc" };
        break;
      case "Less than 10$":
        newFilters = { priceRange: "0-10" };
        break;
      case "Greater than 10$":
        newFilters = { priceRange: "10-100" };
        break;
      case "Popular":
        newFilters = { sortBy: "rating", order: "desc" };
        break;
      case "Not popular":
        newFilters = { sortBy: "rating", order: "asc" };
        break;
      case "Show all":
        newFilters = {}; // Скидаємо всі фільтри
        break;
      default:
        break;
    }

    // Передаємо нові фільтри в Redux
    onFilterChange(newFilters);
  };

  const getSelectValue = () => {
    if (filters.sortBy === "name") {
      return filters.order === "asc" ? "A to Z" : "Z to A";
    } else if (filters.priceRange === "0-10") {
      return "Less than 10$";
    } else if (filters.priceRange === "10-100") {
      return "Greater than 10$";
    } else if (filters.sortBy === "rating") {
      return filters.order === "desc" ? "Popular" : "Not popular";
    }
    return "Show all";
  };

  return (
    <div className="mb-6">
      <select
        value={getSelectValue()}
        onChange={handleChange}
        className="block w-full p-2 mb-4 border rounded-md"
      >
        <option value="A to Z">A to Z</option>
        <option value="Z to A">Z to A</option>
        <option value="Less than 10$">Less than 10$</option>
        <option value="Greater than 10$">Greater than 10$</option>
        <option value="Popular">Popular</option>
        <option value="Not popular">Not popular</option>
        <option value="Show all">Show all</option>
      </select>
    </div>
  );
};

export default Filters;
