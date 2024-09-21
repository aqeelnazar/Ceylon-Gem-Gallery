import { Routes, Route } from "react-router-dom";

import Navbar from './components/navbar';
import Footer from './components/Footer';

import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import About from './components/About/About';

// cut
import GemCutHome from './components/Cut/GemCutHome';
import GemCutList from './components/Cut/GemCutList';
import ShowGemCutDetails from "./components/Cut/ShowGemCutDetails";

// cost
import InsertPayment from './components/Cost/InsertPayment';

// profile
import Profile from './components/customer/profile';

// job assignment and completion
import AssignJob from './components/Cut/AssignJob';
import CompleteJob from './components/Cut/CompleteJob';

import TrackOrder from './components/Cut/TrackGemCut';

const User = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} /> 
        
        {/* cut */}
        <Route path="/GemCutHome" element={<GemCutHome />} />
        <Route path="/GemCutHome/CustomCut" element={<GemCutList />} />
        <Route path='/showdetails/:id' element={<ShowGemCutDetails />} />

        <Route path="/Home" element={<Home />} />
        <Route path="/Shop" element={<Shop />} />
        <Route path="/About" element={<About />} />
        
        {/* cost */}
        <Route path="/insert-payment" element={<InsertPayment />} />

        {/* user */}
        <Route path="/profile" element={<Profile />} />

      

        {/* job assignment and completion */}
        <Route path="/assign-job" element={<AssignJob />} />
        <Route path="/complete-job" element={<CompleteJob />} />

        <Route path="/GemCutHome/track-order" element={<TrackOrder />} />

      </Routes>
      <Footer />
    </div>
  );
};

export default User;
