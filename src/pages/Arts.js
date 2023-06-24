import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { HTTP, uploadImage } from "../helpers/HTTP"
import Modal from "../components/Modal"
import SyncLoader from "react-spinners/SyncLoader"
import { toast } from "react-hot-toast"
import Select from "react-select"
import { override } from "../helpers/config"

const ArtsList =()=> {
    const [arts, setArts] = useState()
    const [artists, setArtists] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false)
    const [artName, setArtName] = useState()  
    const [artImage, setArtImage] = useState()  
    const [artType, setArtType] = useState()
    const [artist, setArtist] = useState()
    const [disabled, setDisabled] = useState()
    const [loading, setLoading] = useState(true)

    const fetchArts = ()=>{
        HTTP("GET", "/arts")
        .then(res=>{
            if(res.arts){
                setArts(res.arts)
                setLoading(false)
            }
        })
    }

    const fetchArtists = ()=>{
        HTTP("GET", "/artists")
        .then(res=>{
            if(res.artists){
                setArtists(res.artists)
            }
        })
    }

    const options = artists? artists.map(rts => ({
        value: rts._id,
        label: rts.artistName,
        image: rts.artistImage
    })): []
      
    const Option = ({ innerProps, label, data }) =>(
        <div {...innerProps}>
            <img 
                src={data.image} 
                alt={label} 
                style={{ width: '50px', marginRight: '8px', marginBottom: '5px' }} 
            />
            {label}
        </div>
    )

    useEffect(()=>{
        fetchArts()
        fetchArtists()
    }, [])
    
    const handleSubmit = async e =>{
        e.preventDefault()
        if (artName && artType && artist && artImage) {
            HTTP('POST', '/art', { artName, artType, artist, artImage })
            .then(res=>{
              if (res.success) {
                fetchArts()
                toast.success(`${res.message}`)
                setIsOpen(false)
              }
            })
        }
    }

    return(
        <Layout>  
            <SyncLoader cssOverride={override} loading={loading} color="#36d7b7" />  
            {arts && (
                <>
                    <div className="content">
                        <div className="table-bar">
                            <h4>Artists</h4>
                            <button onClick={()=>setIsOpen(true)}>Add Art</button>  
                        </div>  
                        <hr/>
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">Art Name</th>
                                <th scope="col">Art Image</th>
                                <th scope="col">Artist Name</th>
                                <th scope="col">Artist Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arts && arts.map((ar, index)=>  <tr key={index}>
                                        <td>{ar.artName}</td>
                                        <td><img height={50} width={50} src={ar.artImage}/></td>
                                        <td>{ar.artist.artistName}</td>
                                        <td><img height={50} width={50} src={ar.artist.artistImage}/></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Modal
                        setIsOpen={setIsOpen} 
                        modalIsOpen={modalIsOpen}
                        content={<>
                            <h4 className="text-center">Add Art</h4>
                            <form onSubmit={handleSubmit} className="mt-4">
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Art Name"
                                        onChange={e=>setArtName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <select 
                                        className="form-control" 
                                        onChange={e=>setArtType(e.target.value)}
                                    >
                                        <option>Select Type</option>
                                        <option value="featured">Featured</option>
                                        <option value="high resolution">High resolution</option>
                                    </select>
                                </div>
                                <div className="form-group mt-3">
                                    <Select 
                                        placeholder="Select Artist"
                                        className="form-control" 
                                        options={options} 
                                        onChange={e=>setArtist(e.value)} 
                                        components={{ Option }}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        accept="image/*"
                                        onChange={e=>uploadImage(e, setArtImage, setDisabled)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-submit mt-3">Save</button>
                            </form>
                        </>}
                    /> 
                </>
            )}  
            
        </Layout>
    )
}
export default ArtsList