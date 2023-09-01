import {GoTrash} from 'react-icons/go';
import Button from './Button';
import { removeUser } from '../store';
import { useThunk } from '../hooks/use-thunk';
import ExpandablePanel from './ExpandablePanel';
import { Fragment } from 'react';
import AlbumsList from './AlbumsList';

function UsersListItem({ user }) {
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    const handleClick = () => {
        doRemoveUser(user);
    };

    const header = <Fragment>
        <Button className="mr-3" loading={isLoading} onClick={handleClick}>
            <GoTrash />
        </Button>
        {error && <div>Error Deleting User.</div>}
        {user.name}
    </Fragment>

    return (
        <div className='bg-teal-100 m-4'>
        <ExpandablePanel header={header}>
            <div className='bg-teal-50 mx-2'>
            <AlbumsList user={user} />
            </div>
        </ExpandablePanel>   
        </div>
                     
    );
}

export default UsersListItem;
