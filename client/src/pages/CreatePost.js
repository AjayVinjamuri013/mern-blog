import { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from "react-router-dom";
import Editor from "../Editor";

export default function CreatePost(){
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    
    async function createNewPost(event){
        event.preventDefault();
        //We are not sending data as json because of there is input of type "file" in the form below.
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content',content);
        data.set('file',files[0]);
        //console.log(files)
        const response = await fetch('http://localhost:4000/post',{
            method: 'POST',
            body: data,
            credentials: 'include',
        });

        if(response.ok){
            setRedirect(true)
        }
    }

    if(redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={createNewPost}>
            <input type='title' 
                   placeholder="Title" 
                   value={title} 
                   onChange={event => setTitle(event.target.value)}/>
            <input type="summary" 
                   placeholder="Summary" 
                   value={summary} 
                   onChange={event => setSummary(event.target.value)}/>
            <input type="file"
                   onChange={event => setFiles(event.target.files)}/>
            <Editor onChange={setContent} value={content} />
            <button style={{marginTop: '5px'}}>Create post</button>
        </form>
    );
}