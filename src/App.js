import React from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";

import "./App.css";

import { HomePage } from "./pages/homepage.component";

const HatsPage = (props) => {
  return (
    <div>
      <h1>Hats page</h1>
      <p>
        <Link to='12'>Hat 12</Link>
      </p>
      <p>
        <Link to='182'>Hat 12</Link>
      </p>
    </div>
  );
};

const HatsDetail = (props) => {
  let params = useParams();
  console.log(params);
  return (
    <div>
      <h1>{props.p1}</h1>
      <div>
        <h1>{`Hats detail ${params.hatId}`}</h1>
      </div>
    </div>
  );
};

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/hats' element={<HatsPage />} />
        <Route path='/hats/:hatId' element={<HatsDetail p1={23} />} />
      </Routes>
    </div>
  );
}

export default App;
