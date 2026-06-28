import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const SignUp = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  const navigate =useNavigate();

  const hanldeSignUp = async (e) => {
    e.preventDefault();
    if (!name) {
      setError('Please enter a valid name');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    if (!password) {
      setError('Please enter a password');
      return;
    }
   

    setError('');

    //SIGN UP API CALL

    try {
      const response = await axiosInstance.post('/create-account',{
        fullName:name,
        email:email,
        password:password
      })
      
      if(response.data &&response.data.error){
        setError(response.data.message)
        return
      }

      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
    }else{
      setError('An unexpected error occured. Please try again later')
    }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-20">
        <div className="w-96 border rounded bg-white px-6 py-10">
          <form onSubmit={hanldeSignUp}>
            <h4 className="text-2xl mb-2">Sign Up</h4>
             <input
             type="text"
             placeholder="Name"
             onChange={(e)=>setName(e.target.value)}
             value={name}
             className="input-box">
             </input>

             <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="input-box"
             >
             </input>
             <PasswordInput onChange={(e)=>setPassword(e.target.value)}
              value={password}
              placeholder='Password'></PasswordInput>

              {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
           
            <button type="submit" className="btn-primary">
              Sign In
            </button>
            <p className="">
              Already have an account?{""}
              <Link to="/login" className="text-primary underline ml-1">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
