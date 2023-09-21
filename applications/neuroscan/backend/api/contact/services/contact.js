'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */


function getBaseSearchQuery(timepoint, terms) {
    const knex = strapi.connections.default;
    // todo: Update this query
    return knex('contacts')
        .where('timepoint', timepoint)
}

module.exports = {
    async customSearch(timepoint, terms, start, limit) {

        // The base query
        let query = getBaseSearchQuery(timepoint, terms)
            .orderByRaw("CASE WHEN neuronA IN (?) THEN 0 ELSE 1 END, weight DESC", [terms]) // Sorting logic
            .offset(start)
            .limit(limit);

        return await query;
    },

    async customSearchCount(timepoint, terms) {
        let countQuery = getBaseSearchQuery(timepoint, terms)
            .count('* as totalCount');

        const result = await countQuery;
        return result[0].totalCount;
    }


};
