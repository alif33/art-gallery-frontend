import { React, useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { Spinner } from "../../../components/spinner/spinner";
import moment from "moment";
import Table from "../../../components/table";
import { getArtistAPICall } from "../../services/arts";
import Popup from "../../../components/popup/popup";
import AddArtist from "./addArtist";
import environment from "../../../environment";
import { Button } from '@mui/material'
import Http from "../../../__lib__/Http";

const columns = [
  { name: "artistName",
    label: "Artist Name"
  },
  {
    name: "artistImage",
    label: "Artist Image",
    options: {
      customBodyRender: (uri) => {
        return (
          <img
            src={uri}
            style={{ height: "100px", width: "100px" }}
          />
        );
      },
    },
  },
  "Total arts",
];
const pageSize = 5;

const Artist = (props) => {
  const [open, setOpen] = useState(false);
  const [artist, setArtist] = useState([]);
  const [artists, setArtists] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [editData, setEditData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [totalCount, setTotalCount] = useState(false);
  const handleOpen = () => setOpen(true);
  const { classes } = props;
  const [pageIndex, setPageIndex] = useState(0);


  const fetchArtists = ()=>{
    Http('GET', '/artists')
    .then(res=>{
        setArtists(res?.artists)
        console.log(res?.artists);
    })
    .catch(err=>{
        console.log(err);
    })
  }


  
  useEffect(()=>{
    fetchArtists();
  }, [])


  // useEffect(() => {
  //   getArtist(true, 0);
  // }, []);

  // const getArtist = async (loader = true, offset) => {
  //   if (loader) {
  //     setIsloading(true);
  //   }

  //   let _response = await getArtistAPICall(pageSize, offset);
  //   setIsloading(false);
  //   if (_response.isSuccess) {

  //     let _artist = _response.artist.map((arts) => {
  //       const { artist, count } = arts;
  //       let _user = [artist.artistName, artist.artistImage, count];
  //       return _user;
  //     });
  //     if (artist.length <= _response.total) {
  //       let _artistList = offset === 0 ? [] : artist;
  //       setArtist([..._artistList, ..._artist]);
  //       setTotalCount(_response.total)
  //     }
  //   }
  // };


  // const handleDeleteRow = async (id) => {
  //   getArtist(false);
  // };

  const handleClosePopup = () => {
    setOpen(false);
    setIsEdit(false);
    // getArtist(false);
  };

  // const handleEditRow = (id) => {
  //   let _editData = artist.find((item) => item.id === id);
  //   setEditData(_editData);
  //   setIsEdit(true);
  //   setOpen(true);
  // };

  // const handlePageClick =(index)=>{
  //   setPageIndex((prev) => ++prev);
  //   getArtist(false,1 + pageIndex);
  // }

  return (
    <>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          type="button"
          variant="contained"
          onClick={handleOpen}
          style={{ backgroundColor: "#194B43" }}
          sx={{ mt: 3, mb: 2 }}
        >
          Add art
        </Button>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Table
            tableData={artists}
            title={"Artist"}
            columns={columns}
            pagination={false}
          />
          <div style={{display:'flex' ,justifyContent:'space-between',marginTop:'10px'}}>
            <span> {artist.length} of {totalCount}</span>

           {
            totalCount > artist.length &&
            <Button
              type="button"
              variant="contained"
              // onClick={handlePageClick}
              style={{ backgroundColor: "#194B43" }}
              sx={{ mt: 3, mb: 2 }}
            >
              View More
            </Button>

          }
          </div>


        </>
      )}
      <Popup isOpen={open} handleClose={handleClosePopup} title={`Add art`}>
        <AddArtist fetchArtists={fetchArtists} handleClose={handleClosePopup} />
      </Popup>
    </>
  );
};

export default Artist;
