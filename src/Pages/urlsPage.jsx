import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axios'
import toast from 'react-hot-toast';
import { useAuth } from '../context/authContext';

function UrlsPage() {

  const [urls, setUrls] = useState([])
  const [url, setUrl] = useState('')
  const token = localStorage.getItem('userToken')
  const {logout} = useAuth()
  const [reload,setReload] = useState(false)

  useEffect(() => {

    axiosInstance.get('/', {
      headers: {
        authorization: `Bearer ${encodeURIComponent(token)}`
      },
    })
      .then(res => {
        console.log(res);
        setUrls(res?.data?.urls);
      })
      .catch(err => {
        if (err?.response?.data?.message) {
          toast.error(err?.response?.data?.message)
        }
        console.log(err);
      });
  }, [reload]);


  const addUrl = () => {
    if (url.trim().length <= 0) {
      toast.error('Fill all the fields')
    } else {
      axiosInstance.post('/addUrl', { url }, {
        headers: {
          authorization: `Bearer ${encodeURIComponent(token)}`
        }
      }).then(res => {
        console.log(res);
        toast.success(res?.data?.message)
        setReload(!reload)
      }).catch(err => {
        console.log(err);
        if (err?.response?.data?.message) {
          toast.error(err?.response?.data?.message)
        }
      })
    }
  }

  const deleteUrl = (urlId)=>{
    console.log(urlId);
    axiosInstance.delete(`/deleteUrl/${urlId}`,{
      headers: {
      authorization: `Bearer ${encodeURIComponent(token)}`
    }}).then(res=>{
      toast.success(res.data.message)
      setReload(!reload)
    }).catch(err=>{
      console.log(err)
      if(err?.response?.data?.message){
        toast.error(err?.response?.data?.message)
      }
    })
  }

  return (
    <div className='p-10'>
      <div className='flex gap-2 mx-auto max-w-lg'>
        <input type="text" placeholder='Enter url here' onChange={(e) => setUrl(e.target.value)} className='block border border-gray-800 w-full px-4 py-2 rounded mb-4' />
        <button onClick={addUrl} className='bg-neutral-900 rounded-md text-center text-white px-3 hover:bg-slate-700 h-11'>Shorten</button>
        <div className='flex justify-end'>
          <button onClick={() => {
          logout()
          }} className='bg-red-500 rounded-md text-center text-white px-3 hover:bg-red-700 h-11'>Logout</button>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 hover:cursor-pointer">
                Original Url
              </th>
              <th scope="col" className="px-6 py-3">
                Shorten Url
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          {urls.length>0?urls?.map(url => (
         <tbody>
            
              <tr key={url?._id} className="bg-whit hover:bg-gray-50 text-blue-600">
                <td scope="row" className="px-6 py-4 hover:cursor-pointer font-medium whitespace-nowrap">
                  <a target='_blank' href={url.url}>{url.url}</a>
                </td>
                <td className="px-6 py-4 hover:cursor-pointer">
                  <a target='_blank' href={url.url}>{url.shortenUrl}</a>
                </td>
                <td className="px-6 py-4">
                  <button onClick={()=>deleteUrl(url?._id)} className="font-medium text-red-600 hover:cursor-pointer hover:underline">delete</button>
                </td>
              </tr>
          </tbody>
            )):
            <div className='flex text-red-600 font-semibold text-2xl justify-center '>
              Add any urls
            </div>
            }
        </table>
      </div>
    </div>
  )
}

export default UrlsPage