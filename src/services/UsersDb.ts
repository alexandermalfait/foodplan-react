import {Db} from "./Db";
import {useContext, useMemo} from "react";
import {AuthContext} from "./Auth";

export function useUsersDb() {
    const currentUser = useContext(AuthContext);

    return useMemo(() => currentUser ? new UsersDb(currentUser) : null, [currentUser])
}

export class UsersDb extends Db {

    saveProfile() {
        const user = this.user;

        this.userDocument().set({
            profile: {
                email: user.email,
                photoUrl: user.photoURL,
                providerId: user.providerId
            }
        })
    }
}