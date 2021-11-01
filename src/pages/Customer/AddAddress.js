import React, { useEffect, useState } from "react";
import Card from '../../components/Checkout/Card'
import { FormInput } from '../../components/Checkout/FormInput'
import MainLayout from "../../components/MainLayout";

const KurirOptions = [
    {
      label: "Reguler (1-2 hari) - J&T",
      value: "Reguler (1-2 hari) - J&T",
    },
  ];

export default function AddAddress() {
    const [Nama, setNama] = useState("");
    const [Email, setEmail] = useState("");
    const [NoTelp, setNoTelp] = useState("");
    const [Province, setProvince] = useState("")
    const [City, setCity] = useState("")
    const [Alamat, setAlamat] = useState("");
    const [IsSubmit, setIsSubmit] = useState(false);
    const [BtnSubmitLabel, setBtnSubmitLabel] = useState("Bayar");

    const Inputs = [
        {
          label: "Nama",
          placeholder: "Masukan nama penerima",
          value: Nama,
          onchange: (e) => setNama(e.target.value),
          name: "name",
        },
        {
          label: "Email",
          placeholder: "Masukan email penerima",
          type: "email",
          value: Email,
          onchange: (e) => setEmail(e.target.value),
          name: "email",
        },
        {
          label: "No Telp",
          placeholder: "Masukan No Telp penerima",
          type: "tel",
          value: NoTelp,
          onchange: (e) => setNoTelp(e.target.value),
          name: "phone",
        },
        {
            label: "Provinsi",
            placeholder: "Masukkan provinsi",
            type: "select",
            value: Province,
            onchange: (e) => setProvince(e.target.value),
            name: "province",
            options : [
                {
                    label:'Jawa Barat',
                    value: 1
                }
            ]
        },
        {
            label: "Kabupaten/Kota",
            placeholder: "Masukkan kabupaten/kota",
            type: "select",
            value: City,
            onchange: (e) => setCity(e.target.value),
            name: "city",
            options : [
                {
                    label:'Bandung',
                    value: 1
                }
            ]
        },
        {
          label: "Alamat",
          placeholder: "Masukan alamat penerima",
          type: "textarea",
          value: Alamat,
          onchange: (e) => setAlamat(e.target.value),
          name: "address",
        },
      ];
    
    return (
        <MainLayout title='Tambah Alamat'>
            <div>
            <div className='mb-5'>
                <Card>
                {Inputs.map((input, index) => (
                    <FormInput key={index} {...input} />
                ))}
                <div className='flex justify-center'>
                    <button className='px-6 disabled:opacity-50 py-3 rounded-md bg-blue-600 text-white font-medium'>
                        Simpan
                    </button>
                </div>
                </Card>
            </div>
            </div>
        </MainLayout>
    )
}
