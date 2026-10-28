import { useState, useMemo } from 'react';
import type { Product } from '../lib/validation';

interface Filters {
  search: string;
  category: string;
  maxPrice: number;
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'rating' | 'title';
}

export function useProductFilters(products: Product[]) {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: '',
    maxPrice: Infinity,
    sortBy: 'default',
  });

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === '' || product.category === filters.category;
      const matchesPrice = product.price <= filters.maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });

    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return result;
  }, [products, filters]);

  const setSearch = (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const setCategory = (category: string) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const setMaxPrice = (maxPrice: number) => {
    setFilters((prev) => ({ ...prev, maxPrice }));
  };

  const setSortBy = (sortBy: Filters['sortBy']) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  const clearFilters = () => {
    setFilters({ search: '', category: '', maxPrice: Infinity, sortBy: 'default' });
  };

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  return {
    filters,
    filteredProducts,
    setSearch,
    setCategory,
    setMaxPrice,
    setSortBy,
    clearFilters,
    categories,
  };
}
