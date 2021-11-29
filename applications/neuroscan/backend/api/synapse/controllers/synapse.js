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
       entities = await strapi.services.synapse.search(ctx.query);
     } else {
       entities = await strapi.services.synapse.find(ctx.query);
     }

     entities = entities.map(entity => {
      const postNeuronPart = entity.postNeuron ? `-${entity.postNeuron.uid}` : '';
      const neuronsPostPart = entity.neuronPost.length > 0 ? entity.neuronPost.reduce((r, n, i) => {
        let s = (i != 0 ? ', ' : '');
        let e = (i == entity.neuronPost.length - 1 ? ')' : '');
        return `${r}${s}${n.uid}${e}`
      }, ' (') : '';
      return ({
         ...entity,
         name: entity.name ? entity.name : `pre-${entity.neuronPre.uid}-${entity.type}-post-${postNeuronPart}${neuronsPostPart}`,
       })});
 
     return entities.map(entity => {
       return sanitizeEntity(entity, {
         model: strapi.models.synapse,
       });
     });
   },
 };
