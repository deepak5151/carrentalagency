import React, { Component } from 'react'
import { Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Data from './Data.json'

class Details extends Component {
    state = {
        detaill: []
    }
    render() {
        const currentid = this.props.match.params.id;
        Data.map((item) => {
            if (item.carnumber === currentid) {
                this.state.detaill.push(item)
            }
            return true
        })
        const { detaill } = this.state
        return (
            <div>
                {detaill.map((item) => (
                    <div className="container col-md-4 my-4">
                        <Card>
                            <Card.Img src={item.imgpath} alt="No Image Found" height="250px" />
                            <Card.Header className="text-center">
                                <Card.Title>{item.carname}</Card.Title>
                                <Card.Subtitle>Only for Rs.{item.rpd} per day</Card.Subtitle>
                            </Card.Header>
                            <ListGroup className="text-center" variant="flush">
                                <ListGroupItem><b>Model : </b>{item.model}</ListGroupItem>
                                <ListGroupItem><b>Seating Capacity : </b>{item.seatingcapacity}</ListGroupItem>
                                <ListGroupItem><b>Color : </b>{item.color}</ListGroupItem>
                                <ListGroupItem><b>Average : </b>{item.average}km per litre</ListGroupItem>
                                <ListGroupItem><b>Fuel Type : </b>{item.fuel}</ListGroupItem>
                                <ListGroupItem><b>Vehicle Number : </b>{item.vehiclenumber}</ListGroupItem>
                            </ListGroup>
                            {item.status ?
                                <Button variant="success" as={Link} to={`/enterdetails/${item.carnumber}`} block>Book Car</Button> :
                                <Button variant="danger" disabled block>Not Available</Button>
                            }
                            <Button variant="primary" as={Link} to="/dashboard" block>Go to Dashboard</Button>
                        </Card>
                    </div>
                ))}
            </div>
        )
    }
}

export default Details;
