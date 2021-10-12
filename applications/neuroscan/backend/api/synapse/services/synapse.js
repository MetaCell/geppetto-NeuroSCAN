'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

const searchSynapseByTerms = (
  timePoint,
  searchTerms,
  type = [],
  pre = null,
  post = null
) => {
  const terms = searchTerms.toUpperCase().split('|');

  return terms.reduce((r, t, i) => {
    return `${r} ${i != 0 ? 'UNION ': ''}
  select * 
  from (
    select s.*
    from synapses as s
    join neurons as n_pre on n_pre.id = s.neuronPre
    where s.timepoint = ${timePoint}
    ${type.length > 0 ? `and type in ('${type.join("','")}')` : ''}
    and upper(n_pre.uid) like '%${t}%'
    and ${terms.length - 1} <= (
      select count(1)
      from (
        ${terms.reduce((r2, term, i2) => {
          let a = (i2 != 0 ? 'union all ' : '');
          return `${r2} ${a} select 1
            from synapses__neuron_post snp
            join neurons n on n.id = snp.neuron_id
            where upper(n.uid) like '%${term}%'
            and snp.synapse_id = s.id`
          }, '')}
        )
      )
    union
      select s.*
      from synapses as s
      where s.timepoint = ${timePoint}
      ${type.length > 0 ? `and type in ('${type.join("','")}')` : ''}
      and ${terms.length} = (
        select count(1)
        from (
          ${terms.reduce((r2, term, i2) => {
            let a = (i2 != 0 ? 'union all ' : '');
            return `${r2} ${a} select 1
              from synapses__neuron_post snp
              join neurons n on n.id = snp.neuron_id
              where upper(n.uid) like '%${term}%'
              and snp.synapse_id = s.id`
            }, '')}
          )
        )
      )
  `}, '');
}

module.exports = {
  async find(params, populate) {
    console.log(params);
    const where = params._where || [];
    const searchTerms = where.find(t => 'searchTerms' in t);
    if (!searchTerms) {
      return strapi.query('synapse').find(params, populate);
    }

    const { timepoint } = where.find(t => 'timepoint' in t);
    const type = where.filter(t => 'type' in t).map(t => t.type);
    const limit = params._limit || null;
    const offset = params._start || null;
    const query = `
    select *
    from (
    ${searchSynapseByTerms(timepoint, searchTerms.searchTerms, type)}
    )
    order by uid
    ${limit !== null ? `limit (${limit})` : ''}
    ${offset !== null ? `offset (${offset})` : ''}
    `;
    console.log(query);
    const knex = strapi.connections.default;
    return await knex.raw(query);
  },

  async count(params, populate) {
    const where = params._where || [];
    const searchTerms = where.find(t => 'searchTerms' in t);
    if (!searchTerms) {
      return strapi.query('synapse').count(params, populate);
    }
    const { timepoint } = where.find(t => 'timepoint' in t);
    const type = where.filter(t => 'type' in t).map(t => t.type);
    const query = `
    select count(1) as c
    from (
    ${searchSynapseByTerms(timepoint, searchTerms.searchTerms, type)}
    )
    `
    const knex = strapi.connections.default;
    const r = await knex.raw(query);
    return r[0].c;
  }
};
