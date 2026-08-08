export const hamburger =
  "flex flex-col justify-between w-16 h-8 cursor-pointer group lg:hidden";
export const line = "block h-0.5 w-full bg-[var(--light)] mb-1 group-hover:bg-black";
export const navlinks =
  `
  hidden
  lg:flex
  gap-7
  bg-[var(--accent)]
  p-4
  z-50
  lg:static
  fixed inset-0
flex
items-center 
justify-center
text-center
flex-col
md:flex-row
  `;
export const navlinkItem = "text-[var(--light)]    hover:text-[var(--main)] transition-colors duration-150";
export const header =
  "relative    p-4 bg-[var(--accent)] flex items-center justify-between  pt-12 top-0 z-50 ";
export const logo = "flex items-center gap-2";  
export const langlink =
  "text-[10px] md:text-sm text-[var(--light)] hover:text-black transition-colors duration-150";

export const footer = "w-full bg-[var(--main)]  text-[var(--light)] text-sm";
export const footerContainer = "max-w-6xl mx-auto px-4 py-10 flex justify-between";
export const footerSection = "w-1/3 text-center break-words"; 
export const footerHeading = "font-semibold mb-2"; 
export const footerText = "text-brand-text-light mb-2"; 
export const socialContainer = "flex items-center justify-center gap-2 mt-2";
export const socialIcon = "w-6 h-6";
export const copyright = "text-center text-xs text-brand-text-light pt-4";
// example additions to styles/styles.ts
export const footerNavContainer = "flex flex-col gap-2"; // חשוב: אין 'hidden' כאן
export const footerLink = "text-sm hover:underline hover:text-brand-dark inline-block mr-2"; // זה שהדגמתי קודם

export const cartButton = "relative bg-none border-none cursor-pointer p-2 flex items-center";
export const iconButton = "w-8 h-8 flex items-center justify-center text-black";
export const cartBadge = "absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[var(--brand-text-dark)] bg-[#d0b8a8]";

export const drawerOverlay = "fixed inset-0 bg-black/40 z-40 transition-opacity duration-300";
export const drawerPanel = "fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl flex flex-col transition-transform duration-300 ease-in-out";
export const drawerHeader = "flex items-center justify-between px-4 py-4 border-b";
export const drawerCloseBtn = "text-2xl  px-2 bg-gray-700 hover:bg-gray-900 rounded cursor-pointer";
export const drawerItemList = "flex-1 overflow-y-auto divide-y";
export const drawerItem = "flex gap-3 px-4 py-4 items-start ";
export const drawerItemImage = "w-16 h-16 object-cover rounded";
export const drawerItemInfo = "flex-1";
export const drawerItemName = "font-medium text-sm text-black";
export const drawerItemPrice = "text-sm text-red-600 font-semibold";
export const drawerItemVariant = "text-xs text-gray-500";
export const qtyControls = "flex items-center gap-2 mt-2 text-sm text-gray-700";
export const qtyButton = "w-6 h-6 border rounded flex items-center justify-center";
export const removeBtn = "text-gray-400 hover:text-black px-1";
export const drawerFooter = "border-t px-4 py-4 space-y-3";
export const drawerSubtotal = "flex justify-between font-semibold";
export const checkoutButton = "w-full py-3 bg-black text-white rounded";
export const emptyCartMsg = "px-4 py-8 text-center text-gray-500";

export const productGrid = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-6";
export const productCard = "border rounded-lg p-4 flex flex-col gap-2 bg-white shadow-sm";
export const productImage = "w-full h-48 object-cover rounded";
export const productName = "font-semibold text-lg";
export const productDescription = "text-sm text-gray-600 flex-1";
export const productMeta = "flex gap-2 flex-wrap";
export const badge = "text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700";
export const badgePickup = "text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800";
export const badgeDigital = "text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800";
export const variantSelect = "border rounded px-2 py-1 text-sm text-gray-700 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
export const productFooter = "flex items-center justify-between mt-2";
export const productPrice = "font-semibold text-lg text-red-600";
export const addToCartBtn = "px-4 py-2 bg-black text-white rounded text-sm";