import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import { HTTP } from "../helpers/HTTP"
import { toDateFormat } from "../helpers/Formatter"
import SyncLoader from "react-spinners/SyncLoader"
import { override } from "../helpers/config"

const UserList =()=> {
    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(true)

    const fetchUsers = ()=> {
        HTTP("GET", "users")
        .then(res=>{
            if(res) {
                setUsers(res)
                setLoading(false)
            }
        })
    }

    useEffect(()=>{
        fetchUsers()
    }, [])

    return(
        <Layout>
            <SyncLoader cssOverride={override} loading={loading} color="#36d7b7" />    
            {
                users && (
                    <div className="content">
                    <div className="table-bar">
                        <h4>Users</h4>
                    </div>           
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users && users.map((user, index)=>  <tr key={index}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{toDateFormat(user.createdAt)}</td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
                )
            }
         
        </Layout>
    )
}
export default UserList