import React, { Component } from "react";
import "./App.css";

var API_KEY = "T1QtNjE1NjA6Qi1xYTItMC01ODI0NzQ0YS0wLTMwMmQwMjE0NDA2MjUwMDNjMjZjZmUzZmVkYmMxM2UyMmY4YTYwMzBhMWJlMDQ4NjAyMTUwMDgyYTYzYzAxNTk5MmRkNWRiYWFhNTIxMTUxNzk3NDNjMTY4MDNmNDc=";
var OPTIONS = {
  environment: "TEST",
  fields: {
    cardNumber: {
      selector: "#card-number",
      placeholder: "Card number"
    },
    expiryDate: {
      selector: "#expiration-date",
      placeholder: "Expiration date"
    },
    cvv: {
      selector: "#cvv",
      placeholder: "CVV"
    }
  }
};

var instance = null;

class App extends Component {
  componentDidMount() {
    window.paysafe.fields.setup(API_KEY, OPTIONS, function (paysafeInstance, error) {
      if (error) {
        alert("Setup error: " + error.code + " " + error.detailedMessage);
      } else {
        instance = paysafeInstance;
      }
    });
  }

  pay() {
    if (!instance) {
      console.log("No instance");
    }
    instance.tokenize(function (paysafeInstance, error, result) {
      if (error) {
        alert("Tokenization error: " + error.code + " " + error.detailedMessage);
      } else {
        alert("Token: " + result.token);
      }
    });
  }

  render() {
    return (
      <div id="card-form">
        <div className="panel">
          <header className="panel-header">
            <h1>Paysafe</h1>
          </header>

          <div className="panel-content">
            <div className="textfield-float-label">
              <label className="paysafe-js-label" htmlFor="card-number">Card Number</label>
              <div id="card-number" className="paysafe-js"/>
            </div>

            <div className="textfield-float-label">
              <label className="paysafe-js-label" htmlFor="expiration-date">Expiration Date</label>
              <div id="expiration-date" className="paysafe-js"/>
            </div>

            <div className="textfield-float-label">
              <label className="paysafe-js-label" htmlFor="cvv">CVV</label>
              <div id="cvv" className="paysafe-js"/>
            </div>
          </div>

          <footer className="panel-footer">
            <button className="pay-button" onClick={this.pay}>Pay</button>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
