import { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } from "../store";
import Skeleton from "./skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({user}){
    const {data, error, isFetching} = useFetchAlbumsQuery(user);
    const [addAlbum, results] = useAddAlbumMutation();
    const [removeAlbum, removeAlbumResult] = useRemoveAlbumMutation();

    const handleAddAlbum = () => {
        addAlbum(user);
    };

    let content;
    if(isFetching){
        content = <Skeleton className="h-10 w-full" times={3} />
    } else if(error) {
        content = <div>Error loading albums.</div>
    } else {
        content = data.map(album => {
            return <AlbumsListItem key={album.id} album={album} />
        })
    }

    return <div>
        <div className="m-2 bg-slate-200 flex flex-row items-center justify-between">
            <h3 className="text-lg font-medium m-2">Albums for {user.name}</h3>
            <Button secondary loading={results.isLoading} onClick={handleAddAlbum} className="m-2" >
                + Add Album
            </Button>
        </div>
        <div>{content}</div>
    </div>;
}

export default AlbumsList;