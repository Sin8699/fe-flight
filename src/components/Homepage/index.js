import React from "react";
import "./style.scss";
import { Button, Paper } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import FlightIcon from "@material-ui/icons/Flight";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

function Homepage() {
  return (
    <div className="homepage">
      <MainCarousel />
      <LifestyleZone />
      <PlanMyTrip />
      <Footer />
    </div>
  );
}

const MainCarousel = () => {
  const items = [
    "/images/MainCarousel1.jpg",
    "/images/MainCarousel2.jpg",
    "/images/MainCarousel3.jpg",
    "/images/MainCarousel4.jpg",
  ];

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

const Item = (props) => {
  return (
    <Paper>
      <div
        className="item-carousel"
        style={{ backgroundImage: `url(${props.item})` }}
      ></div>
    </Paper>
  );
};

const LifestyleZone = () => {
  return (
    <div className="my-container lifestyle-zone">
      <h1>Lifestyle Zone</h1>
      <hr />
      <div className="info">
        <img className="info-item img" src="/images/krabi.jpg" alt="" />
        <p className="info-item description">
          <b className="title">Krabi</b>
          <p className="detail">
            Krabi’s seascape is no ordinary. It’s dotted with limestone cliffs
            and caves and further inland, you’ll also find mountains, emerald
            ponds and mangrove forests. You might come for Phi Phi Islands, but
            you’ll leave with your love for the whole city.
          </p>
          <Button
            variant="contained"
            size="large"
            className="btn-read-more"
            href="https://www.thaiairways.com/en_TH/lifestyle_zone/Krabi.page?"
            target="_blank"
          >
            Read more
          </Button>
        </p>
      </div>
      <div className="info">
        <p className="info-item description">
          <b className="title">Phuket</b>
          <p className="detail">
            Beach bums and sun seekers come to Phuket for the beaches, but
            there’s much more to Phuket than that. Thailand’s largest island is
            a total package with colorful Sino-Portuguese buildings and street
            arts, beautiful Thai temples and Chinese shrines and multicultural
            local food.
          </p>
          <Button
            variant="contained"
            size="large"
            className="btn-read-more"
            href="https://www.thaiairways.com/en_TH/lifestyle_zone/Phuket.page?"
            target="_blank"
          >
            Read more
          </Button>
        </p>
        <img className="info-item img" src="/images/phuket.jpg" alt="" />
      </div>
    </div>
  );
};

const PlanMyTrip = () => {
  const listOption = [
    {
      icon: "./images/map.svg",
      title: "WHERE WE FLY",
    },
    {
      icon: "./images/information.svg",
      title: "TRAVEL INFORMATION",
    },
    {
      icon: "./images/destination.svg",
      title: "DESTINATION",
    },
    {
      icon: "./images/holiday-packages.svg",
      title: "HOLIDAY PACKAGES",
    },
  ];
  return (
    <div className="my-container optional">
      <h3 className="title">PLAN MY TRIP</h3>
      <hr />
      <p className="description">
        The way to plan your next trip, find our best deals, and custom a
        wonderful route.
      </p>
      <div className="list-option">
        {listOption.map((item) => (
          <div key={item.title} className="option">
            <img className="item-icon" src={item.icon} alt={item.icon} />
            <p className="item-title">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Footer = () => {
  const IconFooter = [
    "FacebookIcon",
    "TwitterIcon",
    "YouTubeIcon",
    "InstagramIcon",
  ];
  return (
    <div className="footer">
      <div className="info-footer">
        <div className="container">
          <p className="title-footer">Follow us</p>
          <div>
            <a href="https://facebook.com" target="_blank">
              <FacebookIcon className="icon-footer" />
            </a>
            <a href="https://twitter.com/" target="_blank">
              <TwitterIcon className="icon-footer" />
            </a>
            <a href="https://youtube.com" target="_blank">
              <YouTubeIcon className="icon-footer" />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
              <InstagramIcon className="icon-footer" />
            </a>
          </div>
          <p className="title-footer">Mobile Application</p>
          <a href="https://www.apple.com/" target="_blank">
            <img
              className="store-app"
              src="images/Available_on_the_App_Store_(black).png"
              alt=""
            />
          </a>
          <a href="https://play.google.com/" target="_blank">
            <img
              className="store-app"
              src="images/Available_on_the_Google_Play_(black).png"
              alt=""
            />
          </a>
        </div>
        <div className="container">
          <p className="title-footer">About AIRPORT</p>
          <a href="/" className="link-footer">
            <p>Company Profile</p>
          </a>
          <a href="/" className="link-footer">
            <p>Business Units & Affiliates</p>
          </a>
          <a href="/" className="link-footer">
            <p>Star Alliance</p>
          </a>
          <a href="/" className="link-footer">
            <p>THAI Cargo</p>
          </a>
          <a href="/" className="link-footer">
            <p>Modern Slavery Statement</p>
          </a>
        </div>
        <div className="container">
          <p className="title-footer">Other Booking</p>
          <p>
            <a href="/" className="link-footer">
              <FlightIcon />
              Australian Travel Agents Reference
            </a>
          </p>
          <p>
            <a href="/" className="link-footer">
              <FlightIcon />
              Charter Flight
            </a>
          </p>
          <p>
            <a href="/" className="link-footer">
              <FlightIcon />
              THAI Flight Simulator Experience
            </a>
          </p>
          <p>
            <a href="/" className="link-footer">
              <ShoppingCartIcon />
              AIRPORT shop
            </a>
          </p>
        </div>
        <div>
          <p className="title-footer">Terms & Conditions</p>
          <a href="/" className="link-footer">
            <p>Reservation & Ticketing Terms & Conditions</p>
          </a>
          <a href="/" className="link-footer">
            <p>Conditions of Contract</p>
          </a>
          <a href="/" className="link-footer">
            <p>Contract of Carriage</p>
          </a>
          <a href="/" className="link-footer">
            <p>Optional Services & Fees on Code Share Flights</p>
          </a>
          <a href="/" className="link-footer">
            <p>Baggage Policy</p>
          </a>
          <a href="/" className="link-footer">
            <p>Carbon Offset</p>
          </a>
          <a href="/" className="link-footer">
            <p>Agency Debit Memo Policy</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
