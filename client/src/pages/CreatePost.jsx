// import axios from 'axios'
// import React, { useContext, useEffect, useState } from 'react'
// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'
// import { useNavigate } from 'react-router-dom'
// import { UserContext } from '../context/userContext'

// const CreatePost = () => {
//   const [title, setTitle] = useState('')
//   const [category, setCategory] = useState('Uncategorized')
//   const [description, setDescription] = useState('')
//   const [thumbnail, setThumbnail] = useState('')
//   const [error, setError] = useState('')
//   const navigate = useNavigate()

//   const { currentUser } = useContext(UserContext)
//   const token = currentUser?.token

//   useEffect(() => {
//     if (!token) {
//       navigate('/login')
//     }
//   }, [token, navigate])

//   const modules = {
//     toolbar: [
//       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
//       ['link', 'image'],
//       ['clean']
//     ]
//   }

//   const formats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent',
//     'link', 'image'
//   ]

//   const POST_CATEGORIES = [
//     "Agriculture", "SmallScaleBusiness", "Education", "DairyManagement", "Investment",
//     "Uncategorized", "ServiceandRepair", "CropManagement"
//   ]

//   const createPost = async (e) => {
//     e.preventDefault()
//     const postData = new FormData()
//     postData.set('title', title)
//     postData.set('category', category)
//     postData.set('description', description)
//     postData.set('thumbnail', thumbnail)

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, postData, {
//         withCredentials: true,
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       if (response.status === 201) {
//         return navigate('/')
//       }
//     } catch (err) {
//       if (err.response) {
//         setError(err.response.data.message)
//       } else {
//         setError('An error occurred. Please try again.')
//       }
//     }
//   }

//   return (
//     <section className="create-post">
//       <div className="container">
//         <h2>Create Post</h2>
//         {error && <p className="form_error-message">{error}</p>}
//         <form className="form create-post__form" onSubmit={createPost}>
//           <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
//           <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
//             {POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
//           </select>
//           <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} />
//           <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='image/png, image/jpg, image/jpeg' />
//           <button type="submit" className='btn primary'>Create</button>
//         </form>
//       </div>
//     </section>
//   )
// }

// export default CreatePost;


import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';



const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const POST_CATEGORIES = [
    "Agriculture", "SmallScaleBusiness", "Education", "DairyManagement", "Investment",
    "Uncategorized", "ServiceandRepair", "CropManagement"
  ];

  const createPost = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    postData.set('thumbnail', thumbnail);

    // Log FormData entries
    for (let [key, value] of postData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, postData, {
        withCredentials: false,
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 201) {
        return navigate('/');
      }
    } catch (err) {
      if (err.response) {
        console.error('Response error:', err.response.data);
        setError(err.response.data.message);
      } else if (err.request) {
        console.error('Request error:', err.request);
        setError('No response received from the server.');
      } else {
        console.error('Error:', err.message);
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        {error && <p className="form_error-message">{error}</p>}
        <form className="form create-post__form" onSubmit={createPost}>
          <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
            {POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} />
          <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='image/png, image/jpg, image/jpeg' />
          <button type="submit" className='btn primary'>Create</button>
        </form>
      </div>
    </section>
  );
}

export default CreatePost;
