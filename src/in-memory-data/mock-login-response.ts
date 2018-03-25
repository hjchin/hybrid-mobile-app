import {LoginResponse} from '../common/webservice';

export const MockHappyLoginResponse :LoginResponse = {
    status: 200,
    status_message: "SUCCESSFUL LOGIN",
    fname: "test",
    lname: "user",
    uname: "test",
    rm: "10000",
    btc: "2.20",
    publickey: "1PEsGtfJvqPMbyzfgD9mdVju2mcAbcD9Xh",
};
 
export const MockSadLoginResponse :LoginResponse = {
    status: 400,
    status_message: "WRONG PASSWORD LA",
    fname: null,
    lname: null,
    uname: null,
    rm: null,
    btc: null,
    publickey: null,
}