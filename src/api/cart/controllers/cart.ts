import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::cart.cart",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        // Daten aus dem Request holen
        const { userName, email, products } = ctx.request.body.data;

        // Numeric IDs für Relation extrahieren
        const productIds = products.map((p: any) => p.id);

        const newCart = await strapi.db.query("api::cart.cart").create({
          data: {
            userName,
            email,
            products: productIds, // Relation korrekt speichern
            selectedOptions: products.map((p: any) => ({
              id: p.id,
              qty: p.qty ?? 1,
              selectedOptions: p.selectedOptions ?? [],
            })),
          },
        });

        return newCart;
      } catch (err) {
        ctx.throw(500, err);
      }
    },
  })
);
