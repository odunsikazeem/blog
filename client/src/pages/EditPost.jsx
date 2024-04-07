import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams, Link } from "react-router-dom";
import { useEffect } from 'react';

const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike','blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
}

function EditPost(){
    const {id} = useParams()
    const[title,setTitle] = useState('')
    const[summary,setSummary] = useState('')
    const [content,setContent] = useState('')
    const [files,setFiles] = useState('')
    const [redirect,setRedirect] = useState(false)

    useEffect(() => {
fetch(`http://localhost:4000/post/${id}`)
.then(response => {
response.json().then(postInfo => {
setTitle(postInfo.title);
setContent(postInfo.content);
setSummary(postInfo.summary);
});
});

}, []);

async function updatePost(e){
    e.preventDefault();
    const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('id',id)
        if (files?.[0]) {
         data.set('file', files?.[0])
        }
        
    const response = await fetch('http://localhost:4000/post',{
        method: 'PUT',
body: data,
credentials: 'include'
    });
    if (response.ok) {
       setRedirect(true);
    }
    
}

    if (redirect) {
        window.location.href = `/post/'${id}`;
    }
    return(
<form onSubmit={updatePost}>
            <input type='title' placeholder={'title'} value={title} onChange={e => setTitle(e.target.value)} />
            <input type='summary' placeholder={'summary'} value={summary} onChange={e => setSummary(e.target.value)} />
            <input type='file' onChange={e => setFiles(e.target.files)} />
            <ReactQuill value={content} onChange={newValue => setContent(newValue)} modules={modules} />
            <button style={{marginTop:'5px'}}>Update post</button>
        </form>
    )
}


export default EditPost;