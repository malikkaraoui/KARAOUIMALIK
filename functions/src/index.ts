import { onCall, HttpsError } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import Stripe from "stripe";

const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY");

export const validateStripeSession = onCall(
  {
    cors: ["https://malikkaraoui.com", "http://localhost:5173"],
    secrets: [stripeSecretKey],
    region: "europe-west1",
    timeoutSeconds: 10,
    enforceAppCheck: false,
  },
  async (request) => {
    const { session_id } = request.data as { session_id?: string };

    if (!session_id || !session_id.startsWith("cs_")) {
      throw new HttpsError("invalid-argument", "Invalid session_id format");
    }

    const stripe = new Stripe(stripeSecretKey.value(), {
      apiVersion: "2025-02-24.acacia" as const,
    });

    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);

      const isPaid =
        session.status === "complete" &&
        session.payment_status === "paid";

      if (!isPaid) {
        return { valid: false };
      }

      const platform = session.metadata?.platform;

      if (platform !== "macos" && platform !== "windows") {
        return { valid: false };
      }

      return { valid: true, platform };
    } catch (error: unknown) {
      if (
        error instanceof Stripe.errors.StripeInvalidRequestError &&
        error.statusCode === 404
      ) {
        return { valid: false };
      }
      console.error("Stripe validation error:", error);
      throw new HttpsError("internal", "Validation failed");
    }
  }
);
