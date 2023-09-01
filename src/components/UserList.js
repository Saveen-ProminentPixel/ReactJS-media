import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Button from './Button';
import Skeleton from "./skeleton";
import { useThunk } from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";

function UserList() {
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    const { data } = useSelector((state) => {
        return state.users; // {data: [], isLoading: false, eror: null}
    });

    useEffect(() => {
      doFetchUsers();  
    }, [doFetchUsers]);

    const handleUserAdd = () => {
        doCreateUser();
    };

    let content;

    if(isLoadingUsers) {
        content = <Skeleton times={6} className="h-10 w-full" />
    }
    else if(loadingUsersError){
        content = <div>Error fetching data...</div>;
    }
    else {
        content = data.map((user) => {
            return <UsersListItem key={user.id} user={user} />;
        });
    }

    return <div>
        <div className="flex flex-row bg-teal-300 justify-between items-center m-3">
            <h1 className="m-2 text-xl">Users</h1>
            <Button primary loading={isCreatingUser} onClick={handleUserAdd} className="m-2">+ Add User</Button>
            {creatingUserError && 'Error creating user...'}
        </div>
        {content}
    </div>;
}

export default UserList;