import {RootState} from '@/store/store';
import {BareActionContext, getStoreBuilder} from 'vuex-typex';
import axios from 'axios';

export const namespace = 'authentication';

interface UserDetails {
    username: string;
    password: string;
}

type AuthenticationStatus = 'error' | 'success' | 'loading';

export interface AuthenticationState {
    status?: AuthenticationStatus;
    token?: string;
    user?: string;
}

const initialState: AuthenticationState = {
    status: undefined,
    token: localStorage.getItem('token') || undefined,
    user : undefined,
};

const builder = getStoreBuilder<RootState>().module(namespace, initialState);

function setToken(state: AuthenticationState, token?: string) {
    state.token = token;
}

function setUsername(state: AuthenticationState, username?: string) {
    state.user = username;
}

function setStatus(state: AuthenticationState, status?: AuthenticationStatus) {
    state.status = status;
}

function doLogin(context: BareActionContext<AuthenticationState, RootState>, user: UserDetails) {
    return new Promise((resolve, reject) => {
        axios({url: '/rest/user/signin', data: user, method: 'POST'})
            .then(
                (response) => {
                    const token = response.data.token;
                    const username = response.data.username;
                    if (token && username) {
                        setAuthentication('success', token, username);
                        resolve();
                    } else {
                        clearAuthentication('error');
                        reject();
                    }
                },
                () => {
                    clearAuthentication('error');
                    reject();
                },
            );
    });
}

function setAuthentication(status: AuthenticationStatus, token: string, username: string) {
    authentication.setStatus('success');
    authentication.setToken(token);
    authentication.setUsername(username);
    localStorage.setItem('token', token);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

function clearAuthentication(status?: AuthenticationStatus) {
    authentication.setStatus(status);
    authentication.setUsername(undefined);
    authentication.setToken(undefined);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common.Authorization;
}

async function doLogout() {
    clearAuthentication(undefined);
}

const isLoadingGetter = builder.read(function isLoading(state: AuthenticationState) {
    return state.status === 'loading';
});

const isErrorGetter = builder.read(function isError(state: AuthenticationState) {
    return state.status === 'error';
});

const isLoggedInGetter = builder.read(function isLoggedIn(state: AuthenticationState) {
    return !!state.token;
});

const authentication = {
    get isLoading(): boolean { return isLoadingGetter(); },
    get isError(): boolean { return isErrorGetter(); },
    get isLoggedIn(): boolean { return isLoggedInGetter(); },
    setToken: builder.commit(setToken),
    setUsername: builder.commit(setUsername),
    setStatus: builder.commit(setStatus),
    doLogin: builder.dispatch(doLogin),
    doLogout: builder.dispatch(doLogout),
};

export default authentication;
