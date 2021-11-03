import React, { useState } from "react";
import Card from "../../components/Checkout/Card";
import { FormInput } from "../../components/Checkout/FormInput";
import MainLayout from "../../components/MainLayout";
import { useAuth } from "../../contexts/AuthContext";
import Api from "../../utils/Api";

export default function AddAddress() {
  const { currentUser } = useAuth();

  const [Nama, setNama] = useState("");
  const [Email, setEmail] = useState("");
  const [NoTelp, setNoTelp] = useState("");
  const [Province, setProvince] = useState("Jawa Barat");
  const [City, setCity] = useState("Bandung");
  const [Alamat, setAlamat] = useState("");
  const [IsSubmit, setIsSubmit] = useState(false);

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
      options: [
        {
          label: "Jawa Barat",
          value: "Jawa Barat",
        },
        {
          label: "Jawa Timur",
          value: "Jawa Timur",
        },
        {
          label: "Jawa Tengah",
          value: "Jawa Tengah",
        },
      ],
    },
    {
      label: "Kabupaten/Kota",
      placeholder: "Masukkan kabupaten/kota",
      type: "select",
      value: City,
      onchange: (e) => setCity(e.target.value),
      name: "city",
      options: [
        {
          label: "Bandung",
          value: "Bandung",
        },
        {
          label: "Surabaya",
          value: "Surabaya",
        },
        {
          label: "Pekalongan",
          value: "Pekalongan",
        },
      ],
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

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const data = {
      city: City,
      provinsi: Province,
      nama: Nama,
      notelp: NoTelp,
      keterangan: Alamat,
      customerUID: currentUser.uid,
      email: Email,
    };
    console.log(data);
    Api.post("/address", data)
      .then((res) => {
        console.log(res);
        setIsSubmit(false);
      })
      .catch((err) => {
        setIsSubmit(false);
        console.log(err);
      });
  };

  return (
    <MainLayout title='Tambah Alamat'>
      <div>
        <div className='mb-5'>
          <Card>
            <form onSubmit={onSubmit}>
              {Inputs.map((input, index) => (
                <FormInput key={index} {...input} />
              ))}
              <div className='flex justify-center'>
                <button
                  disabled={IsSubmit}
                  className='px-6 disabled:opacity-50 py-3 rounded-md bg-blue-600 text-white font-medium'
                >
                  Simpan
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
