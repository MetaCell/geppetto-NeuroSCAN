'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const {sanitizeEntity} = require('strapi-utils');

module.exports = {
    async find(ctx) {
        const terms = ctx.query.terms ? ctx.query.terms.split(',') : [];
        const page = parseInt(ctx.query._start || "0");
        const limit = parseInt(ctx.query._limit || "30");
        const timepoint = ctx.query.timepoint

        const entities = await strapi.services.contact.customSearch(timepoint, terms, page, limit);
        return entities.map(entity => {
            return sanitizeEntity(entity, {
                model: strapi.models.contact,
            });
        });
    },
    async count(ctx) {
        const terms = ctx.query.terms ? ctx.query.terms.split(',') : [];
        const page = parseInt(ctx.query._start || "0");
        const limit = parseInt(ctx.query._limit || "30");
        const timepoint = ctx.query.timepoint

        ctx.send(await strapi.services.contact.customSearchCount(timepoint, terms, page, limit));
    }
};
