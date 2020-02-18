import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

function VodkaCard() {
  const [drinkData, setDrinkData] = useState([]);

  const getDrink = async () => {
    const { data } = await axios.get(
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka'
    );
    setDrinkData(data.drinks);
    console.log(data.dinks, 'wtf');
  };

  useEffect(() => {
    getDrink();
  }, []);
  return (
    <div id="card-parent">
      {drinkData.map(drink => {
        return (
          <React.Fragment>
            <CardGroup
              key={drink.idDrink}
              id="card"
              style={{ width: 200, margin: 15 }}
            >
              <Card
                className="p-3"
                style={{ width: 300, margin: 0, padding: 20 }}
              >
                <Card.Img variant="top" src={drink.strDrinkThumb} />
                <Card.Body>
                  <Card.Title>{drink.strDrink}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
            </CardGroup>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default VodkaCard;
