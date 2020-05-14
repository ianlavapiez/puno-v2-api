const { makeUser } = require('../../models')

export default function makeAddUser ({}) {
    return async function signUpUser (userInfo) {
        const user = makeUser(userInfo)
        const exists

    }
}