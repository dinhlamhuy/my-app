import axios from 'axios'
import { useState, useEffect } from 'react'
interface userType {
  title: string,
  userId:number,
  id:number,
  body:string,

}
export default function Getapi() {
  const [users, userlist] = useState<userType[]>([]);
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response: any) => {
        console.log(response);
        userlist(response.data)
      })
      .catch((error: any) => {
        alert(error)
      })
  }, [])

  return (
    <div>
      {users.map((user) => (
        <>
        <p>userId: {user['userId']}</p>
        <p>id: {user['id']}</p>
        <p>title: {user['title']}</p>
        <p>body: {user['body']}</p>
        </>
      ))}
    </div>
  )
}


