import { useRouteError } from "react-router-dom";

export default function ErrorPage(){
    
    const error=useRouteError();
    console.log(error)

    return (
        <div>
            <h1>OOPS!</h1>
            <p>Sorry Unexpected error has occurred.</p>
            <p><i>{error.statusText || error.message}</i></p>
        </div>
    )
}