import React, { useEffect, useState } from "react";
import { FormInput } from "../../components/Checkout/FormInput";
import MainLayout from "../../components/MainLayout";
import Card from "../../components/Checkout/Card";
import { convertToRupiah } from "../../utils/CovertToRupiah";
import { useCart } from "../../contexts/CartContext";
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import GetUserToken from "../../utils/GetUserToken";
import Api from "../../utils/Api";

const KurirOptions = [
  {
    label: "Reguler (1-2 hari) - J&T",
    value: "Reguler (1-2 hari) - J&T",
  },
];

const calculateTotalProduct = (products) => {
  let total = 0;
  products.forEach((product) => {
    total += product.price * product.quantity;
  });
  return total;
};

export const Checkout = () => {
  const { Cart, updateCart } = useCart();
  const { currentUser } = useAuth();
  const history = useHistory();
  const [Nama, setNama] = useState("");
  const [Email, setEmail] = useState("");
  const [NoTelp, setNoTelp] = useState("");
  const [Alamat, setAlamat] = useState("");
  const [SelectedKurir, setSelectedKurir] = useState(KurirOptions[0].value);
  const [IsSubmit, setIsSubmit] = useState(false);
  const [BtnSubmitLabel, setBtnSubmitLabel] = useState("Bayar");

  const Inputs = [
    {
      label: "Nama",
      placeholder: "Masukan nama penerima",
      value: Nama,
      onchange: (e) => setNama(e.target.value),
    },
    {
      label: "Email",
      placeholder: "Masukan email penerima",
      type: "email",
      value: Email,
      onchange: (e) => setEmail(e.target.value),
    },
    {
      label: "No Telp",
      placeholder: "Masukan No Telp penerima",
      type: "number",
      value: NoTelp,
      onchange: (e) => setNoTelp(e.target.value),
    },
    {
      label: "Alamat",
      placeholder: "Masukan alamt penerima",
      type: "textarea",
      value: Alamat,
      onchange: (e) => setAlamat(e.target.value),
    },
  ];

  useEffect(() => {
    if (Cart?.cartItems?.length < 1) history.push("/customer/shopping-cart");
  }, [history, Cart]);

  const onSubmit = async () => {
    setIsSubmit(true);

    const reqBody = {
      namaPenerima: Nama,
      email: Email,
      noTelp: NoTelp,
      alamat: Alamat,
      namaKurir: SelectedKurir,
      id: Cart.id,
    };

    const config = {
      headers: {
        authentication: await GetUserToken(currentUser),
      },
    };

    const apiRes = await Api.put("/carts/checkout", reqBody, config).catch(
      (err) => {
        console.log(err.message);
        return err;
      }
    );

    if (apiRes.status === 200) {
      updateCart();
      setBtnSubmitLabel("Success !");
      setTimeout(() => {
        history.push("/customer/tracking-order");
      }, 500);
    } else {
      setIsSubmit(false);
      setBtnSubmitLabel("Error X_x, try again later");
    }
  };

  return (
    <MainLayout title='Checkout'>
      <div className='container gap-10 md:grid grid-cols-2'>
        <div>
          <div className='mb-5'>
            <h2 className='text-2xl font-medium mb-6'>Alamat Pengiriman</h2>
            <Card>
              {Inputs.map((input, index) => (
                <FormInput key={index} {...input} />
              ))}
            </Card>
          </div>
          <div className='mb-5'>
            <h2 className='text-2xl font-medium mb-6'>Kurir Pengiriman</h2>
            <Card>
              <select
                onChange={(e) => setSelectedKurir(e.target.value)}
                className='w-full border border-gray-300 rounded'
              >
                {KurirOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Card>
          </div>
        </div>
        <div>
          <div className='mb-5'>
            <h2 className='text-2xl font-medium mb-6'>Ringkasan Belanja</h2>
            <Card>
              {Cart?.cartItems?.map((product, index) => (
                <div key={index} className='flex justify-between mb-5'>
                  <div className='flex'>
                    <div className='relative mr-3'>
                      <div className='w-20 h-20 overflow-hidden rounded-md'>
                        <img
                          className='object-cover w-full h-full object-center'
                          src={product.thumbnail}
                          alt={product.name}
                        />
                      </div>
                    </div>
                    <div>
                      <h5 className='text-xl'>{product.name}</h5>
                      <h6>{convertToRupiah(product.price)}</h6>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-lg font-medium'>
                      x {product.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </Card>
          </div>
          <div>
            <Card>
              <div className='py-3 px-5'>
                <div className='flex justify-between mb-5 text-xl'>
                  <span>Total Harga Barang</span>
                  <span>
                    {convertToRupiah(calculateTotalProduct(Cart?.cartItems))}
                  </span>
                </div>
                <div className='flex justify-center'>
                  <button
                    disabled={IsSubmit}
                    onClick={onSubmit}
                    className='px-6 py-3 rounded-md bg-blue-600 text-white font-medium'
                  >
                    {BtnSubmitLabel}
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
