import User from '../../models/user/User';
import Session from '../../models/user/Session';

(async () => {
    try {
        const user = await User.createAccount("AR Tushar", "tushar@gmail.com", "01864510094", "normal", "tushar");
        console.log(JSON.stringify(user, null, 2))
    } catch (e) {
        console.log(JSON.stringify(e, null, 2))
    }

/*
    try {
        const user = await User.loginByEmail('tushar@gmail.com', 'tushar');
        console.log(JSON.stringify(user, null, 2))
    } catch (e) {
        console.log(e.message, e.status)
    }
*/
/*
    try {
        const user = await User.loginByMobile('01864510095', 'tushar');
        console.log(JSON.stringify(user, null, 2))
    } catch (e) {
        console.log(e.message, e.status)
    }
*/

    // try {
    //     const session = await Session.createSession('1rjyVBKEGeYavwQe1ufGSqxSG7m');
    //     console.log(JSON.stringify(session, null, 2))
    // } catch (e) {
    //     console.log(e.message, e.status)
    // }

    // try {
    //     const user = await Session.updateSession('a5e85b04-348b-444f-b39b-b3841e251645', 10);
    //     console.log(JSON.stringify(user, null, 2))
    // } catch (e) {
    //     console.log(e.message, e.status)
    // }
})();