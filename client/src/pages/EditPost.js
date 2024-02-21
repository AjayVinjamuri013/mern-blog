import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost(){
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [cover, setCover] = useState('');
    
    useEffect(() => {
        fetch('http://localhost:4000/post/'+id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.summary);
                    setSummary(postInfo.summary);
                })
            })
    }, []);

    async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content',content);
        data.set('id',id);
        if(files?.[0])
        data.set('file',files?.[0]);
        await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });
        setRedirect(true);
    }

    if(redirect) {
        return <Navigate to={'/post/'+id} />
    }

    return (
        <form onSubmit={updatePost}>
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
            <button style={{marginTop: '5px'}}>Update post</button>
        </form>
    );
}