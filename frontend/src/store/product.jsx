import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = res.json();
    set((state) => ({ products: [...state.products, data.data] })); // Optimistic update
    get.fetchProducts(); // Refetch to get fresh data from the server
    return { success: true, message: "Added product successfully." };
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },
  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (!data.success) {
      return { success: data.success, message: data.message };
    }
    // updating product list without need to resfresh page
    set((state) => ({
      products: state.products.filter((product) => product._id !== product.pid),
    }));
    return { success: data.success, message: data.message };
  },
  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) {
      return { success: data.success, message: data.message };
    }
    // updating product list without need to resfresh page
    set((state) => ({
      products: state.products.map((product) =>
        product._id === id ? data.data : product
      ),
    }));
    return { success: data.success, message: data.message };
  },
}));

// export const useProductStore = create((set) => ({
//   products: [],
//   addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
//   removeProduct: (productId) => set((state) => ({
//     products: state.products.filter(product => product.id !== productId)
//   })),
//   updateProduct: (productId, updatedProduct) => set((state) => ({
//     products: state.products.map(product =>
//       product.id === productId ? { ...product, ...updatedProduct } : product
//     )
//   })),
//   getProduct: (productId) => (state) => state.products.find(product => product.id === productId),
//   clearProducts: () => set({ products: [] }),
//   countProducts: () => (state) => state.products.length,
//   findProductsByName: (name) => (state) => state.products.filter(product => product.name.includes(name)),
//   resetProducts: () => set({ products: [] }),
// }));
