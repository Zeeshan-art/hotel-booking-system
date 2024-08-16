// stripe.js
import { loadStripe } from '@stripe/stripe-js';

// Replace 'YOUR_STRIPE_PUBLIC_KEY' with your actual public key
const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUB_KEY;

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

export default stripePromise;
