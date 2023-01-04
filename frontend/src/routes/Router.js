import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "../components/Create/Create";
import Update from "../components/Update/Update";
import Upload from "../components/Upload/Upload";
import Counter from "../pages/CounterPage/Counter";
import Home from "../pages/HomePage/Home";
import Shorty from "../pages/Shorty/Shorty";
import ShortyCreated from "../pages/Shorty/ShortyCreated";
import ShortyDetails from "../pages/ShortyDetails/ShortyDetails";
import GetShorty from "../pages/Shorty/GetShorty";
import CounterDetails from "../pages/CounterPage/CounterDetails";

export const Router = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route index path='/' element={<Home />} />
                <Route path='/shorty' element={<Shorty />} />
                <Route path='/counter' element={<Counter />} />
                <Route path='/shorty/create' element={<Create />} />
                <Route path='/shorty/create/upload' element={<Upload />} />
                <Route path='/shorty/created' element={<ShortyCreated />} />
                <Route path='/shorty/:id' element={<ShortyDetails />} />
                <Route path='/shorty/update/:id' element={<Update />} />
                <Route path='/shorty/query' element={<GetShorty />} />
                <Route path='/counter/:id' element={<CounterDetails/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router