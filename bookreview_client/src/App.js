import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Toaster} from "react-hot-toast";
import AllBookPage from "./page/AllBookPage";
import BookPage from "./page/BookPage";
import Navigation from "./component/sidebar/Navigation";
import AllBookAdminPage from "./page/admin/AllBookAdminPage";
import AllAuthorAdminPage from "./page/admin/AllAuthorAdminPage";
import AuthorPage from "./page/AuthorPage";
import StartPage from "./page/StartPage";


function App() {
  return (
      <Router>
          <Toaster
              position="top-center"
              reverseOrder={false}
          />
          <Navigation/>
          <Routes>
              <Route path="/" element={<StartPage/>}/>
              <Route path="/book" element={<AllBookPage/>}/>
              <Route path="/book/:id" element={<BookPage/>}/>
              <Route path="/author/:id" element={<AuthorPage/>}/>
              <Route path="/admin/book" element={<AllBookAdminPage/>}/>
              <Route path="/admin/author" element={<AllAuthorAdminPage/>}/>
          </Routes>
      </Router>
  );
}

export default App;
