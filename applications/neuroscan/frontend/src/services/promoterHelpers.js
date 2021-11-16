import promoterService from './PromoterService';
import * as search from '../redux/actions/promoters';
//

export default async (dispatch, state) => {
  promoterService.search(state).then((data) => {
    dispatch(
      search.updatePromoters(data),
    );
  });
};
