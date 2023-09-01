
import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import { DatePicker, Space } from 'antd'
import { useAuthContext } from '../../Context/AuthContext'
import { firestore } from '../../../config/firebase';
import { doc,  setDoc, } from 'firebase/firestore';
import { UesDoxContext } from '../../Context/DoxContext';
import './Appwall.scss'; 
const initialdate = { startDate: "", endDate: "" };
const initialState = { title: "", description: "" };
const colorArr = ["#FDF2B3", "#D1EAED", "#FFDADA", "#FFD4A9", "#f5ebe0", "#b8dbd9", "#FDF2B3", "#b7e4c7"]
const { RangePicker } = DatePicker;


export default function StickyWall() {
  const {documents} = UesDoxContext()

 

  const [open, setOpen] = useState(false);
  const [state, setState] = useState(initialState)
  const { user } = useAuthContext()
  const [confirmLoading, setConfirmLoading] = useState(false);

  // --------------------- handle date ------------------
  const [date, setDate] = useState("");
  // const [objdate, setObjDate] = useState(initialdate);
  const handleDate = (_, dateString) => {
    setDate(dateString)

  }
  // -------------------------handle date end

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }
  // ---------------------- add task modle -------------------
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {

    window.notify("Task Cancel", "info")
    setOpen(false);
  };

  const handleOk = async () => {
    let { title, description } = state
    let todo = { title, description }
 
 todo.date = date
    todo.randumId = Math.random().toString(36).slice(2)
    todo.bgColor = colorArr[Math.floor(Math.random() * (7 + 1))]
    todo.dateCreated = new Date().getTime()
    todo.createdBy = {
      email: user.email,
      uid: user.uid,
    }
    if (title.length < 3) {
      return window.notify("Please the Enter Title!", "info")
    }
    if (description.length < 10) {
      return window.notify("Please the Enter Description!", "info")
    }
    setConfirmLoading(true);
    try {
      await setDoc(doc(firestore, "todos", todo.randumId), todo);
    
      setOpen(false);
      window.notify("Add Task Successfully", "success")
    } catch (err) {
      window.notify("Task not added", "error")

    }
    setConfirmLoading(false);
    setState(initialState)

  };

  
  return (
    <>
      <div className="container">
        <div className="row">
          {
            documents.map((doc, i) => {
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

          <div className="col-12 col-md-6 col-lg-4">
            <div className="box1 my-3 mx-sm-0 mx-md-0 mx-lg-3" onClick={showModal}>
              <a className='Plus nav-link'>+</a>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        className="light-skin-modal"
      >
        <div className="row ">
          <div className="col ">
            <label htmlFor="title" className='fw-bold'>Title</label> <br />
            <input type="text" placeholder='Enter  title' id='title' className='w-100 form-control' value={state.title} name='title' onChange={handleChange} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="floatingTextarea2" className='fw-bold'>Description</label> <br />
            <div className="form-floating">
              <textarea className="form-control" id="floatingTextarea2" style={{ height: "100px" }} name='description' value={state.description} onChange={handleChange}></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col mt-3">
            <label className='fw-bold '>Date</label> <br />
            <Space direction="vertical" size={12}>
              <DatePicker
                onChange={handleDate}
               
              />
            </Space>
          </div>
        </div>
      </Modal>

    </>
  )
 
}
