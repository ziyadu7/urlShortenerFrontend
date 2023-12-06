import React from 'react'

function UrlsPage() {
  return (
    <div className='p-10'>
      <div className='flex gap-2 mx-auto max-w-sm'>
        <input type="text" value="" placeholder='Enter url here' className='block border border-gray-800 w-full px-4 py-2 rounded mb-4' />
        <button className='bg-neutral-900 rounded-md text-center text-white px-3 hover:bg-slate-700 h-11'>Shorten</button>
      </div>


      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
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
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">
                Black
              </td>
              <td className="px-6 py-4">
                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default UrlsPage