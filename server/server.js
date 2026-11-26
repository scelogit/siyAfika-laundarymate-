
// Import required packages
const express = require("express");
const OpenAI = require("openai");
const cors = require("cors");
require("dotenv").config();
console.log("API key loaded:", Boolean(process.env.OPENAI_API_KEY));

// Create Express application
const app = express();

// Set the server port
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Test route
app.get("/", (req, res) => {
    res.send("SiyAfika AI server is running!");
});

// Chatbot route
app.post("/api/chat", async (req, res) => {

    try {

        // Get customer's message
        const message = req.body.message;

        // Check if message is empty
        if (!message || typeof message !== "string" || !message.trim()) {
            return res.status(400).json({
                error: "Please enter a message."
            });
        }

        // Ask AI to generate a response
        const response = await openai.responses.create({

            model: "gpt-5.5",

            instructions: `
                You are SiyAfika AI, the friendly customer assistant
                for SiyAfika Laundromat in Inanda Newtown, Durban,
                South Africa.

                Your job is to help customers with laundry services,
                prices, business hours, location and car hire.

                BUSINESS INFORMATION:

                Laundry services:
                - Wash, Rinse and Fold
                - Color-separated washing
                - Commercial washing
                - Eco-friendly washing
                - Stain removal

                BASKET PRICES:
                - Small: R100
                - Large: R150
                - X Large: R180

                BLANKET PRICES:
                - Small: R80
                - Medium: R120
                - Large: R150

                OTHER PRICES:
                - Delivery starts from R40
                - Dry only starts from R50

                OTHER SERVICES:
                - 7-seater car hire, which can also be used as a van.

                CONTACT INFORMATION:
                - Phone: 061 442 2382
                - Phone: 079 862 3910
                - Email: siyafikalaundromat@gmail.com
                - Address: A1305 Freedom Charter Street,
                  Inanda Newtown, eThekwini, South Africa.

                BUSINESS HOURS:
                Monday to Sunday, 7 AM to 6 PM.

                IMPORTANT RULES:
                - Be friendly and professional.
                - Keep answers simple and helpful.
                - Use South African Rand (R) for prices.
                - Never invent prices, services or business policies.
                - If you do not know something, tell the customer
                  to contact the business.
                - Do not claim that a booking or pickup has been
                  confirmed.
                - You cannot process payments or bookings.
                - Encourage customers to use WhatsApp when they
                  need personal assistance.
                - WhatsApp: https://wa.me/27614422382
            `,

            input: message

        });

        // Send AI response back to website
        res.json({
            reply: response.output_text
        });

    } catch (error) {

        console.error("Chatbot error:", error);

        res.status(500).json({
            error: "Sorry, something went wrong. Please try again."
        });

    }

});

// Start server
app.listen(PORT, () => {
    console.log(`SiyAfika server running at http://localhost:${PORT}`);
});
