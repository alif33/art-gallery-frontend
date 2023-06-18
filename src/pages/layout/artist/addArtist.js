import { Button, CircularProgress, TextField, MenuItem, Select, } from "@mui/material";
import { useEffect, useState } from "react";
import { handleToastMessage } from "../../../shared/handleToastMessage";
import { addArtAPICall } from "../../services/arts";
import Http from "../../../__lib__/Http";

const AddArt = ({ fetchArtists, handleClose }) => {
    const [artistName, setArtistName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [artistImage, setArtistImage] = useState(null);
    const [disabled, setDisabled] = useState(false);


    const uploadImage = (e) => {
        setDisabled(true);
        const formData = new FormData();
        formData.append('image', e.target.files[0])
        Http('post', '/upload', formData)
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

    const handleAddForm = async (e) => {
        e.preventDefault();

        if(artistName && artistImage){
            Http('POST', '/artist', {artistName, artistImage})
            .then(res=>{
                fetchArtists();
                handleClose();
                handleToastMessage("success", "Artist add successfully");
            })
            .catch(err=>{
                console.log(err)
            })
        }else{
            handleToastMessage("error", "Please provide valid data");
        }
    };


  return (
    <>
      <form onSubmit={handleAddForm}>
        <TextField
          label="Artist Name"
          variant="standard"
          fullWidth
          required
          margin="dense"
          style={{ marginBottom: "2rem" }}
          onChange={(value) => setArtistName(value.target.value)}
        />

        <Button
          variant="basic"
          style={{ marginTop: "10px" }}
          fullWidth
          component="label"
        >
          {artistImage?.name ? artistImage?.name : "Upload artist image"}

          <input
            type="file"
            accept="image/*"
            hidden
            onChange={uploadImage}
          />
        </Button>
        <Button
          type="submit"
          fullWidth
          disabled={disabled}
          variant="contained"
          style={{ backgroundColor: "#194B43" }}
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? <CircularProgress color="inherit" /> : "Save"}
        </Button>
      </form>
    </>
  );
};
export default AddArt;
