const stripe = require("stripe")("sk_test_51PL0vKSB8s66qgzberqTaGTjmtDO4p5hJAoedqskGwShLJk9TwpvVrfV8lUhj7aQ53vOLGnAMTHQLv0ntxvnWill00pU05Zga8")

exports.checkOut = async (req, res) => {
    const { products } = req.body;
    
    const lineItems = products.map((product) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: product.name,
            },
            unit_amount: product.price * 100,
        },
        quantity: product.quantity
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {allowed_countries: ['IN', 'US', 'CA', 'GB', 'AU']},
        line_items: lineItems,
        mode: "payment",
        success_url: "https://e-commerce-nu-brown.vercel.app/success/payment",
        cancel_url:  "https://e-commerce-nu-brown.vercel.app/cancel/payment"
    });

    res.status(201).json({ id: session.id });
    
}