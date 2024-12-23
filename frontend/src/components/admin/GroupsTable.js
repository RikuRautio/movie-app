
import React, {useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';

const serverUrl = process.env.REACT_APP_API_URL


function GroupsTable (){
    const { user } = useAuth0();
    const userId = user.sub;

const [groupsData, setGroupsData] = useState([]);


const getGroupsTable = async () => {
  
 
   

    const response = await fetch(serverUrl+"/admin/Groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth0:id_token")}`,
      },
      body: JSON.stringify({ auth0_user_id: userId }),
     
    });
    setGroupsData(await response.json());

    // console.log(response);
    // console.log(groupsData);
  };

  useEffect(() => {
  
      getGroupsTable();
    
  }, []);

    return(
        <>
        <div>
            <h2>Groups Table</h2>
        </div>
        <div className='table-container'>
            <table className='tables-table'>
                <thead>
                    <tr>
             
                        <th>group_id</th>
                        <th>group_name</th>
                        <th>description</th>
                
                    </tr>
                </thead>
                <tbody>
                    {groupsData.map((user, index) => (
                        <tr key={index}>
                       
                            <td>{user.group_id}</td>
                            <td>{user.group_name}</td>
                            <td>{user.description}</td>
                        
                        
                          
                        </tr>
                    ))}
                </tbody>
            </table>


           
        </div>
        
        
        </>
    )
}

export default GroupsTable;