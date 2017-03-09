import searchCtrl from '../controllers/searchCtrl';
import auth from '../middlewares/auth';

const searchRoute = (router) => {
  router.route('/users/search')
  .post((req, res) => {
    res.redirect(`/search/users/?q=${req.body.query}`);
  });
  router.route('/search/users')
  .get(auth.verifyToken, searchCtrl.searchUser);

  router.route('/documents/search')
  .post((req, res) => {
    res.redirect(`/search/documents/?q=${req.body.title}`);
  });
  router.route('/search/documents/')
  .get(auth.verifyToken, searchCtrl.searchDocument);
};
export default searchRoute;
