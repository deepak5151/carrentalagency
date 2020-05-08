import React, { Component } from 'react'
import BookingsData from './BookingsData.json'
import { Table } from 'react-bootstrap'

export default class CurrentBookings extends Component {
    render() {
        return (
            <Table className="text-center" responsive striped bordered hover variant="light">
                <thead >
                    <tr>
                        <th>Person Name</th>
                        <th>Car Booked</th>
                        <th>Vehicle Number</th>
                        <th>Booking Date <small>(YYYY/MM/DD)</small></th>
                        <th>Returning Date <small>(YYYY/MM/DD)</small></th>
                    </tr>
                </thead>
                <tbody>
                    {BookingsData.map((item) => (
                        <tr>
                            <td>{item.fullName}</td>
                            <td>{item.carname}</td>
                            <td>{item.vehiclenumber}</td>
                            <td>{item.Booked}</td>
                            <td>{item.ReturningDate}</td>
                        </tr>

                    ))}
                </tbody>
            </Table>
        )
    }
}
