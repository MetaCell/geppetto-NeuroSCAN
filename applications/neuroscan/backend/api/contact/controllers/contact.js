'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 const { sanitizeEntity } = require('strapi-utils');

 module.exports = {
   async find(ctx) {
     let entities;
     if (ctx.query._q) {
       entities = await strapi.services.contact.search(ctx.query);
     } else {
       entities = await strapi.services.contact.find(ctx.query);
     }

     entities = entities.map(entity => {
      return ({
         ...entity,
         name: entity.name ? entity.name : `${entity.neuronA.uid} contact from ${entity.neuronB.uid}`,
       })});
 
     return entities.map(entity => {
       return sanitizeEntity(entity, {
         model: strapi.models.contact,
       });
     });
   },
 };
