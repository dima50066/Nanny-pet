interface FiltersProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedFilter,
  onFilterChange,
}) => {
  return (
    <div className="relative inline-block w-48 mb-6">
      <select
        value={selectedFilter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-main focus:border-main"
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
