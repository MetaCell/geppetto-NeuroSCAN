'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

const searchSynapseByTerms = (
  params,
) => {
  const where = params._where || [];
  const { searchTerms } = where.find(t => 'searchTerms' in t);
  const terms = searchTerms.toUpperCase().split('|');
  const { timepoint } = where.find(t => 'timepoint' in t);
  const type = where.filter(t => 'type' in t).map(t => t.type) || {type: []};
  const { neuronPre } = where.find(t => 'neuronPre' in t) || {neuronPre: null};
  const { postNeuron } = where.find(t => 'postNeuron' in t) || {postNeuron: null};
  const termsPre = neuronPre ? [neuronPre.toUpperCase()] : terms;

  return termsPre.reduce((r, t, i) => {
    return `${r} ${i != 0 ? 'UNION ': ''}
  select *
  from (
    select s.*, n_pre.uid as neuronPre_uid
    from synapses as s
    join neurons as n_pre on n_pre.id = s.neuronPre
    left join neurons as n_post on n_post.id = s.postNeuron
    where s.timepoint = ${timepoint}
    and upper(n_pre.uid) like '%${t}%'
    ${type.length > 0 ? `and type in ('${type.join("','")}')` : ''}
    ${(postNeuron && !neuronPre) ? `and upper(n_post.uid) like '%${postNeuron.toUpperCase()}%'` : ''}
    ${(!postNeuron && neuronPre) ? `and upper(n_pre.uid) like '%${neuronPre.toUpperCase()}%' and s.position = 'pre'` : ''}
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
  ${!neuronPre ? `
    union
      select s.*, n_pre.uid as neuronPre_uid
      from synapses as s
      join neurons as n_pre on n_pre.id = s.neuronPre
      left join neurons as n_post on n_post.id = s.postNeuron
      where s.timepoint = ${timepoint}
      ${type.length > 0 ? `and type in ('${type.join("','")}')` : ''}
      ${postNeuron ? `and upper(n_post.uid) like '%${postNeuron.toUpperCase()}%'` : ''}
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
  ` : ''}) `}, '');
}

module.exports = {
  async find(params, populate) {
    const where = params._where || [];
    const searchTerms = where.find(t => 'searchTerms' in t);
    if (!searchTerms) {
      return strapi.query('synapse').find(params, populate);
    }

    const limit = params._limit || null;
    const offset = params._start || null;

    const query = `
    select *
    from (
    ${searchSynapseByTerms(params)}
    )
    order by neuronPre_uid
    ${limit !== null ? `limit (${limit})` : ''}
    ${offset !== null ? `offset (${offset})` : ''}
    `;
    const knex = strapi.connections.default;
    const ids = await knex.raw(query);
    return await strapi.query('synapse').find({ id_in: ids.map(x => x.id), _sort: 'uid' });
  },

  async count(params, populate) {
    const where = params._where || [];
    const searchTerms = where.find(t => 'searchTerms' in t);
    if (!searchTerms) {
      return strapi.query('synapse').count(params, populate);
    }
    const query = `
    select count(1) as c
    from (
    ${searchSynapseByTerms(params)}
    )
    `
    const knex = strapi.connections.default;
    const r = await knex.raw(query);
    return r[0].c;
  }
};
