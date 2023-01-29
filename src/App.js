import React from "react";
import { Route, Routes } from "react-router-dom";
import { List, TasksList } from "./components";
import HomeList from "./HomeList";





function App() {

  return (
    <div className="App">
      <Routes>
        <Route path={'/'} element={<HomeList />}>
          <Route path={'/list'} element={<List/>} />
          <Route path={'/tasks'} element={<TasksList/>} />
        </Route>
      </Routes>
    </div>

  );

  
};
export default App;
