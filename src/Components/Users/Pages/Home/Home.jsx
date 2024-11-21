import React from "react";
import cl from "./Home.module.css";

const Home = () => {
  return (
    <div className={cl.backCon}>
      <div className={cl.container}>
        <div className={cl.Navbar}>
          <div className={cl.logo}>in312</div>
          <div className={cl.icons}>
            <div className={cl.icon}>🏠 Home</div>
            <div className={cl.icon}>📍 Map</div>
            <div className={cl.icon}>🛍️ Shop</div>
            <div className={cl.icon}>👨🏻‍🦰 Profile</div>
          </div>

        </div>

        <div className={cl.content}>
          <header className="header">
            <h1>Home</h1>
            <div className="user-info">
              <p>Current time: June 20th, 8:25 PM</p>
              <img
                src="/path/to/user-profile.jpg"
                alt="User Profile"
                className="user-img"
              />
            </div>
          </header>

          <div className="search">
            <input type="text" placeholder="Search location" />
            <button className="refresh-btn">🔄</button>
          </div>

          <section className="explore">
            <h2>Explore nearby eco</h2>
            <div className="cards">
              <div className="card">
                <div className="tag">Park visit</div>
                <img src="/path/to/nature-reserve.jpg" alt="Nature Reserve" />
                <h3>Nature Reserve</h3>
                <p>Next eco event: May 23</p>
                <div className="icon">🔔</div>
              </div>
              <div className="card">
                <div className="tag">Adventure</div>
                <img src="/path/to/forest.jpg" alt="Forest" />
                <h3>Forest</h3>
                <p>Upcoming event: June</p>
                <div className="icon">🔔</div>
              </div>
            </div>
          </section>

          <section className="adventures">
            <h2>Green Adventures</h2>
            <div className="categories">
              {["Outdoor", "Eco-", "Sustainable", "Green", "Environment"].map(
                (category, index) => (
                  <button key={index}>{category}</button>
                )
              )}
            </div>
          </section>

          <section className="recommended">
            <h2>Recommended</h2>
            <div className="cards">
              <div className="card">
                <div className="tag">Nature Festival</div>
                <img src="/path/to/nature-festival.jpg" alt="Nature Festival" />
                <h3>Nature</h3>
              </div>
              <div className="card">
                <div className="tag">Film</div>
                <img
                  src="/path/to/green-architecture.jpg"
                  alt="Green Architecture"
                />
                <h3>Green</h3>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
