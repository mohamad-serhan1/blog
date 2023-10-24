
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../pages/Home';

import Header from '../components/Header';
import PostDetails from '../pages/PostDetails';
import Category from '../pages/Category'
import Article from '../pages/ArticlePage'


function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<PostDetails/>} />
        <Route path="/category/:slug" element={<Category/>}/>
        <Route path="/article" element={<Article/>}/>


      </Routes>
    </BrowserRouter>

  )
}

export default App
