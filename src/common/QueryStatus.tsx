import {UseQueryResult} from "react-query";
import {CircularProgress} from "@material-ui/core";

export function QueryStatus(props: { query: UseQueryResult<any> }) {
    const {query} = props

    if (query.isLoading) {
        return <CircularProgress/>
    }

    if (query.isError) {
        return <span>Error: {(query.error as Error).message}</span>
    }

    return null;
}