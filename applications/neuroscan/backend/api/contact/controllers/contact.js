'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const {sanitizeEntity} = require('strapi-utils');

module.exports = {
  async find(ctx) {
    const terms = ctx.query.terms ? ctx.query.terms.split(',').map(t => t.toLowerCase()) : [];
    const start = parseInt(ctx.query._start || "0");
    const limit = parseInt(ctx.query._limit || "30");
    const timepoint = ctx.query.timepoint

    let entities = await strapi.services.contact.customSearch(timepoint, terms, start, limit);
    entities = entities.map(entity => {
      return {
        ...entity,
        name: entity.name ? entity.name : `${entity.neuronA_uid} contact from ${entity.neuronB_uid}`
      };
    });
    return entities.map(entity => {
      return sanitizeEntity(entity, {
        model: strapi.models.contact,
      });
    });
  },
  async count(ctx) {
    const terms = ctx.query.terms ? ctx.query.terms.split(',').map(t => t.toLowerCase()) : [];
    const start = parseInt(ctx.query._start || "0");
    const limit = parseInt(ctx.query._limit || "30");
    const timepoint = ctx.query.timepoint

    ctx.send(await strapi.services.contact.customSearchCount(timepoint, terms, start, limit));
  }
};
