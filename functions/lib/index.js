"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStripeSession = void 0;
const https_1 = require("firebase-functions/v2/https");
const params_1 = require("firebase-functions/params");
const stripe_1 = require("stripe");
const stripeSecretKey = (0, params_1.defineSecret)("STRIPE_SECRET_KEY");
exports.validateStripeSession = (0, https_1.onCall)({
    cors: ["https://malikkaraoui.com", "http://localhost:5173"],
    secrets: [stripeSecretKey],
    region: "europe-west1",
    timeoutSeconds: 10,
    enforceAppCheck: false,
}, async (request) => {
    var _a;
    const { session_id } = request.data;
    if (!session_id || !session_id.startsWith("cs_")) {
        throw new https_1.HttpsError("invalid-argument", "Invalid session_id format");
    }
    const stripe = new stripe_1.default(stripeSecretKey.value(), {
        apiVersion: "2025-02-24.acacia",
    });
    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const isPaid = session.status === "complete" &&
            session.payment_status === "paid";
        if (!isPaid) {
            return { valid: false };
        }
        const platform = (_a = session.metadata) === null || _a === void 0 ? void 0 : _a.platform;
        if (platform !== "macos" && platform !== "windows") {
            return { valid: false };
        }
        return { valid: true, platform };
    }
    catch (error) {
        if (error instanceof stripe_1.default.errors.StripeInvalidRequestError &&
            error.statusCode === 404) {
            return { valid: false };
        }
        console.error("Stripe validation error:", error);
        throw new https_1.HttpsError("internal", "Validation failed");
    }
});
//# sourceMappingURL=index.js.map