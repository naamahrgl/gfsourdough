import { useState } from 'react';
import type { Product } from '../lib/products';
import type { Lang } from '../i18n/config';
import { useTranslations } from '../i18n/utils';
import { addToCart } from '../stores/cartStore';
import {
  productCard, productImage, productName, productDescription,
  productMeta, badge, badgePickup, badgeDigital,
  variantSelect, productFooter, productPrice, addToCartBtn,
} from '../styles/styles';

export default function ProductCard({ product, lang }: { product: Product; lang: Lang }) {
  const t = useTranslations(lang);
  const hasVariants = !!product.variantGroup;
  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants ? product.variantGroup!.options[0].id : undefined
  );

  const variant = hasVariants
    ? product.variantGroup!.options.find((o) => o.id === selectedVariant)
    : undefined;

  const finalPrice = product.price + (variant?.priceModifier || 0);

  const handleAddToCart = () => {
    addToCart({
      id: variant ? `${product.id}-${variant.id}` : product.id,
      productId: product.id,
      name: product.name[lang],
      price: finalPrice,
      image: product.image,
      fulfillment: product.fulfillment,
      pickupOnly: product.pickupOnly,
      variantLabel: variant
        ? `${product.variantGroup!.label[lang]}: ${variant.label[lang]}`
        : undefined,
    });
  };

  return (
    <div className={productCard}>
      <img src={product.image} alt={product.name[lang]} className={productImage} />
      <h3 className={productName}>{product.name[lang]}</h3>
      <p className={productDescription}>{product.description[lang]}</p>

      <div className={productMeta}>
        {product.pickupOnly && <span className={badgePickup}>{t('product.pickupOnly')}</span>}
        {product.fulfillment === 'digital' && <span className={badgeDigital}>{t('product.digital')}</span>}
        {product.fulfillment === 'hybrid' && <span className={badge}>{t('product.hybrid')}</span>}
      </div>

      {hasVariants && (
        <select
          className={variantSelect}
          value={selectedVariant}
          onChange={(e) => setSelectedVariant(e.target.value)}
          aria-label={product.variantGroup!.label[lang]}
        >
          {product.variantGroup!.options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label[lang]}
              {opt.priceModifier ? ` (+$${opt.priceModifier})` : ''}
            </option>
          ))}
        </select>
      )}

      <div className={productFooter}>
        <span className={productPrice}>${finalPrice.toFixed(2)}</span>
        <button className={addToCartBtn} onClick={handleAddToCart}>{t('product.addToCart')}</button>
      </div>
    </div>
  );
}