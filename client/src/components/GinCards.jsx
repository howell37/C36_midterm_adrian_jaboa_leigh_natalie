import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import CardGroup from 'react-bootstrap/CardGroup';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';


function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      show={props.open}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.activeDrink.strDrink}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
          ac consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function GinCards() {
  const [drinkData, setDrinkData] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeDrink, setActiveDrink] = useState({})

  const handleOpen = drink => {
    setActiveDrink(drink)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const getDrink = async () => {
    const { data } = await axios.get(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin'
    );
    setDrinkData(data.drinks);
  };

  useEffect(() => {
    getDrink();
  }, []);

  return (
    <div id="card-parent">
      {drinkData &&
        drinkData.map(drink => {
          return (
            <React.Fragment key={drink.idDrink}>
              <CardGroup id="card" style={{ width: 200, margin: 15 }}>
                <Card
                  id="cardName"
                  className="p-3"
                  style={{ width: 300, margin: 0, padding: 20 }}
                >
                  <Card.Img variant="top" src={drink.strDrinkThumb} />
                  <Card.Body>
                    <Card.Title>
                      <a onClick={() => handleOpen(drink)} href="#">
                        {drink.strDrink}
                      </a>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </CardGroup>
            </React.Fragment>
          );
        })}
        <MyVerticallyCenteredModal
          show={handleOpen}
          onHide={handleClose}
          open={open}
          activeDrink={activeDrink}
        />
    </div>
  );
}

export default GinCards;
