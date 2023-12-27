export const usePaymentStore = defineStore("payment", {
  state: () => ({
    checkoutUrl: null,
  }),
  actions: {
    async checkout(userId) {
      const { token } = getToken(); // Assuming getToken returns an object with a token

      try {
        const response = await fetch(
          `http://project110.test/api/pay/${userId}`, // Make sure this userId is correctly passed from the component
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          this.checkoutUrl = responseData.checkout_url; // Store the checkout URL in the state
          console.log(this.checkoutUrl);
        } else {
          throw new Error("Payment checkout URL fetch failed.");
        }
      } catch (error) {
        console.error(error.message);
      }
    },
  },
});
