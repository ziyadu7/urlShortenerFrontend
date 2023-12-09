import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axios'
import toast from 'react-hot-toast';
import { useAuth } from '../context/authContext';

function UrlsPage() {

  const [urls, setUrls] = useState([])
  const [url, setUrl] = useState('')
  const token = localStorage.getItem('userToken')
  const { logout } = useAuth()
  const [reload, setReload] = useState(false)
  const [loading,setLoading] = useState(true)
  const [btnLoading,setBtnLoading] = useState(false)

  useEffect(() => {

    axiosInstance.get('/', {
      headers: {
        authorization: `Bearer ${encodeURIComponent(token)}`
      },
    })
      .then(res => {
        setLoading(false)
        setUrls(res?.data?.urls);
      })
      .catch(err => {
        setLoading(false)
        if (err?.response?.data?.message) {
          toast.error(err?.response?.data?.message)
        } else if (err?.message) {
          toast.error(err?.message)
        }
        console.log(err);
      });
  }, [reload]);


  const addUrl = () => {
    setBtnLoading(true)
    if (url.trim().length <= 0) {
      setBtnLoading(false)
      toast.error('Fill all the fields')
    } else {
      axiosInstance.post('/addUrl', { url }, {
        headers: {
          authorization: `Bearer ${encodeURIComponent(token)}`
        }
      }).then(res => {
        setBtnLoading(false)
        setUrl('')
        toast.success(res?.data?.message)
        setReload(!reload)
      }).catch(err => {
        setBtnLoading(false)
        setUrl('')
        console.log(err);
        if (err?.response?.data?.message) {
          toast.error(err?.response?.data?.message)
        } else if (err?.message) {
          toast.error(err?.message)
        }
      })
    }
  }

  const deleteUrl = (urlId) => {
    axiosInstance.delete(`/deleteUrl/${urlId}`, {
      headers: {
        authorization: `Bearer ${encodeURIComponent(token)}`
      }
    }).then(res => {
      toast.success(res.data.message)
      setReload(!reload)
    }).catch(err => {
      console.log(err)
      if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message)
      } else if (err?.message) {
        toast.error(err?.message)
      }
    })
  }

  return (
    <div className='p-10'>
      <div className='flex gap-2 mx-auto max-w-lg'>
        <input type="text" placeholder='Enter url here ' value={url} onChange={(e) => setUrl(e.target.value)} className='block border border-gray-800 w-full px-4 py-2 rounded mb-4' />
        <button onClick={addUrl} className='bg-neutral-900 rounded-md text-center text-white px-3 hover:bg-slate-700 h-11'>{btnLoading?<><svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
            </svg>Loading..</>:'Shorten'}</button>
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
            <tbody>

      {urls?.length > 0 ? urls?.map(url => (
              <tr key={url?._id} className="bg-whit hover:bg-gray-50 text-blue-600">
                <td scope="row" className="px-6 py-4 hover:cursor-pointer font-medium whitespace-nowrap">
                  <a target='_blank' href={url.url}>{url.url}</a>
                </td>
                <td className="px-6 py-4 hover:cursor-pointer">
                  <a target='_blank' href={url.url}>{url.shortenUrl}</a>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => deleteUrl(url?._id)} className="font-medium text-red-600 hover:cursor-pointer hover:underline">delete</button>
                </td>
              </tr>
)) :
  ''}

            </tbody>
          </table>
        </div>
      {urls?.length > 0?'':loading?<div className=' flex justify-center pt-10'><svg aria-hidden="true" role="status" className="inline mr-2 w-14 h-14 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"></path>
            </svg></div>:<div className='flex text-red-600 font-semibold text-2xl justify-center '>
        Add any urls
      </div>}
    </div>
  )
}

export default UrlsPage