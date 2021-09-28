import React from 'react'

export default function Image({img}) {
    return (
            <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
            </div>
    )
}
