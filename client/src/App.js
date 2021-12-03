
import { Container } from '@material-ui/core';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from './components/Auth/Auth';
import UserProfile from './components/UserProfile/UserProfile';
import PollAnnouncementForm from './components/PollAnnouncementForm/PollAnnouncementForm';
import { PollAnnouncements } from './components/PollAnnouncements/PollAnnouncements';
import { ApplyForPoll } from './components/ApplyForPoll/ApplyForPoll';

function App() {
    return (
        <BrowserRouter>
            <Container maxidth='lg'>
                <NavBar />
                <Routes>
                    <Route path="/" exact element={<Home/>}/>
                    <Route path='/auth' exact element={<Auth/>}/>
                    <Route path='/user/:id' exact element={<UserProfile/>} />
                    <Route path='/pollAnnouncementForm' exact element={<PollAnnouncementForm/>} />
                    <Route path='/pollAnnouncements' exact element={<PollAnnouncements/>}/>
                    <Route path='/applyForPoll/:id' exact element={<ApplyForPoll/>} />
                </Routes>
            </Container>
        </BrowserRouter>

    );
}

export default App;
