import React, { useEffect, useState } from 'react'

export default function Notes() {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/details')
      .then(res => res.json())
      .then(data => setDetails(data))
  }, [])

  return (
    <div>
      {details.map(detail => (
        <p key={detail.id}>{ detail.accountName }</p>
      ))}
    </div>
  )
}