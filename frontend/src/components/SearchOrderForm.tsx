
const options = [
  { value: "orderId", label: "OrderId" },
  { value: "mobile", label: "Mobile" },
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
];

const placeholders: Record<string, string> = {
  orderId: "Enter Order ID...",
  mobile: "Enter Mobile...",
  name: "Enter Name...",
  email: "Enter Email...",
};

interface SearchOrderFormProps {
  by: string;
  value: string;
  onByChange: (by: string) => void;
  onValueChange: (value: string) => void;
  onSearch: () => void;
}

const SearchOrderForm = ({
  by,
  value,
  onByChange,
  onValueChange,
  onSearch,
}: SearchOrderFormProps) => {
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg bg-white p-6 shadow"
    >
      <h2 className="mb-4 text-lg font-bold text-gray-800">
        Search Order
      </h2>

      <div className="flex flex-wrap items-center gap-4">
        <span className="font-medium text-gray-700">
          By:
        </span>

        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 text-gray-700"
          >
            <input
              type="radio"
              name="by"
              value={option.value}
              checked={by === option.value}
              onChange={() => onByChange(option.value)}
              className="h-4 w-4 accent-blue-600"
            />
            {option.label}
          </label>
        ))}

        <input
          type="text"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder={placeholders[by]}
          className="min-w-[260px] flex-1 rounded border border-gray-300 p-3"
        />

        <button
          type="submit"
          className="flex items-center gap-2 rounded bg-green-600 px-8 py-3 font-bold text-white hover:bg-green-700"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <path
              d="M20 20l-3.5-3.5"
              strokeLinecap="round"
            />
          </svg>
          SEARCH ORDER
        </button>
      </div>
    </form>
  );
};

export default SearchOrderForm;
