import { useFilters } from "../context/useFilters";

export default function LocationFilter() {
  const location = useFilters((state) => state.location);
  const setFilter = useFilters((state) => state.setFilter);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Location</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setFilter("location", e.target.value)}
        className="w-full border rounded px-3 py-2"
        placeholder="Try 'Goa' or 'Manali'"
      />
    </div>
  );
}
