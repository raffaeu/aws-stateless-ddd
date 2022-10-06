/**
 * Imports
 */
import { sleep } from '../../utilities/timerUtilities';
import {
    CognitoUserPool,
    CognitoUser,
    ICognitoUserPoolData,
    ICognitoUserData,
    IAuthenticationDetailsData,
    AuthenticationDetails
} from 'amazon-cognito-identity-js';
import {
    createAsyncThunk
} from '@reduxjs/toolkit';
import { KnwonError } from '../types';
import { Credentials } from './types';

/**
 * Auth costants
 */
const userPoolData: ICognitoUserPoolData = {
    UserPoolId: 'us-east-1_sQlmy3RT7',
    ClientId: '2pbn3glmkt0lhe3dh7k41rjr6o'
}
const userPool = new CognitoUserPool(userPoolData);

/**
 * Internal async authentication wrapper for Cognito
 * @param cognitoUser The User object
 * @param authDetails The Authentication Details
 * @returns Return a Promise object
 */
const authenticateUserAsync = (cognitoUser: CognitoUser, authDetails: AuthenticationDetails): any => {
    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authDetails, {
            onSuccess: resolve,
            onFailure: reject,
            newPasswordRequired: resolve
        })
    })
};

/**
 * Change the password of a user
 * @param cognitoUser The User object
 * @param authDetails The Authentication Details
 * @returns Return the result of changing the password
 */
const changePasswordAsync = (cognitoUser: CognitoUser, authDetails: AuthenticationDetails): any => {
    return new Promise((resolve, reject) => {
        cognitoUser.changePassword(
            authDetails.getPassword(),
            authDetails.getPassword(), (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            })
    })
}

/**
 * Authenticate a User and return a User object
 * @param username the Username provided
 * @param password the Password provided
 */
export const authenticateUser = createAsyncThunk<
    string,
    Credentials,
    { rejectValue: KnwonError }
>(
    'auth/authenticateUser',
    async (credentials: Credentials, { rejectWithValue }) => {
        try {
            await sleep(500);

            // parameters
            const authenticationData: IAuthenticationDetailsData = {
                Username: credentials.username,
                Password: credentials.password
            }
            const authenticationDetails = new AuthenticationDetails(authenticationData);
            const userData: ICognitoUserData = {
                Pool: userPool,
                Username: credentials.username
            }
            const cognitoUser = new CognitoUser(userData);

            // authentication
            let result = await authenticateUserAsync(cognitoUser, authenticationDetails);

            if ('idToken' in result) {
                return 'token';
            } else {
                return rejectWithValue({
                    errorTitle: 'Your password must be changed',
                    errorMessage: 'Please change your password'
                });
            }
        } catch (err) {
            // auth. failed
            console.log(err);
            return rejectWithValue({
                errorTitle: 'Authentication Error',
                errorMessage: (err as Error).message
            });
        }
    });