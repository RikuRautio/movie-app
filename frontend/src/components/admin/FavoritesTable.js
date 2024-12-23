
import React, {useState} from 'react';
import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";



const serverUrl = process.env.REACT_APP_API_URL


function FavoritesTable (){
  const { user } = useAuth0();
    const userId = user.sub;


const [favoritesData, setFavoritesData] = useState([]);


const getFavoritesTable = async () => {
 
   

    const response = await fetch(serverUrl+"/admin/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth0:id_token")}`,
      },
      body: JSON.stringify({ auth0_user_id: userId }),
    });
    setFavoritesData(await response.json());

    // console.log(response);
    // console.log(favoritesData);
  };

  useEffect(() => {
  
      getFavoritesTable();
    
  }, []);

    return(
        <>
        <div>
            <h2>Favorites Table</h2>
        </div>
        <div   className='table-container'>
            <table className='tables-table'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>user_id</th>
                        <th>movie_id</th>
                 

                    </tr>
                </thead>
                <tbody >
                    {favoritesData.map((user, index) => (
                        <tr  key={index}>
                            <td >{user.id}</td>
                            <td>{user.user_id}</td>
                            <td>{user.movie_id}</td>
                   
                        </tr>
                    ))}
                </tbody>
            </table>


           
        </div>
        
        
        </>
    )
}

export default FavoritesTable;