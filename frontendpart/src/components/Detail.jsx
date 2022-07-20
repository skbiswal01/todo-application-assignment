import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";


export const Detail = ({ isLoggedIn }) => {
    let { taskId } = useParams();
    let navigate = useNavigate();
    const [singletodo, setsingletodo] = useState()

    useEffect(() => {
        getdetailTodo()
    }, [])


    const getdetailTodo = async () => {
        try {
            let res = await fetch(`http://localhost:3008/task/todo/${taskId}`);
            let data = await res.json();
            console.log(data, "data")
            setsingletodo(data)

        } catch (error) {
            console.log(error.message)
        }
        console.log(singletodo)
    }

    const deleteTodo = async () => {
        let response = await fetch(`http://localhost:3008/task/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

        let d = await response.json()
        navigate(`/todo`, { replace: true });
    }



    return isLoggedIn ? <div>
        <h1>Todo Description</h1>
        <div className="button">
            <button onClick={() => {
                deleteTodo()
            }}>Delete</button>

            <button onClick={() => {
                navigate(`/update/${taskId}`, { replace: true });
            }}>Renew</button>
        </div>
        {singletodo ? <div className="single-todo">
            <p>TaskID : {singletodo.taskId}</p>
            <p>Title : {singletodo.title}</p>
            <p>Creation time : {singletodo.startTime}</p>
        </div> : ""}
    </div> : <div>
        <h1>Please Login</h1>

    </div>
}