export interface LocalizedText {
  en: string;
  he: string;
}

export interface VariantOption {
  id: string;
  label: LocalizedText;
  priceModifier?: number;
}

export interface Product {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  image: string;
  fulfillment: 'digital' | 'physical' | 'hybrid';
  pickupOnly?: boolean;
  variantGroup?: {
    label: LocalizedText;
    options: VariantOption[];
  };
}

export const products: Product[] = [
  {
    id: 'sourdough-course-kit',
    name: { en: 'Sourdough Course Kit', he: 'ערכת קורס מחמצת' },
    description: {
      en: 'The full experience — a physical starter and recipe notebook, plus digital course access.',
      he: 'החוויה המלאה — מחמצת פיזית ומחברת מתכונים, בתוספת גישה דיגיטלית לקורס.',
    },
    price: 89,
    image: '/Logo.jpg',
    fulfillment: 'hybrid',
    variantGroup: {
      label: { en: 'Sourdough type', he: 'סוג מחמצת' },
      options: [
        { id: 'classic', label: { en: 'Classic White', he: 'קלאסי לבן' } },
        { id: 'rye', label: { en: 'Rye', he: 'שיפון' } },
        { id: 'spelt', label: { en: 'Spelt', he: 'כוסמין' }, priceModifier: 5 },
      ],
    },
  },
  // ...same pattern for the other products
];