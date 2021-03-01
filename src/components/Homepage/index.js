import React from "react";
import "./style.scss";
import { Button, Paper } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import { Facebook, Twitter, YouTube, Instagram } from "@material-ui/icons";

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
        <span className="info-item description">
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
        </span>
      </div>
      <div className="info">
        <span className="info-item description">
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
        </span>
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
  const AboutAIRPORT = [
    { link: "https://www.google.com/", name: "Company Profile" },
    { link: "https://www.google.com/", name: "Business Units & Affiliates" },
    { link: "https://www.google.com/", name: "Star Alliance" },
    { link: "https://www.google.com/", name: "THAI Cargo" },
    { link: "https://www.google.com/", name: "Modern Slavery Statement" },
  ];
  const OtherBooking = [
    {
      link: "https://www.google.com/",
      name: "Australian Travel Agents Reference",
    },
    {
      link: "https://www.google.com/",
      name: "Charter Flight",
    },
    {
      link: "https://www.google.com/",
      name: "THAI Flight Simulator Experience",
    },
    {
      link: "https://www.google.com/",
      name: "AIRPORT shop",
    },
  ];
  const TermsConditions = [
    {
      link: "https://www.google.com/",
      name: "Reservation & Ticketing Terms & Conditions",
    },
    {
      link: "https://www.google.com/",
      name: "Conditions of Contract",
    },
    {
      link: "https://www.google.com/",
      name: "Contract of Carriage",
    },
    {
      link: "https://www.google.com/",
      name: "Optional Services & Fees on Code Share Flights",
    },
    {
      link: "https://www.google.com/",
      name: "Baggage Policy",
    },
    {
      link: "https://www.google.com/",
      name: "Carbon Offset",
    },
    {
      link: "https://www.google.com/",
      name: "Agency Debit Memo Policy",
    },
  ];
  return (
    <div className="footer">
      <div className="info-footer">
        <div className="container">
          <p className="title-footer">Follow us</p>
          <div>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="icon-footer" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="icon-footer" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTube className="icon-footer" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="icon-footer" />
            </a>
          </div>
          <p className="title-footer">Mobile Application</p>
          <a
            href="https://www.apple.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="store-app"
              src="images/Available_on_the_App_Store_(black).png"
              alt=""
            />
          </a>
          <a
            href="https://play.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="store-app"
              src="images/Available_on_the_Google_Play_(black).png"
              alt=""
            />
          </a>
        </div>
        <div className="container">
          <p className="title-footer">About AIRPORT</p>
          {AboutAIRPORT.map((item, i) => (
            <a
              key={i}
              href={item.link}
              className="link-footer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>{item.name}</p>
            </a>
          ))}
        </div>
        <div className="container">
          <p className="title-footer">Other Booking</p>
          {OtherBooking.map((item, i) => (
            <a
              key={i}
              href={item.link}
              className="link-footer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>{item.name}</p>
            </a>
          ))}
        </div>
        <div>
          <p className="title-footer">Terms & Conditions</p>
          {TermsConditions.map((item, i) => (
            <a
              key={i}
              href={item.link}
              className="link-footer"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p>{item.name}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
