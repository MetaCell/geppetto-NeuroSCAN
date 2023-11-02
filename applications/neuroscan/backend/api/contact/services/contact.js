'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

function baseQuery(qb, timepoint) {
  qb.join('neurons as neuronA', 'neuronA.id', '=', 'contacts.neuronA')
  qb.join('neurons as neuronB', 'neuronB.id', '=', 'contacts.neuronB')

  qb.where('contacts.timepoint', timepoint);
  return qb
}

function searchConditions(qb, terms) {
  qb.andWhere(function() {
    if (terms.length === 1) {
      const term1 = terms[0].toLowerCase();
      this.orWhereRaw('LOWER(neuronA.uid) LIKE ?', [`%${term1}%`]);
      this.orWhereRaw('LOWER(neuronB.uid) LIKE ?', [`%${term1}%`]);
      this.orWhereRaw('LOWER(contacts.uid) LIKE ?', [`%${term1}%`]);
    } else if (terms.length === 2) {
      const term1 = terms[0].toLowerCase();
      const term2 = terms[1].toLowerCase();
      this.andWhere(function() {
        this.orWhereRaw('LOWER(neuronA.uid) LIKE ?', [`%${term1}%`])
        this.orWhereRaw('LOWER(neuronB.uid) LIKE ?', [`%${term1}%`])
      })
      this.andWhere(function() {
        this.orWhereRaw('LOWER(neuronA.uid) LIKE ?', [`%${term2}%`])
        this.orWhereRaw('LOWER(neuronB.uid) LIKE ?', [`%${term2}%`])
        this.orWhereRaw('LOWER(contacts.uid) LIKE ?', [`%${term2}%`]);
      })
    } else if (terms.length >= 3) {
      const term1 = terms[0].toLowerCase();
      const term2 = terms[1].toLowerCase();
      this.andWhere(function() {
        this.orWhereRaw('LOWER(neuronA.uid) LIKE ?', [`%${term1}%`])
        this.orWhereRaw('LOWER(neuronB.uid) LIKE ?', [`%${term1}%`])
      })
      this.andWhere(function() {
        this.orWhereRaw('LOWER(neuronA.uid) LIKE ?', [`%${term2}%`])
        this.orWhereRaw('LOWER(neuronB.uid) LIKE ?', [`%${term2}%`])
      })
      this.andWhere(function() {
        const that2=this
        terms.slice(2).forEach(term => {
          that2.orWhereRaw('LOWER(contacts.uid) LIKE ?', [`%${term.toLowerCase()}%`]);
        });
      })
    }
  })
  return qb
}

function orderBy(qb, terms) {
  if (terms.length > 0) {
    qb.orderByRaw(`
    CASE
      WHEN LOWER(neuronA.uid) LIKE ? THEN 0
      ELSE 1
    END,
    neuronA.uid ASC,
    neuronB.uid ASC
  `, [`%${terms[0].toLowerCase()}%`]);
  }else {
    qb.orderBy('neuronA.uid', 'asc');
    qb.orderBy('neuronB.uid', 'asc');
  }
  return qb
}


module.exports = {
  async customSearch(timepoint, terms = [], start = 0, limit = 30) {
    const result = await strapi
      .query('contact')
      .model.query(qb => {
        baseQuery(qb, timepoint)
        searchConditions(qb, terms)
        orderBy(qb, terms)
        .limit(limit)
        .offset(start)
      })
      .fetchAll();
    return result.toJSON();
  },

  async customSearchCount(timepoint, terms) {
    const result = await strapi
      .query('contact')
      .model.query(qb => {
        baseQuery(qb, timepoint)
        searchConditions(qb, terms)
      })
      .count()
    return result
  },

};
