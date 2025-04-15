// script.js

// Initialize Stripe with your publishable key
const stripe = Stripe('your-publishable-key-here');

// Attach event listeners to all "Buy Now" buttons
document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', async () => {
        try {
            // Fetch the checkout session ID from your server
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product: button.closest('.product').querySelector('h2').innerText,
                    price: button.closest('.product').querySelector('.price').innerText,
                }),
            });

            // Parse the JSON response from the server
            const session = await response.json();

            // Redirect to the Stripe Checkout page
            const result = await stripe.redirectToCheckout({ sessionId: session.id });

            // Handle any errors that occur during redirection
            if (result.error) {
                alert
