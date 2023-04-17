import { STROAGE } from 'qz-ui';

window.Storage = {
    persistent: new STROAGE(localStorage, 'qz_'),
    session: new STROAGE(sessionStorage, 'qz_'),
};

export default window.Storage;