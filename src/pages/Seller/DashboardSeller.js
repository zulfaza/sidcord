import React from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../../components/MainLayout'

/* This example requires Tailwind CSS v2.0+ */
const people = [
    {
        name: 'Zul Faza',
        address: 'Jl. Lembah Pinang 6, Pondok Kelapa, Jakarta Timur',
        provinsi: 'DKI Jakarta',
        telepon: '085938473947',
        email: 'zulfaza@example.com',
        image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTGdF2v92mRcAWnrt4VMvMYAeEX9KdYDhSdA&usqp=CAU',
    },
    {
        name: 'Vincent Gunawan',
        address: 'Jl. Pahlawan No.9, Mugassari, Semarang',
        provinsi: 'Jawa Tengah',
        telepon: '084938402911',
        email: 'masvincen@example.com',
        image:
          'https://storage.qoo-static.com/game/9257/UUAu7nLwEXfu084Bp5AnE2rcVwRJuPks.png',
    },
    {
        name: 'Caroline Chan',
        address: 'Jl. Ahmad Yani, Wonocolo, Surabaya',
        provinsi: 'Jawa Timur',
        telepon: '089768945683',
        email: 'cece@example.com',
        image:
          'https://dev.mangajam.com/wp-content/uploads/part3/how_draw_kagome_inuyasha_11.jpg',
    },
    {
        name: 'Aditya Bomantara',
        address: 'Jl. Raya Tegar Beriman, Cibinong',
        provinsi: 'Jawa Barat',
        telepon: '081837940374',
        email: 'boman@example.com',
        image:
          'https://img.tek.id/img/content/2019/07/31/18847/the-continental-bakal-jadi-prequel-dari-john-wick-TLhUkWLssc.jpg',
    },
    {
        name: 'Krisna Parulian',
        address: 'Jl. P. Diponegoro 30, Medan',
        provinsi: 'Sumatra Utara',
        telepon: '083489364987',
        email: 'krisna@example.com',
        image:
          'https://i.pinimg.com/originals/9f/53/9f/9f539fd6798afe429ae23160af4090da.jpg',
    },
    {
        name: 'Raden Faris',
        address: 'Jl. Ambacang, Cubadak, Kota Pariaman',
        provinsi: 'Sumatra Barat',
        telepon: '087839456562',
        email: 'radenfaris@example.com',
        image:
          'https://d275t8dp8rxb42.cloudfront.net/pokemon/portrait/Pikachu.png',
    },
    {
        name: 'Farabi Ganteng',
        address: 'Jl. Citarum Blok F, Sukamaju, Palembang',
        provinsi: 'Sumatra Selatan',
        telepon: '0859384739478',
        email: 'sejalankreatip@example.com',
        image:
          'http://dcse.fmipa.ugm.ac.id/site/wp-content/uploads/2017/01/P-Medi.jpg',
    },
  ]
  
  export default function Example() {
    return (
    <MainLayout>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Nama Lengkap
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Alamat
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Telepon
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {people.map((person) => (
                    <tr key={person.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{person.name}</div>
                            <div className="text-sm text-gray-500">{person.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{person.address}</div>
                        <div className="text-sm text-gray-500">{person.provinsi}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{person.telepon}</div>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.role}</td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </MainLayout>
    )
  }
  
