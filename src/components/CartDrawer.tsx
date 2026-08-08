import { useStore } from '@nanostores/react';
import {
  cartItems, isCartOpen, closeCart, removeFromCart, updateQuantity, cartCount,
} from '../stores/cartStore';
import { products } from '../lib/products';
import type { Lang } from '../i18n/config';
import { useTranslations } from '../i18n/utils';
import {
  drawerOverlay, drawerPanel, drawerHeader, drawerCloseBtn,
  drawerItemList, drawerItem, drawerItemImage, drawerItemInfo,
  drawerItemName, drawerItemPrice, qtyControls, qtyButton, removeBtn,
  drawerFooter, drawerSubtotal, checkoutButton, emptyCartMsg, drawerItemVariant
} from '../styles/styles';

export default function CartDrawer({ lang }: { lang: Lang }) {
  const t = useTranslations(lang);
  const open = useStore(isCartOpen);
  const items = useStore(cartItems);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <>
      <div
        className={`${drawerOverlay} ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
        aria-hidden={!open}
      />
      <aside
        className={`${drawerPanel} ${open ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Shopping cart"
      >
        <div className={drawerHeader}>
          <h2>{t('cart.title')} ({cartCount(items)})</h2>
          <button className={drawerCloseBtn} onClick={closeCart} aria-label="Close cart">×</button>
        </div>

        {items.length === 0 ? (
          <p className={emptyCartMsg}>{t('cart.empty')}</p>
        ) : (
          <ul className={drawerItemList}>
            {items.map((item) => {
              // derive variant id from the cart line id (built as `${productId}-${variantId}`)
              const product = products.find((p) => p.id === item.productId);
              const variantId =
                item.id !== item.productId ? item.id.slice(item.productId.length + 1) : undefined;
              const variant = product && variantId
                ? product.variantGroup?.options.find((o) => o.id === variantId)
                : undefined;

              const displayName = product ? product.name[lang] : item.name;
              const displayVariant = product && variant
                ? `${product.variantGroup!.label[lang]}: ${variant.label[lang]}`
                : item.variantLabel;

              return (
                <li key={item.id} className={drawerItem}>
                  {item.image && <img src={item.image} alt={displayName} className={drawerItemImage} />}
                  <div className={drawerItemInfo}>
                    <p className={drawerItemName}>{displayName}</p>
                    <p className={drawerItemPrice}>${item.price.toFixed(2)}</p>
                    {displayVariant && <p className={drawerItemVariant}>{displayVariant}</p>}
                    <div className={qtyControls}>
                      <button className={qtyButton} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button className={qtyButton} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <button className={removeBtn} onClick={() => removeFromCart(item.id)} aria-label={`Remove ${displayName}`}>×</button>
                </li>
              );
            })}
          </ul>
        )}

        {items.length > 0 && (
          <div className={drawerFooter}>
            <div className={drawerSubtotal}>
              <span>{t('cart.subtotal')}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className={checkoutButton}>{t('cart.checkout')}</button>
          </div>
        )}
      </aside>
    </>
  );
}