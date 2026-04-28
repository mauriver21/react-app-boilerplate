export interface PaginationProps {
  totalPages?: number;
  onChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onChange,
}) => {
  return (
    <div>
      {Array(totalPages)
        .fill(0)
        .map((_, index) => (
          <button
            key={index}
            onClick={() => {
              onChange?.(index);
            }}
          >
            {index}
          </button>
        ))}
    </div>
  );
};
