import React, { useEffect, useState } from 'react'
import { UesDoxContext } from '../../Context/DoxContext'
import dayjs from 'dayjs'

export default function Upcoming() {
  const { documents } = UesDoxContext()
  const [show, setShow] = useState(true)
  const [date, setDate] = useState("")
  const [todayDoc, setTodayDoc] = useState([])

  useEffect(() => {
    let dat = dayjs().format('YYYY-MM-DD')
    setDate(dat)
  }, [])


  const getFun = () => {
    let today  = []
     today = documents.filter((doc) => {
      if (doc.startDate > date) {
        return doc
      }
    })
    setTodayDoc(today)
    setShow(false)
  }

  useEffect(()=>{
    getFun()
  },[show])
  return (
    <>
      <div className="container">
        <div className="row">
        {/* {show ? <button className='btn btn-primary text-white' onClick={getFun} >Show Task</button> : <div></div>} */}
          {
            todayDoc.map((doc, i) => {
              return <>

                <div className="col-12 col-md-6 col-lg-4 " key={i} >
                  <div className="box my-3 mx-sm-0 mx-md-0 mx-lg-3" style={{ backgroundColor: `${doc.bgColor}` }} >
                    <h3>{i + 1}</h3>
                    <h4>{doc.title}</h4>
                    <p>{doc.description}</p>
                    <p>Email : {doc.createdBy.email}</p>
                    <p>ID : {doc.randumId}</p>
                    <p>BgColor : {doc.bgColor}</p>
                    <p>{doc.startDate} <b> To </b> {doc.endDate}</p>
                  </div>
                </div>
              </>
            })
          }

        </div>
      </div>
    </>
  )
}
