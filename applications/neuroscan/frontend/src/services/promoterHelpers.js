import promoterService from './PromoterService';
import * as search from '../redux/actions/promoters';
//

export default async (dispatch, state) => {
  promoterService.totalCount(state).then((count) => {
    dispatch(
      search.updateCount(count),
    );
  });
  promoterService.search(state).then((data) => {
    dispatch(
      search.updatePromoters(state.promoters.concat(data)),
    );
  });
};
