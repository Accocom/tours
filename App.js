import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";

function App() {
  const [tours, setTours] = useState([]);

  const getFetch = async () => {
    const response = await fetch(url);
    const tours = await response.json();
    setTours(tours);
    console.log(tours);
  };

  const removeItem = (id) => {
    let newTour = tours.filter((tour) => tour.id !== id);
    setTours(newTour);
  };

  useEffect(() => {
    getFetch();
  }, []);

  const reset = async () => {
    const response = await fetch(url);
    const tours = await response.json();
    setTours(tours);
  };

  const [readMore, setreadMore] = useState(false);

  if (tours.length <= 0) {
    return (
      <main>
        <section>
          <div className="title">
            <h2>No Tours Left</h2>
            <button className="btn" onClick={reset}>
              Refresh
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <>
      <main>
        <section>
          <div className="title">
            <h2>Our tours</h2>
            <div className="underline"></div>
          </div>

          <div>
            {tours.map((tour) => {
              const { id, name, info, image, price } = tour;

              return (
                <article key={id} className="single-tour">
                  <img src={image} alt="image" />
                  <footer>
                    <div className="tour-info">
                      <h4>{name}</h4>
                      <h4 className="tour-price">${price}</h4>
                    </div>
                    <p>
                      {readMore ? info : `${info.substring(0, 200)}...`}
                      <button onClick={() => setreadMore(!readMore)}>
                        {readMore ? "show less" : "  read more"}
                      </button>
                    </p>
                    <button
                      className="delete-btn"
                      onClick={() => removeItem(id)}
                    >
                      Not Interested
                    </button>
                  </footer>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
