import React, {  useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../../actions/bagAction";
import {Country,State} from "country-state-city"
import {useAlert} from 'react-alert'

const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert()
  const navigate = useNavigate()
  const { shippingInfo } = useSelector((state) => state.bag);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState(shippingInfo.state || "");
  const [country, setCountry] = useState(shippingInfo.country || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length !== 10) {
      alert.error("Phone Number should be 10 digits long");
      return;
    }

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate('/order/confirm')
  };

  return   <>
  <h1 className="shippingHeading">Shipping Details</h1>
  <div className="shippingContainer">
    <div className="shippingBox">
      <form
        className="shippingForm"
        encType="multipart/form-data"
        onSubmit={shippingSubmit}
      >
        <div>
          <input
            type="text"
            placeholder="Address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="City"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Pin Code"
            required
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Phone Number"
            required
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>

        <div>
          <select
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
              <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
          </select>
        </div>

        {country && (
          <div>
            <select
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
             <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
            </select>
          </div>
        )}
        <input
          type="submit"
          value="Continue"
          className="shippingBtn"
          disabled={state ? false : true}
        />
      </form>
    </div>
  </div>
</>

};

export default Shipping;