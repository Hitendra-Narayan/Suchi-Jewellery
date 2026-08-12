import { Product } from '../types';

/**
 * Enhanced search matcher for Suchi Jewellery products.
 * Handles category names, tags, description, material specs, and singular/plural variations.
 */
export function filterProductsByQuery(products: Product[], query: string): Product[] {
  if (!query || !query.trim()) return products;

  const cleanQuery = query.trim().toLowerCase();
  
  // Plural/singular normalization map for jewellery terms
  const searchTerms = [cleanQuery];
  if (cleanQuery.endsWith('s')) {
    searchTerms.push(cleanQuery.slice(0, -1));
  } else {
    searchTerms.push(cleanQuery + 's');
  }

  return products.filter((p) => {
    const name = p.name.toLowerCase();
    const cat = p.category.toLowerCase();
    const tags = p.tags.map((t) => t.toLowerCase()).join(' ');
    const desc = p.description.toLowerCase();
    const material = p.specifications?.material?.toLowerCase() || '';
    const finish = p.specifications?.finish?.toLowerCase() || '';
    const stoneType = p.specifications?.stoneType?.toLowerCase() || '';

    const fullText = `${name} ${cat} ${tags} ${desc} ${material} ${finish} ${stoneType}`;

    return searchTerms.some((term) => fullText.includes(term));
  });
}
