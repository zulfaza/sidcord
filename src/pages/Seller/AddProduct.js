import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/MainLayout";
import { useAuth } from "../../contexts/AuthContext";
import { Editor } from "@tinymce/tinymce-react";
import { useDropzone } from "react-dropzone";
import StringToSlug from "../../utils/StringToSlug";
import { storage } from "../../config/Firebase";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { useHistory } from "react-router";
import Api from "../../utils/Api";

export default function AddProduct() {
  const { currentUser } = useAuth();
  const editorRef = useRef(null);
  const [ProductName, setProductName] = useState("");
  const [Stock, setStock] = useState(1);
  const [Price, setPrice] = useState(0);
  const [Category, setCategory] = useState("");
  const [Thumbnail, setThumbnail] = useState([]);
  const [Loading, setLoading] = useState(false);
  const history = useHistory();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDrop: (acceptedFiles) => {
      setThumbnail(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      Thumbnail.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [Thumbnail]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const token = await currentUser.getIdToken();
    const thumb = Thumbnail[0];
    const storageRef = ref(storage, Date.now() + thumb.name);
    const thumbUpload = await uploadBytes(storageRef, thumb)
      .then((snapshot) => {
        return {
          isError: false,
        };
      })
      .catch((err) => {
        return {
          isError: true,
          error: err,
        };
      });

    if (thumbUpload.isError) {
      console.log(thumbUpload.error);
      setLoading(false);
      return;
    }

    const thumbUrl = await getDownloadURL(storageRef);

    const request = {
      name: ProductName,
      slug: StringToSlug(ProductName),
      price: Price,
      stock: Stock,
      sellerUID: currentUser.uid,
      description: editorRef.current.getContent(),
      category: Category,
      thumbnail: thumbUrl,
    };

    const config = {
      headers: {
        authentication: token,
      },
    };

    return Api.post("/products", request, config)
      .then((res) => {
        console.log(res);
        history.push("/seller/dashboard");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }

  return (
    <MainLayout title='Add Product'>
      <div>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Product
              </h3>
              <p className='mt-1 text-sm text-gray-600'>
                Fill the form to add your product.
              </p>
              <p>
                <Link to='/seller/dashboard'>Go back</Link>
              </p>
            </div>
          </div>
          <div className='mt-5 md:mt-0 md:col-span-2'>
            <form onSubmit={handleSubmit}>
              <div className='shadow sm:rounded-md sm:overflow-hidden'>
                <div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
                  <div className='grid grid-cols-3 gap-6'>
                    <div className='col-span-3 sm:col-span-2'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Product Name
                      </label>
                      <input
                        type='text'
                        onChange={(e) => setProductName(e.target.value)}
                        name='Product-name'
                        id='product-name'
                        placeholder='Product Name'
                        className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                      <label className='block text-sm font-medium text-gray-700'>
                        Stock
                      </label>
                      <input
                        type='number'
                        onChange={(e) => setStock(e.target.value)}
                        name='Stock'
                        id='Stock'
                        placeholder='1'
                        className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                      <label className='block text-sm font-medium text-gray-700'>
                        Price
                      </label>
                      <input
                        type='number'
                        onChange={(e) => setPrice(e.target.value)}
                        name='price'
                        placeholder='1'
                        className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />

                      <div className='col-span-6 sm:col-span-3'>
                        <label
                          htmlFor='country'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Category
                        </label>
                        <select
                          onChange={(e) => setCategory(e.target.value)}
                          id='category'
                          name='category'
                          className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        >
                          <option value='gitar'>Gitar</option>
                          <option value='piano'>Piano</option>
                          <option value='bass'>Bass</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Product Photo
                    </label>
                    <input {...getInputProps()} />
                    <div
                      {...getRootProps({
                        className:
                          "mt-1 cursor-pointer flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md",
                      })}
                    >
                      {Thumbnail.length < 1 ? (
                        <div className='space-y-1 text-center'>
                          <svg
                            className='mx-auto h-12 w-12 text-gray-400'
                            stroke='currentColor'
                            fill='none'
                            viewBox='0 0 48 48'
                            aria-hidden='true'
                          >
                            <path
                              d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                              strokeWidth={2}
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                          <div className='flex text-sm text-gray-600'>
                            <label
                              htmlFor='file-upload'
                              className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
                            >
                              <span>Upload a file</span>
                            </label>
                            <p className='pl-1'>or drag and drop</p>
                          </div>
                          <p className='text-xs text-gray-500'>
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      ) : (
                        Thumbnail.map((file) => (
                          <div key={file.name}>
                            <div>
                              <img src={file.preview} alt='' />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor='about'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Description
                    </label>
                    <div className='mt-1'>
                      <Editor
                        apiKey='vrt6aa3wr0siwirjjmk234ig94d6dgkc1vuin23b9jaid2li'
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        init={{
                          height: 500,
                          menubar: false,
                          plugins: [
                            "advlist autolink lists link image charmap print preview anchor",
                            "searchreplace visualblocks code fullscreen",
                            "insertdatetime media table paste code help wordcount",
                          ],
                          toolbar:
                            "undo redo | formatselect | " +
                            "bold italic backcolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                          content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                  <button
                    disabled={Loading}
                    type='submit'
                    className=' disabled:opacity-50 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
