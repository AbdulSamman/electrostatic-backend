import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::cart.cart", // wir behalten die Cart-API als Haupt-Endpoint
  ({ strapi }) => ({
    // Cart erstellen
    async create(ctx) {
      try {
        const { userName, email, products } = ctx.request.body.data;

        const productIds = products.map((p: any) => p.id);

        const newCart = await strapi.db.query("api::cart.cart").create({
          data: {
            userName,
            email,
            products: productIds,
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

    // Dashboard-Order erstellen (vom Cart aus)
    async sendToDashboard(ctx) {
      try {
        const { userId, userName, email, items, orderStatus } =
          ctx.request.body;

        const dashboardOrder = await strapi.db
          .query("api::dashboard.dashboard")
          .create({
            data: {
              userId,
              userName,
              email,
              orderStatus: orderStatus || "pending",
              items: items.map((i: any) => ({
                title: i.product.title,
                bannerUrl: i.product.banner?.url ?? null,
                price: i.product.price,
                qty: i.qty ?? 1,
                selectedOptions: i.selectedOptions ?? [],
              })),
            },
          });

        // Vollständiges Dashboard-Objekt zurückgeben
        const fullOrder = await strapi.db
          .query("api::dashboard.dashboard")
          .findOne({
            where: { id: dashboardOrder.id },
            populate: ["items", "items.product"],
          });

        return fullOrder;
      } catch (err) {
        ctx.throw(500, err);
      }
    },

    // Dashboard-Orders abrufen
    async getDashboard(ctx) {
      try {
        return await strapi.db.query("api::dashboard.dashboard").findMany({
          orderBy: { createdAt: "desc" },
        });
      } catch (err) {
        ctx.throw(500, err);
      }
    },
  })
);
