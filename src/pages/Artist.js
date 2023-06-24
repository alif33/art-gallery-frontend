import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { HTTP, } from "../helpers/HTTP"
import Modal from "../components/Modal"
import { toast } from "react-hot-toast"
import { toDateFormat } from "../helpers/Formatter"
import SyncLoader from "react-spinners/SyncLoader"
import { override } from "../helpers/config"

const Artist =()=> {
    const [artists, setArtists] = useState()
    const [modalIsOpen, setIsOpen] = useState(false)
    const [artistName, setArtistName] = useState()
    const [artistImage, setArtistImage] = useState()
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(true)
    
    const fetchArtists = ()=>{
        HTTP("GET", "/artists")
        .then(res=>{
            if(res.artists){
                setArtists(res.artists)
                setLoading(false)
            }
        })
    }

    useEffect(()=>{
        fetchArtists()
    }, [])


    const uploadImage = (e) => {
        setDisabled(true);
         console.log(e.target.files[0])
        const formData = new FormData();
        formData.append('image', e.target.files[0])
        HTTP('POST', '/upload', formData)
        .then(res=>{
            setDisabled(false);
            if(res.success){
                setArtistImage(res.image?.secure_url);
            }
        })
        .catch(err=>{
            setDisabled(false);
            console.log(err);
        })
    };



    const handleSubmit = async e =>{
        e.preventDefault()
        if(artistName && artistImage){
            HTTP('POST', '/artist', {artistName, artistImage})
            .then(res=>{
                if(res.success){
                    fetchArtists()
                    toast.success(`${res.message}`)
                    setIsOpen(false)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            
        }
    }

    return(
        <Layout>
            <SyncLoader cssOverride={override} loading={loading} color="#36d7b7" />    
            {
                artists && (
                    <>
                        <div className="content">
                            <div className="table-bar">
                                <h4>Artists</h4>
                                <button onClick={()=>setIsOpen(true)}>Add Artist</button>  
                            </div>  
                            <hr/>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Artist Name</th>
                                        <th scope="col">Artist Image</th>
                                        <th scope="col">Created</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        artists && artists.map((ar, index)=>  <tr key={index}>
                                            <td>{ar.artistName}</td>
                                            <td><img height={50} width={50} src={ar.artistImage}/></td>
                                            <td>{toDateFormat(ar.createdAt)}</td>
                                            <td>{}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <Modal 
                            setIsOpen={setIsOpen} 
                            modalIsOpen={modalIsOpen}
                            content={<>
                                <h4 className="text-center">Add Artist</h4>
                                <form onSubmit={handleSubmit} className="mt-4">
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Artist Name"
                                            onChange={e=>setArtistName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input 
                                            type="file" 
                                            className="form-control" 
                                            accept="image/*"
                                            onChange={uploadImage}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-submit mt-3">Save</button>
                                </form>
                            </>}
                        />  
                    </>
                )
            }
          
        </Layout>
    )
}
export default Artist