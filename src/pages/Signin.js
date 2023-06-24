import { Link, useNavigate } from "react-router-dom"
import { CiLock } from "react-icons/ci"
import { useForm } from "react-hook-form"
import { HTTP } from "../helpers/HTTP"
import { useDispatch } from "react-redux"
import { LogedIn } from "../store/auth/actions"

const SignIn =()=> {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
    const dispatch = useDispatch()
    const navigate = useNavigate()


      const onSubmit = (data) => {
            HTTP("POST", "/signin", {...data})
            .then(res=>{
                if(res.success){
                    dispatch(LogedIn(res.token))
                    navigate("/")
                }
            })
      };


    return(
        <div className="bg-auth">
            <div className="auth-container">
                <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                    <div className="auth-header">
                        <span className="lock-icon">
                            <CiLock size={20} color="#ffffff"/>
                        </span>
                        <h5 className="mt-2">Sign in</h5>
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Enter email"
                            {...register("email", { required: true })}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Password"
                            {...register("password", { required: true })}
                        />
                    </div>
                    <button type="submit" className="btn btn-submit mt-3">Submit</button>
                    <Link to="/signup">Don't have an account? Sign Up</Link>
                </form>
            </div>
        </div>
    )
}
export default SignIn