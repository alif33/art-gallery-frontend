import { Link, useNavigate } from "react-router-dom"
import { CiLock } from "react-icons/ci"
import { useForm } from "react-hook-form"
import { HTTP } from "../helpers/HTTP"

const SignUp =()=> {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

    const navigate = useNavigate()

    const onSubmit = (data) => {
        HTTP("POST", "/register", {...data})
        .then(res=>{
            if(res.success){
                navigate("/signin")
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
                            type="text" 
                            className="form-control" 
                            placeholder="First name"
                            {...register("firstName", { required: true })}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Last name"
                            {...register("lastName", { required: true })}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Email"
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
export default SignUp