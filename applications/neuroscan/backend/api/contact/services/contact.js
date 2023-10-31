'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */


'use strict';

function getBaseSearchQuery(timepoint) {
  const knex = strapi.connections.default;
  return knex.select('contacts.id')
    .from('contacts')
    .leftJoin('neurons as neuronA', 'contacts.neuronA', '=', 'neuronA.id')
    .leftJoin('neurons as neuronB', 'contacts.neuronB', '=', 'neuronB.id')
    .where('contacts.timepoint', timepoint)
}

function applySearchConditions(query, terms) {
  if (terms.length === 1) {
    const term = terms[0].toLowerCase();
    query.where(builder => {
      builder.whereRaw('LOWER(neuronA.uid) LIKE ?', [`%${term}%`])
        .orWhereRaw('LOWER(neuronB.uid) LIKE ?', [`%${term}%`])
        .orWhereRaw('LOWER(contacts.uid) LIKE ?', [`%${term}%`]);
    });
  } else if (terms.length === 2) {
    query.where(builder => {
      builder.where(subBuilder => {
        subBuilder.whereRaw('LOWER(neuronA.uid) LIKE ?', [`%${terms[0].toLowerCase()}%`])
          .orWhereRaw('LOWER(neuronB.uid) LIKE ?', [`%${terms[0].toLowerCase()}%`])
      })
        .andWhere(subBuilder => {
          subBuilder.whereRaw('LOWER(neuronA.uid) LIKE ?', [`%${terms[1].toLowerCase()}%`])
            .orWhereRaw('LOWER(neuronB.uid) LIKE ?', [`%${terms[1].toLowerCase()}%`])
            .orWhereRaw('LOWER(contacts.uid) LIKE ?', [`%${terms[1].toLowerCase()}%`]);
        });
    });
  } else if (terms.length >= 3) {
    query.where(builder => {
      builder.where(subBuilder => {
        subBuilder.whereRaw('LOWER(neuronA.uid) LIKE ?', [`%${terms[0].toLowerCase()}%`])
          .orWhereRaw('LOWER(neuronB.uid) LIKE ?', [`%${terms[0].toLowerCase()}%`])
      })
        .andWhere(subBuilder => {
          subBuilder.whereRaw('LOWER(neuronA.uid) LIKE ?', [`%${terms[1].toLowerCase()}%`])
            .orWhereRaw('LOWER(neuronB.uid) LIKE ?', [`%${terms[1].toLowerCase()}%`])
        })
        .andWhere(subBuilder => {
          terms.slice(2).forEach(term => {
            subBuilder.orWhereRaw('LOWER(contacts.uid) LIKE ?', [`%${term.toLowerCase()}%`]);
          });
        });
    });
  }

  return query;
}



module.exports = {
  async customSearch(timepoint, terms = [], start = 0, limit = 30) {
    let query = getBaseSearchQuery(timepoint);

    if (terms.length > 0) {
      query.orderByRaw(`
      CASE
        WHEN LOWER(neuronA.uid) LIKE ? THEN 0
        ELSE 1
      END,
      neuronA.uid ASC,
      neuronB.uid ASC
    `, [`%${terms[0].toLowerCase()}%`]);

      query = applySearchConditions(query, terms);
    }else {
      query.orderBy('neuronA.uid', 'asc');
      query.orderBy('neuronB.uid', 'asc');
    }

    query.offset(start).limit(limit);

    const ids = await query;
    return strapi.query('contact').find({ id_in: ids.map(x => x.id), _sort: 'uid' });
  },

  async customSearchCount(timepoint, terms) {
    let baseQuery = getBaseSearchQuery(timepoint);

    if (terms && terms.length > 0) {
      baseQuery = applySearchConditions(baseQuery, terms);
    }

    const countQuery = strapi.connections.default.count('* as total').from(baseQuery.as('subquery'));

    const result = await countQuery;
    return parseInt(result[0].total, 10);
  },

};
