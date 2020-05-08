import React, { Component } from 'react'
import { Formik } from 'formik'
import { Redirect } from 'react-router-dom'
import * as yup from 'yup'
import Data from './Data.json'
import { Link } from 'react-router-dom'
import { Form, InputGroup, Button, } from 'react-bootstrap'
import BookingData from './BookingsData.json'

export default class DisplayForm extends Component {
    state = {
        isRedirect: false,
        currentBookings: []
    }
    render() {

        var phoneNum = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/
        var mindate = new Date();
        var maxdate = new Date();
        mindate.setDate(mindate.getDate() - 1)
        maxdate.setDate(maxdate.getDate() + 7);
        const schema = yup.object({
            fullName: yup.string().required("Please Enter Name"),
            Email: yup.string().email().required(),
            Contact: yup.string().required("Please Enter Valid Phone Number").matches(phoneNum, 'Phone number is not valid')
                .max(10, "Maximum 10 digits allowed"),
            BookingDate: yup.date().required("Please Enter Valid Date").min(mindate, "Booking Date must be later than or on today")
                .max(maxdate, "You can only book a date in the coming 7 days"),
            ReturningDate: yup.date().required("Please Enter Valid Date")
                .when("BookingDate",
                    (BookingDate, yup) => BookingDate && yup.min(BookingDate, "Return Date must be later than Booking Date"))
        });

        const isRedirect = this.state.isRedirect;
        if (isRedirect === true) {
            return <Redirect to="/dashboard" />
        }
        return (
            <div className="container">
                <div className="mb-4 row">
                    <div className="mt-4 col-md-2">
                        <Button as={Link} to='/dashboard' variant="light" ><i className="fa fa-angle-left"></i>- Go to Dashboard</Button>
                    </div>
                    <div className="text-center my-4 col-md-8">
                        <h1>You are just one step away to book your Car</h1>
                        <p>Enter following details to book your car</p>
                    </div>
                    <Formik
                        validationSchema={schema}
                        onSubmit={(values) => {
                            alert("Thank You for booking car with Car Rental Agency.\n Enjoy your Ride.\n View your booking in the Current Bookings Section ")
                            Data.map((item) => {
                                const currentid = this.props.match.params.id;
                                if (item.carnumber === currentid) {
                                    BookingData.push(
                                        {
                                            "fullName": values.fullName,
                                            "carnumber": item.carnumber,
                                            "carname": item.carname,
                                            "Booked": values.BookingDate,
                                            "ReturningDate": values.ReturningDate,
                                            "status": false,
                                            "vehiclenumber": item.vehiclenumber,
                                        }
                                    )
                                    item.status = false
                                }
                                return true
                            })
                            this.setState({
                                isRedirect: true
                            })
                        }
                        }
                        initialValues={{
                            fullName: "",
                            Email: "",
                            Contact: "",
                            BookingDate: "",
                            ReturningDate: ""
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            touched,
                            errors,
                        }) => (
                                <Form noValidate onSubmit={handleSubmit} className="container col-md-4">
                                    <Form.Group controlId="inputname">
                                        <Form.Label>Full name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="fullName"
                                            placeholder="Enter Full Name"
                                            value={values.fullName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.fullName && errors.fullName}
                                        />
                                        <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="inputusername">
                                        <Form.Label>Email</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <Form.Control
                                                type="email"
                                                placeholder="Email"
                                                aria-describedby="inputGroupPrepend"
                                                name="Email"
                                                value={values.Email}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                isInvalid={touched.Email && errors.Email}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.Email}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group controlId="inputcountry">
                                        <Form.Label>Contact Number</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Don't Include +91"
                                            name="Contact"
                                            value={values.Contact}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.Contact && errors.Contact}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.Contact}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="inputdob">
                                        <Form.Label>When you want to Book?</Form.Label>
                                        <Form.Control
                                            type="Date"
                                            placeholder="Booking Date"
                                            min={new Date()}
                                            name="BookingDate"
                                            value={values.BookingDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.BookingDate && errors.BookingDate}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.BookingDate}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="inputdob">
                                        <Form.Label>Returning Date</Form.Label>
                                        <Form.Control
                                            type="Date"
                                            placeholder="Returning Date"
                                            name="ReturningDate"
                                            value={values.ReturningDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            isInvalid={touched.ReturningDate && errors.ReturningDate}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.ReturningDate}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button type="submit" width="100px" variant="success" className="d-flex mx-auto">SignUp</Button>
                                </Form>
                            )
                        }
                    </Formik>
                </div >
            </div>

        )
    }
}
