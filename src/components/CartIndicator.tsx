import { useStore } from '@nanostores/react';
import { cartItems, cartCount } from '../stores/cartStore';
import { cartBadge } from '../styles/styles';

export default function CartIndicator() {
  const items = useStore(cartItems);
  const count = cartCount(items);

  if (count === 0) return null;

  return <span className={cartBadge} aria-label={`${count} items in cart`} />;
}