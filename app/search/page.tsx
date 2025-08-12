"use client"
import LocationFilter from "../filters/LocationFilter";
import { useFilters } from "../context/useFilters";

export default function SearchPage() {
  const { location, guests, priceRange } = useFilters();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Search Listings</h1>

      <div className="grid grid-cols-4 gap-6">
        {/* Left Panel: Filters */}
        <aside className="col-span-1 border rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Filters</h2>
          <LocationFilter />
        </aside>

        {/* Right Panel: Listings */}
        <section className="col-span-3">
          <h2 className="text-lg font-semibold mb-2">Current Filters</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm">
            {JSON.stringify({ location, guests, priceRange }, null, 2)}
          </pre>

          {/* Placeholder: you’ll replace this with real listings later */}
          <p className="mt-4 text-gray-600">Filtered results will go here.</p>
        </section>
      </div>
    </main>
  );
}
