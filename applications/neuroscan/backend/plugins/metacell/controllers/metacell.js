'use strict';

/**
 * import-csv.js controller
 *
 * @description: A set of functions called "actions" of the `import-csv` plugin.
 */

module.exports = {
  webm2avi: async ctx => {
    const services = strapi.plugins["metacell"].services;
    try {
      const data = await services["metacell"].webm2avi(ctx);
      ctx.send(data);
    } catch (error) {
      console.error(error);
      ctx.response.status = 406;
      ctx.response.message = "could convert webm2avi: " + error;
    }
  },
};
