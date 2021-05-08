import {createStyles, makeStyles} from "@material-ui/core";
import {Planning} from "./Planning";
import {getFireBaseMessageToken} from "../services/Firebase";
import {Notifications} from "@material-ui/icons";
import {useUsersDb} from "../services/UsersDb";
import {usePlannerDb} from "./PlannerDb";
import React from "react";
import moment, {Moment} from "moment";
import {IconButtonWithPopupMenu} from "../common/IconButtonWithPopupMenu";

const useStyles = makeStyles(createStyles({
    notificationIcon: {
        fontSize: "1.2rem",
        color: "silver"
    } ,
}))

export function PlanningNotificationControl({planning}: { planning: Planning }) {

    const usersDb = useUsersDb()!
    const plannerDb = usePlannerDb()

    function addNotification(time: Moment) {
        getFireBaseMessageToken().then(async (currentToken) => {
            if (currentToken) {
                await usersDb.updateMessagingToken(currentToken)

                await plannerDb.addReminder(planning, time)
            }
            else {
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            alert("Couldn't authorize notifications :(\n" + err)
        });
    }

    const classes = useStyles()

    const notificationTimes = [
        moment(planning.date).hour(8).minute(0).second(0).subtract(1, 'days'),
        moment(planning.date).hour(17).minute(0).second(0).subtract(1, 'days'),
        moment(planning.date).hour(8).minute(0).second(0),
        moment(planning.date).hour(17).minute(0).second(0),
    ]

    return <>
        <IconButtonWithPopupMenu
            icon={<Notifications className={classes.notificationIcon}/>}
            menuItems={
                notificationTimes.map(notificationTime => ({
                    title: `Remind me at ${notificationTime.format("HH:mm [on] dddd")}`,
                    action: () => addNotification(notificationTime)
                }))
            }
        />
    </>
}