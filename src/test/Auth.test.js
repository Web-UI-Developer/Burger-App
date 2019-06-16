import reducer from '../store/reducers/auth';
import * as actionTypes from '../store/actions/actionTypes';

describe('auth reducer', () => {
  it('should return intitial state', () => {
    expect(reducer(undefined, {})).toEqual({
        loading : false,
        token : null,
        userId : null,
        authRedirectPath : '/',
        error : null,
    });
  });

  // it('should store token when login', () => {
  //     expect(reducer({
  //         loading : false,
  //         token : null,
  //         userId : null,
  //         authRedirectPath : '/',
  //         error : null,
  //     },
  //         {
  //           type: actionTypes.AUTH_SUCCESS,
  //           idToken: 'asdrf-fgtyhu',
  //           userId: 'sam123'
  //         })).toEqual({
  //             loading : false,
  //             token : 'asdrf-fgtyhu',
  //             userId : 'sam123',
  //             authRedirectPath : '/',
  //             error : null,
  //           });
  //     });
});
