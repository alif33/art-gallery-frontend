import { React, useState, useEffect } from "react";

import { Spinner } from "../../../components/spinner/spinner";
import moment from "moment";
import { getUserListAPICall } from "../../services/user";
import Table from "../../../components/table";

const columns = [ 
  {
    name: "firstName",
    label: "First Name",
    options: {
    filter: true,
    sort: true,
  }},
  {
    name: "lastName",
    label: "Last Name",
    options: {
    filter: true,
    sort: true,
  }},
  {
    name: "email",
    label: "Email",
    options: {
    filter: true,
    sort: true,
  }},
  {
    name: "createdAt",
    label: "Created At",
    options: {
    filter: true,
    sort: true,
  }},
];

const UserList = (props) => {
  const [open, setOpen] = useState(true);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [editData, setEditData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const handleOpen = () => setOpen(true);
  const { classes } = props;

  // useEffect(() => {
  //   getUserList();
  // }, []);

  // const getUserList = async (loader = true) => {
  //   if (loader) {
  //     setIsloading(true);
  //   }
  //   let _response = await getUserListAPICall();
  //   setIsloading(false);
  //   if (_response.isSuccess) {
  //     let _userList = _response.userList.map((user) => {
  //       const { firstName, lastName, email, createdAt } = user;
  //       let _user = [
  //         firstName,
  //         lastName,
  //         email,
  //         moment(createdAt).format("LL"),
  //       ];
  //       return _user;
  //     });
  //     setUserList([..._userList]);
  //   }
  // };
  // const handleDeleteRow = async (id) => {
  //   getUserList(false);
  // };
  // const handleClosePopup = () => {
  //   setOpen(false);
  //   setIsEdit(false);
  //   getUserList(false);
  // };

  // const handleEditRow = (id) => {
  //   let _editData = userList.find((item) => item.id === id);
  //   setEditData(_editData);
  //   setIsEdit(true);
  //   setOpen(true);
  // };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Table tableData={[
          {
            firstName: "Ismail",
            lastName: "hosen",
            email: "alifhasan332@gmail.com",
            createdAt: "2/5/23"
          }
        ]} title={"Users"} columns={columns} />
      )}
    </>
  );
};

export default UserList;
