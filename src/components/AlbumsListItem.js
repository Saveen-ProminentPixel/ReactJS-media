import { GoXCircleFill } from 'react-icons/go';
import { useRemoveAlbumMutation } from '../store';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import PhotosList from './PhotosList';

function AlbumsListItem({album}) {
    const [removeAlbum, results] = useRemoveAlbumMutation();

    const handleRemoveAlbum = () => {
        removeAlbum(album);
    };

    const header = ( 
        <>
            <Button className="mr-2" loading={results.isLoading} onClick={handleRemoveAlbum} >
                <GoXCircleFill/>
            </Button>
            {album.title}  
        </>
    );

    return (
        <div className='m-2'>
            <ExpandablePanel key={album.id} header={header} >
                <PhotosList album={album} />
            </ExpandablePanel>
        </div>
    );
    
    
}

export default AlbumsListItem;