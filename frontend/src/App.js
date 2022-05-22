import PickMeUp from "./Pages/PickMeUp";
import CreateNewLine from "./Pages/CreateNewLine";
import Results from "./Pages/Results";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PickMeUp/>}/>
        <Route exact path="/create-new-pickup-line" element={<CreateNewLine/>}/>
        <Route exact path="/:name" element={<Results/>}/>
      </Routes>
    </Router>
  );
}
export default App;