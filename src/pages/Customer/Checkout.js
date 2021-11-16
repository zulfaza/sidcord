import React, { Fragment, useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import Card from "../../components/Checkout/Card";
import { convertToRupiah } from "../../utils/CovertToRupiah";
import { useCart } from "../../contexts/CartContext";
import { useHistory } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import GetUserToken from "../../utils/GetUserToken";
import Api from "../../utils/Api";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

const calculateTotalProduct = (Carts) => {
  let total = 0;
  if (Carts && Carts.length > 0)
    Carts.forEach((cart) => {
      if (cart.cartItems.length > 0)
        cart.cartItems.forEach((product) => {
          total += product.price * product.quantity;
        });
    });

  return total;
};

export const Checkout = () => {
  const { Order, updateCart } = useCart();
  const { currentUser } = useAuth();
  const history = useHistory();
  const [SelectedKurir, setSelectedKurir] = useState({});
  const [IsSubmit, setIsSubmit] = useState(false);
  const [BtnSubmitLabel, setBtnSubmitLabel] = useState("Bayar");
  const [Addresses, setAddresses] = useState([]);
  const [SelectedAddress, setSelectedAddress] = useState({});
  const [KurirOptions, setKurirOptions] = useState([]);
  const [IsOpen, setIsOpen] = useState(false);
  const [TotalShippingCost, setTotalShippingCost] = useState(0);
  const [TotalProductCost, setTotalProductCost] = useState(0);

  useEffect(() => {
    setTotalProductCost(calculateTotalProduct(Order?.carts ?? 0));
  }, [Order]);

  useEffect(() => {
    const calculateTotalShippingCost = async (kurirs) => {
      const keys = Object.keys(kurirs);
      let totalShippingCost = 0;
      keys.forEach((key) => {
        totalShippingCost += kurirs[key].shippingCost;
      });
      return totalShippingCost;
    };

    calculateTotalShippingCost(SelectedKurir).then((shippingCost) =>
      setTotalShippingCost(shippingCost)
    );
  }, [SelectedKurir]);

  useEffect(() => {
    Api.get(`/address?customerUID=${currentUser.uid}`).then((res) => {
      setAddresses(res.data.data);
      setSelectedAddress(res.data.data[0]);
    });

    Api.get(`/couriers`).then((res) => {
      setKurirOptions(res.data.data);
    });
  }, [currentUser]);

  useEffect(() => {
    if (Order?.totalQuantity < 1) history.push("/customer/shopping-cart");
  }, [history, Order]);

  async function UpdateShippingCost(address) {
    const newSelectedKurir = {
      ...SelectedKurir,
    };
    const keys = Object.keys(newSelectedKurir);
    if (keys.length < 1) return;

    let promises = [];

    keys.forEach((key) => {
      if (newSelectedKurir[key]) {
        promises.push(
          CalculateShippingCost(
            newSelectedKurir[key].basePrice,
            newSelectedKurir[key].sellerId,
            address
          ).then((shippingCost) => {
            newSelectedKurir[key] = {
              ...newSelectedKurir[key],
              shippingCost,
            };
          })
        );
      }
    });

    await Promise.all(promises);
    setSelectedKurir(newSelectedKurir);
  }

  async function CalculateShippingCost(
    kurir,
    sellerId,
    address = SelectedAddress
  ) {
    const sellerAddress = await Api.get("/address/?sellerUID=" + sellerId).then(
      (res) => res.data.data[0]
    );

    const params = {
      asal: sellerAddress.city,
      tujuan: address.city,
      kurir: kurir,
    };
    return Api.post("/couriers/ongkir", params).then(
      (res) => res.data[0].value
    );
  }

  async function HandleGantiKurir(kurirId, cartId, sellerId) {
    const kurir = KurirOptions.filter((data) => data.id === kurirId)[0];
    const ArrSelectedKurir = {
      ...SelectedKurir,
    };
    const shippingCost = await CalculateShippingCost(kurirId, sellerId);
    ArrSelectedKurir[cartId] = {
      ...kurir,
      sellerId,
      shippingCost,
    };
    setSelectedKurir(ArrSelectedKurir);
  }

  const onSubmit = async () => {
    setIsSubmit(true);

    const reqBody = {
      alamatId: SelectedAddress.id,
      kurirIds: SelectedKurir,
      customerUID: currentUser.uid,
    };

    setIsSubmit(false);

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
        window.location.href = apiRes.data.data.redirectUrl;
      }, 500);
    } else {
      setIsSubmit(false);
      setBtnSubmitLabel("Error X_x, try again later");
    }
  };

  return (
    <MainLayout title='Checkout'>
      <AddressModal
        setIsOpen={setIsOpen}
        setSelectedAddress={setSelectedAddress}
        IsOpen={IsOpen}
        SelectedAddress={SelectedAddress}
        Addresses={Addresses}
        UpdateShippingCost={UpdateShippingCost}
      />
      <div className='container gap-10 md:grid grid-cols-2'>
        <div>
          <div className='mb-5'>
            <h2 className='text-2xl font-medium mb-6'>Ringkasan Belanja</h2>
            {Order?.carts?.map((Cart) => (
              <div key={Cart.id}>
                <h3 className='text-lg capitalize font-bold'>
                  {Cart.seller.name}
                </h3>
                <h5>{Cart.seller?.address?.recap}</h5>
                <Card>
                  {Cart?.cartItems?.map((product) => (
                    <div key={product.id}>
                      <div
                        key={product.id}
                        className='flex justify-between mb-5'
                      >
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
                            <h5 className='text-xl capitalize'>
                              {product.name}
                            </h5>
                            <h6>{convertToRupiah(product.price)}</h6>
                          </div>
                        </div>
                        <div className='flex items-center'>
                          <span className='text-lg font-medium'>
                            x {product.quantity}
                          </span>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                  <select
                    defaultValue={"default"}
                    onChange={(e) =>
                      HandleGantiKurir(e.target.value, Cart.id, Cart.sellerUID)
                    }
                    className='w-full my-3 border border-gray-300 rounded'
                  >
                    <option value='default' disabled>
                      Pilih Kurir
                    </option>
                    {KurirOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.nama}
                      </option>
                    ))}
                  </select>
                  <div>
                    {SelectedKurir[Cart.id] && (
                      <span>
                        {convertToRupiah(SelectedKurir[Cart.id]?.shippingCost)}
                      </span>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className='mb-5'>
            <h2 className='text-2xl font-medium mb-6'>Alamat Pengiriman</h2>
            <Card>
              {Addresses.length > 0 ? (
                <div className='p-4 rounded-lg border flex justify-between items-start'>
                  <div>
                    <h5 className='text-lg font-bold'>
                      {SelectedAddress.nama}
                    </h5>
                    <p className='text-sm'>{SelectedAddress.recap}</p>
                    <p>Telp:{SelectedAddress.notelp}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => setIsOpen(true)}
                      className='rounded-md border px-4 py-2 capitalize'
                    >
                      ganti alamat
                    </button>
                  </div>
                </div>
              ) : (
                <div className='border rounded-xl border-dashed border-gray-400 p-6'>
                  <Link to='/customer/add-address'>+ Tambah Alamat</Link>
                </div>
              )}
            </Card>
          </div>
          <div>
            <Card>
              <div className='py-3 px-5'>
                <div className='flex justify-between mb-5 text-xl'>
                  <span>Total Harga Barang</span>
                  <span>{convertToRupiah(TotalProductCost)}</span>
                </div>
                <div className='flex justify-between mb-5 text-xl'>
                  <span>Total Biaya Pengiriman</span>
                  <span>{convertToRupiah(TotalShippingCost)}</span>
                </div>
                <hr className='mb-5' />
                <div className='flex justify-between mb-5 text-xl'>
                  <span>Total</span>
                  <span>
                    {convertToRupiah(TotalShippingCost + TotalProductCost)}
                  </span>
                </div>
                <div className='flex justify-center'>
                  <button
                    disabled={IsSubmit}
                    onClick={onSubmit}
                    className='px-6 disabled:opacity-50 py-3 rounded-md bg-blue-600 text-white font-medium'
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

const AddressModal = ({
  IsOpen,
  setIsOpen,
  SelectedAddress,
  setSelectedAddress,
  Addresses,
  UpdateShippingCost,
}) => {
  return (
    <>
      <Transition appear show={IsOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={() => setIsOpen(false)}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  Pilih alamat
                </Dialog.Title>

                <div className='p-3 rounded-lg border border-dashed my-4'>
                  <Link to='/customer/add-address'>+ Tambah Alamat</Link>
                </div>

                <div className='my-4'>
                  {Addresses.map((alamat) => (
                    <div
                      key={alamat.id}
                      className='flex mb-5 justify-between items-start p-4 rounded-lg border'
                    >
                      <div>
                        <h5 className='text-lg font-bold'>{alamat.nama}</h5>
                        <p className='text-sm'>
                          {alamat.city}, {alamat.provinsi},{alamat.keterangan}{" "}
                        </p>
                        <p>Telp:{alamat.notelp}</p>
                      </div>
                      {SelectedAddress.id !== alamat.id && (
                        <div>
                          <button
                            onClick={() => {
                              setIsOpen(false);
                              setSelectedAddress(alamat);
                              UpdateShippingCost(alamat);
                            }}
                            className='rounded-md border px-4 py-2 capitalize'
                          >
                            Pilih
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
