import React from 'react'
import MainLayout from '../../components/MainLayout'
import { convertToRupiah } from '../../utils/CovertToRupiah'

const products = [
    {
      name: 'Gitar Mantab 1',
      price: 14000,
      quantity : 5,
      image:
        'https://id.yamaha.com/id/files/Image-Index_L_series_1080x1080_efb34e0e2c101151b21700fd69cea900.jpg?impolicy=resize&imwid=396&imhei=396',
    },
    // More people...
  ]

export default function ShoppingCart() {
    return (
        <MainLayout title="Shopping Cart">
            <div className="flex justify-between items-start gap-5">
                <div className="flex flex-col w-3/5">
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
                                            Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Quantity
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Total
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
                                                
                                                </div>
                                        </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{convertToRupiah(product.price)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{product.quantity}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{convertToRupiah(product.price*product.quantity)}</div>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
                <div className="flex flex-col justify-center items-center w-2/5 bg-gray-200 rounded-md p-6">
                    <div className="flex w-full justify-between items-center mb-3">
                        <p>
                            Totals:
                        </p>
                        <p>
                            Rp70.000
                        </p>
                    </div>
                    <button className="bg-green-400 rounded-md p-2 mx-auto">
                        CheckOut
                    </button>
                </div>
                </div>
        
        </MainLayout>
    )
}
