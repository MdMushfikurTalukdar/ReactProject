import { Button } from "@mui/material";
import axios from "axios";


export const Testing=()=>{

   let data = JSON.stringify({
        "registration_number": "1234567891013",
        "role": "student",
        "password": "235246466",
        "password2": "235246466"
      });
      
      console.log(data);

      const handleRegister = () => {
        axios({
          url: "https://amarnath013.pythonanywhere.com/api/user/register/",
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          data: data,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      };
  
    return(
        <>
        <Button onClick={handleRegister}>register</Button>
        </>
    )
}