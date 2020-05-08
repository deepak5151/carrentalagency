import React, { Component } from 'react'
import Data from './Data.json'
import { Link, withRouter } from 'react-router-dom'
import { CardColumns, Card, Button } from 'react-bootstrap'

class DisplayCars extends Component {

    render() {
        return (
            <div className="container my-4">
                <CardColumns>
                    {
                        Data.map((item, i) => (
                            <Card className="pb-4">
                                <Card.Img className="mb-4" src={item.imgpath} alt="No Image Found" height="250px" />
                                <Card.Title className="text-center">{item.carname}</Card.Title>
                                <Card.Subtitle className="text-center mb-2">Rs.{item.rpd}/day</Card.Subtitle>
                                <Button variant="primary" block as={Link} to={`/details/${item.carnumber}`}>Details</Button>
                                {item.status ?
                                    <Button variant="success" as={Link} to={`/enterdetails/${item.carnumber}`} block>Book Car</Button> :
                                    <Button variant="danger" disabled block>Not Available</Button>
                                }
                            </Card>

                        ))
                    }
                </CardColumns>
            </div>
        )
    }
}

export default withRouter(DisplayCars);
