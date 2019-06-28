export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return [...state, action.payload];
    default:
      return state;
  }
};

/**
 * Pour vérifier qu'une des valeurs contenues dans le state à été changé par un
 * des reducers, la fonction combineReducers effectue ce test :
 *
 * nextState !== previousState
 *
 * Si ce qui est retourné par le reducer est carrément le state qui a été fourni
 * en paramètre, alors quand la fonction combineReducers fera son test avec
 * l'opérateur "!==", elle constatera que les deux variables sont en fait
 * littéralement les deux même variables en mémoire, donc que le state n'a pas
 * du tout changé, et que l'application n'a pas du tout besoin d'être
 * réactualisé et a nouveau rendu à l'écran.
 *
 * Si ce qui est retourné par le reducer est une toute nouvelle variable crée au
 * sein du reducer, alors quand la fonction combineReducers fera son test avec
 * l'opérateur "!==", elle constatera que les deux variables sont totalement
 * différentes, donc que le state a totalement changé, et que l'application a
 * besoin d'être réactualisé, et a nouveau rendu à l'écran.
 *
 * Maintenant, il y a un dernier cas, qui est plus vicieux.
 *
 * Si dans le reducer, vous modifiez la variable state avant de la retourner,
 * lorsque la fonction combineReducers fera son test avec l'opérateur "!==",
 * les deux variables seront quand même considéré comme étant identiques, donc
 * la fonction combineReducers considèrera que le state n'a pas changé, et
 * décidera que l'application n'a pas besoin d'être réactualisé et a nouveau
 * rendu à l'écran. Donc même si on croit avoir bien changé une valeur du state,
 * ce qu'on verra à l'écran ne sera pas actualisé.
 *
 * Par exemple:
 *     var previousState = {name: 'toto'};
 *     var nextState = previousState;
 *     nextState.name = 'tata';
 *     previousState !== nextState              renverra false
 *
 * Donc, dans un reducer, on NE modifie PAS le state reçu en paramètre.
 * Ce qu'on retourne, doit être une nouvelle variable :
 *     { ...state, name: 'Sam'}
 *
 * Voir images/Comment bien modifier un state.png pour la liste des choses à
 * faire et à éviter.
 */
