import React, { useState } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';

const Form = () => {
    const [rollno, setrollno] = useState("");
    const [name, setname] = useState("");
    const [dob, setdob] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");
    const [course, setcourse] = useState("");

    const [allEntry, setAllEntry] = useState([]);

    const submitForm = (e) => {
        e.preventDefault();
        const newEntry = { rollno: rollno, name: name, dob: dob, email: email, phone: phone, address: address, course: course, };
        setAllEntry([...allEntry, newEntry]);
        console.log("------", allEntry, newEntry);
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000'
        };
        axios.post('http://localhost:3001/test/form', newEntry, { headers })
            .then(res => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    }


    return (
        <>
            <h1>Students Details</h1>
            <div className="box">
                <form action='' onSubmit={submitForm}>
                    <div >
                        <label htmlFor="rollno" >Roll No:</label>
                        <input type="rollno" className="form-control" id="rollno" placeholder="Enter Roll No" name="rollno" value={rollno}
                            onChange={(e) => setrollno(e.target.value)} />
                    </div>
                    <div >
                        <label htmlFor="name" >Name:</label>
                        <input type="name" className="form-control" id="name" placeholder="Enter Full Name" name="name" value={name}
                            onChange={(e) => setname(e.target.value)} />
                    </div>
                    <div >
                        <label htmlFor="dob" >Date of birth:</label>
                        <input type="dob" className="form-control" id="dob" placeholder="Enter dob" name="dob" value={dob}
                            onChange={(e) => setdob(e.target.value)} />
                    </div>
                    <div >
                        <label htmlFor="email" >Email:</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={email}
                            onChange={(e) => setemail(e.target.value)} />
                    </div>
                    <div >
                        <label htmlFor="phone" >Phone:</label>
                        <input type="phone" className="form-control" id="phone" placeholder="Enter phone" name="phone" value={phone}
                            onChange={(e) => setphone(e.target.value)} />
                    </div>
                    <div >
                        <label htmlFor="address" >Address:</label>
                        <input type="address" className="form-control" id="address" placeholder="Enter Address" name="address" value={address}
                            onChange={(e) => setaddress(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="course" >Course:</label>
                        <input type="course" className="form-control" id="course" placeholder="Enter Course" name="course" value={course}
                            onChange={(e) => setcourse(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
};

Form.propTypes = {
    
};
export default Form;