import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({
    payload: response.data,
    type: 'FETCH_POSTS',
  });
};

export const fetchUser = id => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({
    payload: response.data,
    type: 'FETCH_USER',
  });
};

export const fetchPostsAndUsersAction = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

/**
 * Actions creators must return plain JS objects with a type property.
 *
 * Lorsqu'on veut changer le state de l'appli, on appelle un "action creator",
 * dans les fichiers du repertoire "actions".
 * L'"action creator" appellé retoune un "action object".
 * L"action object" est envoyé a la fonction dispatch.
 * La fonction dispatch transfère son action aux reducers.
 * Le reducer concerné par cette action met à jour le state.
 *
 * Mais si l'action creator execute du code asynchrone, comme une requete HTTP,
 * alors quand la réponse HTTP sera reçu, le reducer aura déja été éxécuté.
 *
 * Nativement, il n'est pas possible de retarder l'éxécution des reducers.
 * Pour ça, il faut un middleware nommé redux-thunk, qui s'interposera entre
 * l'éxécution de la fonction dispatch et les reducers.
 *
 * Sans redux-thunk, les action creator sont obligés de retour, des
 * "actions objects" comme ceci :
 *
 * return {type: 'FETCH_POSTS', payload: data}
 *
 * Avec redux-thunk, les "actions creators" pourront retourner leurs objets,
 * mais aussi des fonctions, que redux-thunk va donc intercepter, et executer.
 * Dans ces fonctions, on pourra executer du code asynchrone, et "dispatcher"
 * une nouvelle action avec un "action object" une fois que le code sera
 * terminée. (voir images/Fonctionnement de redux-thunk.png) *
 */

/**
 * La fonction async-await permet d'executer du code asynchrone sans callback.
 */

/**
 * La fonction "_" de lodash permet de "memoïzer" une fonction.
 * "Memoïzer" une fonction permet a une fonction de n'etre appeler qu'une seule
 * fois. Si une fonction memoïzer est appelé une nouvelle fois avec les mêmes
 * paramètres, alors lodash ne réexecutera pas cette fonction, et retournera
 * le résulat obtenu lors de sa première éxécution. En l'occurence ici, c'est
 * l'action creator que la récupération du user auteur du post est mémoïzer.
 *
 * Si on fait un fetchUser dans le composant UserHeader de chaque post, alors si
 * dix posts ont le même auteur, on récupèrera dix fois le même user en faisant
 * dix requêtes HTTP. Donc on appelle fetchPosts et fetchUsers dans
 * fetchPostsAndUsers, on memoïze le resultat.
 */
