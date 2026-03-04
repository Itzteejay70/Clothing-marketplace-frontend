export const VENDORS_KEY = "demo_vendors_v1";
export const PRODUCTS_KEY = "demo_vendor_products_v1";
export const ORDERS_KEY = "demo_vendor_orders_v1";

export function read(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function updateById(list, id, patch) {
  return list.map((x) => (x.id === id ? { ...x, ...patch } : x));
}

export function upsertById(list, id, payload) {
  const exists = list.some((x) => x.id === id);
  return exists
    ? list.map((x) => (x.id === id ? { ...x, ...payload } : x))
    : [{ id, ...payload }, ...list];
}