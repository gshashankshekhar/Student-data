import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';
const List = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [items, setItems] = useState([]);
  const [editItems, setEditItems] = useState({});

  //get api call
  const getApi = () => {
    fetch("http://localhost:3001/test/form")
      .then(res => res.json())   // promise function
      .then(
        (result) => {
          console.log("get", result)
          if (result.type === "success") {
            setIsLoaded(false);
            setItems(result.data);
          }
          else {
            setIsLoaded(false);
            alert(result.msg)
          }
        },
        (error) => {
          console.log(error)
          setIsLoaded(false);
          setError(error);
          alert("Internal Server error.")
        }
      )
  }

  const updateApi = (requestBody) => {
    let id = editItems._id
    let body = {
      ...requestBody
    }
    console.log("request body===? ", requestBody, id)
    fetch(`http://localhost:3001/test/form/${id}`,{method: 'PATCH', body : JSON.stringify(body)})
      .then(res => res.json())
      .then((result) => {
        console.log("upate", result)
        if(result.type === 'success'){
          alert(result.msg)
          getApi()
        }else {
          alert(result.msg)
        }
      }).catch((err) => {
        console.log(err)
        alert("Internal server error.")
      })
  }
  //delete api
  const deleteApi = (id) => {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    };
    fetch(`http://localhost:3001/test/form/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then((result) => {
        console.log("delete", result)
        if (result.type == 'success') {
          getApi()
          alert(result.msg)
        } else {
          alert(result.msg)
        }
      })
      .catch((err) => {
        alert("Internal Server error.")
      })
  }

  const onClickDelete = (id) => {
    if (window.confirm("Are you sure, you want to delete ?") == true) {
      deleteApi(id)
    }
  }

  const onClickEdit = (editObj) => {
    setIsModal(true)
    setEditItems(editObj)
  }
  useEffect(() => {
    getApi()
  }, [])

  return (
    <>
      <div className="container mt-3">
        <h2>Submitted Data</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Roll No</th>
              <th>Name</th>
              <th>Date of birth</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Course</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((studentObj, index) => {
              return <tr key={index}>
                <td>{index + 1}</td>
                <td>{studentObj.rollno}</td>
                <td>{studentObj.name}</td>
                <td>{studentObj.dob}</td>
                <td>{studentObj.email}</td>
                <td>{studentObj.phone}</td>
                <td>{studentObj.address}</td>
                <td>{studentObj.course}</td>
                <td><button onClick={() => onClickDelete(studentObj._id)} type="button" className="btn btn-danger">Delete</button>
                  <button onClick={() => onClickEdit(studentObj)} type="button" className="btn btn-info">Edit</button></td>
              </tr>
            })}
            {isModal ? <EditModal updateApi = {updateApi}  studentObj={editItems} onClose={() => setIsModal(false)} open={isModal}></EditModal> : null}
          </tbody>
        </table>
      </div>
    </>
  )
}
// edit modal part
const EditModal = (props) => {
  const [editname, setEditName] = useState(props.studentObj.name);
  const [editdob, setEditDob] = useState(props.studentObj.dob);
  const [editemail, setEditEmail] = useState(props.studentObj.email);
  const [editphone, setEditPhone] = useState(props.studentObj.phone);
  const [editaddress, setEditAddress] = useState(props.studentObj.address);
  const [editcourse, setEditCourse] = useState(props.studentObj.course);

  //update api call
  const updateApi = () => {
    let body = {
      name: editname,
      dob: editdob,
      email : editemail,
      phone : editphone,
      address : editaddress,
      course : editcourse
    }
    props.onClose()
    props.updateApi(body)
  }


  return (
    <>
      <Modal show={props.open} size={'md'}>
        <Modal.Header closeButton onClick={() => props.onClose()}>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form action=''>
            <div>
              <label htmlFor='name'> First Name</label>
              <input type='text' className="form-control" name='name' id='name' value={editname }
                onChange={(name) => setEditName(name.target.value)} />
            </div><br></br>
            <div>
              <label htmlFor='name'> Date of Birth</label>
              <input type='text' className="form-control" name='dob' id='dob' value={editdob}
                onChange={(name) => setEditDob(name.target.value)} />
            </div><br></br>
            <div>
              <label htmlFor='email'> Email Id </label>
              <input type='email' className="form-control" name='email' id='email' value={editemail}
                onChange={(name) => setEditEmail(name.target.value)} />
            </div><br></br>
            <div>
              <label htmlFor='phone'> Phone No</label>
              <input type='tel' className="form-control" name='phone' id='phone' value={editphone}
                onChange={(name) => setEditPhone(name.target.value)} />
            </div><br></br>
            <div>
              <label htmlFor='address'>Address</label>
              <input type='text' className="form-control" name='address' id='address' value={editaddress}
                onChange={(name) => setEditAddress(name.target.value)} />
            </div><br></br>
            <div>
              <label htmlFor='course'>Course</label>
              <input type='text' className="form-control" course='course' id='course' value={editcourse}
                onChange={(name) => setEditCourse(name.target.value)} />
            </div><br></br>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => props.onClose()} variant="secondary">Close</Button>
          <Button onClick={() => updateApi()} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default List;