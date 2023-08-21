import { toast } from "react-toastify";

export const ProtectedRoute = ({children}) => {
    if (!localStorage.getItem('token')) {
toast.error("login or signup to create campaign")
        window.location = '/'
    } else {
        return children;

    }
}

export default ProtectedRoute;