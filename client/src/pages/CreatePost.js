import { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

//modules and formats from react quill documentation in npm.
const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

export default function CreatePost(){
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    
    return (
        <form>
            <input type='title' 
                   placeholder="Title" 
                   value={title} 
                   onChange={event => setTitle(event.target.value)}>
            </input>
            <input type="summary" 
                   placeholder="Summary" 
                   value={summary} 
                   onChange={event => setSummary(event.target.value)}>
            </input>
            <input type="file"/>
            <ReactQuill value={content} 
                        onChange={newValue => setContent(newValue)}
                        module={modules} 
                        formats={formats}/>
            <button style={{marginTop: '5px'}}>Create post</button>
        </form>
    );
}