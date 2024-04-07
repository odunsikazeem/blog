import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

function CreatePost(){
    const[title,setTitle] = useState('')
    const[summary,setSummary] = useState('')
    const [content,setContent] = useState('')
    const [files,setFiles] = useState('')
    const [redirect,setRedirect] = useState(false)

    async function createNewPost(e){
        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('content', content)
        data.set('file', files[0])
        e.preventDefault()
       const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
       }) 
       if (response.ok){
        setRedirect(true);
       }
    }
if (redirect) {
    window.location.href = '/';
}
    return(
        <form onSubmit={createNewPost}>
            <input type='title' placeholder={'title'} value={title} onChange={e => setTitle(e.target.value)} />
            <input type='summary' placeholder={'summary'} value={summary} onChange={e => setSummary(e.target.value)} />
            <input type='file' onChange={e => setFiles(e.target.files)} />
            <ReactQuill value={content} onChange={newValue => setContent(newValue)} modules={modules} />
            <button style={{marginTop:'5px'}}>Create post</button>
        </form>
    )
}

export default CreatePost