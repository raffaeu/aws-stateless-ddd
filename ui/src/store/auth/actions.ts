/**
 * Imports
 */
import { loggedIn, authenticating } from './reducer';
import { store } from '../';
import { sleep } from '../../utilities/timerUtilities';
import {
    CognitoUserPool,
    CognitoUserAttribute,
    CognitoUser,
    ICognitoUserPoolData,
    ICognitoUserData,
    IAuthenticationDetailsData,
    AuthenticationDetails
} from 'amazon-cognito-identity-js';

/**
 * Auth costants
 */
const userPoolData: ICognitoUserPoolData = {
    UserPoolId: 'us-east-1_sQlmy3RT7',
    ClientId: '2pbn3glmkt0lhe3dh7k41rjr6o'
}
const userPool = new CognitoUserPool(userPoolData);

/**
 * Authenticate a User and return a User object
 * @param username the Username provided
 * @param password the Password provided
 */
export const AuthenticateUser = async (username: string, password: string) => {
    try {
        // start authentication
        await store.dispatch(authenticating({ isAuthenticating: true }));
        await sleep(500);

        // parameters
        const authenticationData: IAuthenticationDetailsData = {
            Username: username,
            Password: password
        }
        const authenticationDetails = new AuthenticationDetails(authenticationData);
        const userData: ICognitoUserData = {
            Pool: userPool,
            Username: username
        }
        const cognitoUser = new CognitoUser(userData);

        // authentication
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                // auth. completed
                store.dispatch(authenticating({ isAuthenticating: false }));
                // success
                store.dispatch(loggedIn({
                    user: {},
                    error: ''
                }))
            },
            onFailure: (err) => {
                // auth. completed
                store.dispatch(authenticating({ isAuthenticating: false }));
                // fail
                store.dispatch(loggedIn({
                    user: {},
                    error: JSON.stringify(err)
                }));
            },
            newPasswordRequired: (userAttributes, requiredAttributes) => {
                // auth. completed
                store.dispatch(authenticating({ isAuthenticating: false }));
                // fail
                store.dispatch(loggedIn({
                    user: {},
                    error: 'New password required'
                }));
            }
        })

    } catch (err) {
        // auth. completed
        await store.dispatch(authenticating({ isAuthenticating: false }));
        console.log(err);
    }
}