import React from "react";

export default function Hero() {
  return (
    <header className='relative bg-white overflow-hidden'>
      <div className='pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48'>
        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static'>
          <div className='sm:max-w-lg'>
            <h1 className='text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl'>
              Sidcord
            </h1>
            <p className='mt-4 text-xl text-gray-500'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio placeat aspernatur adipisci magni, magnam maiores
              voluptate quod rerum quisquam corporis ut at voluptas harum porro
              nulla. Velit incidunt accusamus blanditiis.
            </p>
          </div>
          <div>
            <div className='mt-10'>
              {/* Decorative image grid */}
              <div
                aria-hidden='true'
                className='pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full'
              >
                <div className='absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8'>
                  <div className='flex items-center space-x-6 lg:space-x-8'>
                    <div className='flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8'>
                      <div className='w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100'>
                        <img
                          src='https://images.musicstore.de/images/0960/gibson-les-paul-standard-60s-bourbon-burst_2_GIT0049494-000.jpg'
                          alt=''
                          className='w-full h-full object-center object-cover'
                        />
                      </div>
                      <div className='w-44 h-64 rounded-lg overflow-hidden'>
                        <img
                          src='https://images.musicstore.de/images/0960/gibson-les-paul-standard-60s-bourbon-burst_5_GIT0049494-000.jpg'
                          alt=''
                          className='w-full h-full object-center object-cover'
                        />
                      </div>
                    </div>
                    <div className='flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8'>
                      <div className='w-44 h-64 rounded-lg overflow-hidden'>
                        <img
                          src='https://images.musicstore.de/images/0960/gibson-les-paul-standard-60s-bourbon-burst_4_GIT0049494-000.jpg'
                          alt=''
                          className='w-full h-full object-center object-cover'
                        />
                      </div>
                      <div className='w-44 h-64 rounded-lg overflow-hidden'>
                        <img
                          src='https://images.musicstore.de/images/0960/gibson-les-paul-standard-60s-bourbon-burst_3_GIT0049494-000.jpg'
                          alt=''
                          className='w-full h-full object-center object-cover'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
