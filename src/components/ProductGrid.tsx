import { products } from '../lib/products';
import ProductCard from './ProductCard';
import type { Lang } from '../i18n/config';
import { productGrid } from '../styles/styles';

export default function ProductGrid({ lang }: { lang: Lang }) {
  return (
    <div className={productGrid}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} lang={lang} />
      ))}
    </div>
  );
}