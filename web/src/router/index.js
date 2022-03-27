import Vue from "vue";
import VueRouter from "vue-router";
import product from "../pages/product/Product.vue";
import productIndex from "../pages/product/private/Index.vue";
import productDetails from "../pages/product/private/Details.vue";

Vue.use(VueRouter);

const routes = [

    {
      path : '/products',
      name : 'productIndex',
      component : productIndex,
    },
    {
        path: "/products/details/:name",
        name: "productDetails",
        component: productDetails,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

// router.beforeEach((to, from, next) => {
//   console.log("from global",to,'-',from,'-',next);
//   next();
// })

export default router;
