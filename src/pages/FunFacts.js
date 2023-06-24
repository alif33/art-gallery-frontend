import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { HTTP, uploadImage } from "../helpers/HTTP"
import { toast } from "react-hot-toast"
import Modal from "../components/Modal"
import SyncLoader from "react-spinners/SyncLoader"
import { override } from "../helpers/config"
import Select from "react-select"

const FunFacts =()=> {
    const [funFacts, setFunFacts] = useState()
    const [artists, setArtists] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState()  
    const [artImage, setArtImage] = useState()  
    const [artist, setArtist] = useState()
    const [disabled, setDisabled] = useState()
    const [loading, setLoading] = useState(true)

    const fetchFunFacts = ()=>{
        HTTP("GET", "/funfacts")
        .then(res=>{
            if(res.funFacts){
                setFunFacts(res.funFacts)
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
        fetchFunFacts()
        fetchArtists()
    }, [])
    
    const handleSubmit = async e =>{
        e.preventDefault()
        if (title && artist) {
            HTTP('POST', '/funfact', { title, artist })
            .then(res=>{
              if (res.success) {
                fetchFunFacts()
                toast.success(`${res.message}`)
                setIsOpen(false)
              }
            })
        }
    }

    return(
        <Layout>
            <SyncLoader cssOverride={override} loading={loading} color="#36d7b7" />
            {
                funFacts && (
                    <>
                        <div className="content">
                            <div className="table-bar">
                                <h4>Fun facts</h4>
                                <button onClick={()=>setIsOpen(true)}>Add Funfact</button>  
                            </div>  
                            <hr/>
                            <table className="table">
                                <thead>
                                    <tr>
                                    <th scope="col">Title</th>
                                    {/* <th scope="col">Art Image</th> */}
                                    <th scope="col">Artist Name</th>
                                    <th scope="col">Artist Image</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        funFacts && funFacts.map((ff, index)=>  <tr key={index}>
                                            <td>{ff.title}</td>
                                            {/* <td><img height={50} width={50} src={ff.artImage}/></td> */}
                                            <td>{ff.artist.artistName}</td>
                                            <td><img height={50} width={50} src={ff.artist.artistImage}/></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <Modal
                            setIsOpen={setIsOpen} 
                            modalIsOpen={modalIsOpen}
                            content={<>
                                <h4 className="text-center">Add Fun fact</h4>
                                <form onSubmit={handleSubmit} className="mt-4">
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Title"
                                            onChange={e=>setTitle(e.target.value)}
                                        />
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
                                    {/* <div className="form-group mt-3">
                                        <input 
                                            type="file" 
                                            className="form-control" 
                                            accept="image/*"
                                            onChange={e=>uploadImage(e, setArtImage, setDisabled)}
                                        />
                                    </div> */}
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
export default FunFacts