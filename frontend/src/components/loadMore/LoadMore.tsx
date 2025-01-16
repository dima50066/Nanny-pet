interface LoadMoreProps {
  onClick: () => void;
}

const LoadMore: React.FC<LoadMoreProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 bg-main text-white rounded-lg hover:bg-green-700 transition"
    >
      Load More
    </button>
  );
};

export default LoadMore;
