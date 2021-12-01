'use strict';
const path = require('path');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 module.exports = {
   async redirectToPromotorDb(ctx, next) {
    ctx.url = path.basename(`${ctx.url}/index.html`);
    await next();
   },
 };
