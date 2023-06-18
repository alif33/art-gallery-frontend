import { Button, CircularProgress, TextField, MenuItem, Select, } from "@mui/material";
import { useEffect, useState } from "react";
import { handleToastMessage } from "../../../shared/handleToastMessage";
import { addArtAPICall } from "../../services/arts";
import Http from "../../../__lib__/Http";

const AddArt = ({ handleClose }) => {
  const [title, setTitle] = useState("");
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [artType , setArtType] = useState();
  const [artist, setArtist] = useState();
  const [artImage, setArtImage] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const uploadImage = (e) => {
      setDisabled(true);
      const formData = new FormData();
      formData.append('image', e.target.files[0])
      Http('post', '/upload', formData)
      .then(res=>{
          setDisabled(false);
          if(res.success){
            setArtImage(res.image?.secure_url);
          }
      })
      .catch(err=>{
          setDisabled(false);
          console.log(err);
      })
  };



  useEffect(()=>{
    Http('GET', '/artists')
    .then(res=>{
        setArtists(res?.artists)

    })
    .catch(err=>{
        console.log(err);
    })
  }, [])


  const handleAddForm = async (e) => {
    e.preventDefault();

    if (title && artType && artist && artImage) {
      Http('POST', '/art', { title, artType, artist, artImage })
      .then(res=>{
        if (res.isSuccess) {
          handleToastMessage("success", "Art add successfully");
          handleClose();
        }
        console.log(res);
      })
    }

    



    // if (title && artistName && artImage && artistImage) {
    //   let _fd = new FormData();
    //   _fd.append("title", title);
    //   _fd.append("artistImage", artistImage);
    //   _fd.append("imagePath", artImage);
    //   _fd.append("artistName", artistName);
    //   _fd.append("type", artType);
    //   setIsLoading(true);
    //   let _result = await addArtAPICall(_fd);
    //   setIsLoading(false);
    //   if (_result.isSuccess) {
    //     handleToastMessage("success", "Art add successfully");
    //     handleClose();
    //   }
    // } else {
    //   handleToastMessage("error", "Please provide a valid data");
    // }
  };

const handleArt =(value)=>{
  setArtType(value);
}


  return (
    <>
      <form onSubmit={handleAddForm}>
        <TextField
          label="title"
          variant="standard"
          fullWidth
          required
          margin="dense"
          style={{ marginBottom: "2rem" }}
          onChange={(value) => setTitle(value.target.value)}
        />
        <span>Art type</span>
        
        <Select
          fullWidth
          required
          variant="standard"
          style={{ marginBottom: "2rem" }}
          onChange={e=>setArtType(e.target.value)}
        >
          <MenuItem value={"featured"}>Featured</MenuItem>
          <MenuItem value={"high resolution"}>High resolution</MenuItem>
        </Select>

        <span>Artist</span>
        
        <Select
          fullWidth
          required
          variant="standard"
          style={{ marginBottom: "2rem" }}
          onChange={e=>setArtist(e.target.value)}
        >
          {
            artists.map((artist, index)=><MenuItem key={index} value={artist._id}><img width={40} height={40} src={artist.artistImage}/> {artist.artistName}</MenuItem>)
          }
         
        </Select>

        <Button variant="basic" fullWidth component="label">
          {artImage?.name ? artImage?.name : "Upload art image"}

          <input type="file" accept="image/*" hidden onChange={uploadImage} />
        </Button>

        <Button
          type="submit"
          fullWidth
          disabled={disabled}
          variant="contained"
          style={{ backgroundColor: "#194B43" }}
          sx={{ mt: 3, mb: 2 }}
        >
          {disabled ? <CircularProgress color="inherit" /> : "Save"}
        </Button>
      </form>
    </>
  );
};
export default AddArt;
