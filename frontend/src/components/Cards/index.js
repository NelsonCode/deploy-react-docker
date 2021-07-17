import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getGamesAll } from "../../services";
import Spinner from "../Spinner";

function Cards() {
  const [Loader, setLoader] = useState(false);
  const [Videojuegos, setVideojuegos] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setLoader(true);
      const { error, response } = await getGamesAll();
      if (response !== null) {
        if (response.data.length === 0) {
          setLoader(false);
        }
        if (response.data !== null && response.data.length > 0) {
          setVideojuegos(response.data);
          setLoader(false);
        } else {
          setLoader(false);
          console.log(error);
        }
      }
    }
    fetchData();
  }, []);

  if (Loader) {
    return <Spinner />;
  }
  return (
    <div>
      <StyleCards>
        <div className="grid-cards">
          {Videojuegos.map((videoJuego) => {
            return (
              <div className="card" key={videoJuego.id}>
                <div>
                  <img
                    src={videoJuego.urlImagen}
                    alt=""
                    width="100%"
                    height="150px "
                  />
                </div>
                <div className="card-body">
                  <br />
                  <h3 className="center">{videoJuego.nombre}</h3>
                  <br />
                  <p className="txt-description">{videoJuego.descripcion}</p>
                </div>
              </div>
            );
          })}
        </div>
      </StyleCards>
    </div>
  );
}

export default Cards;

const StyleCards = styled.div`
  .grid-cards {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    margin: 10px;
  }
  .card {
    background: black;
  }
  .card-body {
    padding: 8px;
  }
  .txt-description {
    color: #adb5bd;
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
