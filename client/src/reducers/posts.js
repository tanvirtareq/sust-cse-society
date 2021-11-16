// export default (posts=[], action) => {
//     // switch (action.type) {
//     //     case 'FETCH_ALL':
//     //         return action.payload;
//     //         break;
//     //     case 'CREATE':
//     //         return [... posts, action.payload];
//     //     default:
//     //         return posts;
//     //         break;
//     // }
// };


function posts(posts = [], action){
    switch (action.type) {
      case 'FETCH_ALL':
        return action.payload;
      case 'CREATE':
        return [...posts, action.payload];
      default:
        return posts;
    }
}

export default posts;