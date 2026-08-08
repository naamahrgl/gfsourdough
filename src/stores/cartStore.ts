import { atom } from 'nanostores';

export interface CartItem {
  id: string;            // unique cart line id — includes variant if present
  productId: string;     // original product id (for reference/removal grouping)
  name: string;
  price: number;         // final unit price, including variant modifier
  image?: string;
  quantity: number;
  fulfillment: 'digital' | 'physical' | 'hybrid';
  pickupOnly?: boolean;
  variantLabel?: string; // e.g. "Sourdough type: Rye" — for display in drawer
}

const STORAGE_KEY = 'cart';

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export const cartItems = atom<CartItem[]>(loadCart());
export const isCartOpen = atom<boolean>(false);

function persist(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addToCart(item: Omit<CartItem, 'quantity'>, quantity = 1) {
  const items = cartItems.get();
  const existing = items.find((i) => i.id === item.id);
  const next = existing
    ? items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i))
    : [...items, { ...item, quantity }];

  cartItems.set(next);
  persist(next);
  isCartOpen.set(true);
}

export function removeFromCart(id: string) {
  const next = cartItems.get().filter((i) => i.id !== id);
  cartItems.set(next);
  persist(next);
}

export function updateQuantity(id: string, quantity: number) {
  if (quantity <= 0) return removeFromCart(id);
  const next = cartItems.get().map((i) => (i.id === id ? { ...i, quantity } : i));
  cartItems.set(next);
  persist(next);
}

export function clearCart() {
  cartItems.set([]);
  persist([]);
}

export const openCart = () => isCartOpen.set(true);
export const closeCart = () => isCartOpen.set(false);
export const toggleCart = () => isCartOpen.set(!isCartOpen.get());

export const cartCount = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.quantity, 0);