import React from 'react'
import MainLayout from '../../components/MainLayout'

const products = [
    {
      name: 'Gitar Mantab 1',
      price: 'Rp14.000',
      courier : 'Reguler (1-2 hari) - J&T',
      image:
        'https://id.yamaha.com/id/files/Image-Index_L_series_1080x1080_efb34e0e2c101151b21700fd69cea900.jpg?impolicy=resize&imwid=396&imhei=396',
    },
    // More people...
  ]
  
export default function TrackingOrder() {
    return (
        <MainLayout title="Tracking Order">
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
                                        Product
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Status
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Courier
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Details</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.map((product, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full" src={product.image} alt="" />
                                            </div>
                                            <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            <div className="text-sm text-gray-500">{product.price}</div>
                                            </div>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Active
                                    </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{product.courier}</div>
                                        </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                        Details
                                    </a>
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
