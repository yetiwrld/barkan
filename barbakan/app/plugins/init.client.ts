export default defineNuxtPlugin(() => {
  // Initialize auth and cart from localStorage
  const auth = useAuth()
  const cart = useCart()
  auth.init()
  cart.init()
})
