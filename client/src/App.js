
import { Container } from '@material-ui/core';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from './components/Auth/Auth';
import UserProfile from './components/UserProfile/UserProfile';

function App() {
    return (
        <BrowserRouter>
            <Container maxidth='lg'>
                <NavBar />
                <Routes>
                    <Route path="/" exact element={<Home/>}/>
                    <Route path='/auth' exact element={<Auth/>}/>
                    <Route path='/user/:id' exact element={<UserProfile/>}/>}/>
                    {/* <Route path='/:userId' exact element{<Home/>}/> */}
                </Routes>
            </Container>
        </BrowserRouter>

    );
}

export default App;
