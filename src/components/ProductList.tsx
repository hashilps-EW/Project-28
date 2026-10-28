import { useProducts } from '../hooks/useProducts';
import { useProductFilters } from '../hooks/useProductFilters';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { ProductFilters } from './ProductFilters';

export function ProductList() {
  const { data: products, isLoading, error } = useProducts();
  const {
    filters,
    filteredProducts,
    setSearch,
    setCategory,
    setMaxPrice,
    setSortBy,
    clearFilters,
    categories,
  } = useProductFilters(products || []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">Error loading products. Please try again later.</div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600 dark:text-gray-400">No products available.</div>
      </div>
    );
  }

  return (
    <div>
      <ProductFilters
        search={filters.search}
        category={filters.category}
        maxPrice={filters.maxPrice}
        sortBy={filters.sortBy}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onMaxPriceChange={setMaxPrice}
        onSortByChange={setSortBy}
        onClearFilters={clearFilters}
      />
      {filteredProducts.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600 dark:text-gray-400">No products match your filters.</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
