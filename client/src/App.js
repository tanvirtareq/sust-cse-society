
// import { Container } from '@material-ui/core';

// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
// import Auth from './components/Auth/Auth';
// import UserProfile from './components/UserProfile/UserProfile';
// import PollAnnouncementForm from './components/PollAnnouncementForm/PollAnnouncementForm';
// import { PollAnnouncements } from './components/PollAnnouncements/PollAnnouncements';
// import { ApplyForPoll } from './components/ApplyForPoll/ApplyForPoll';
// import { RunningElections } from './components/RunningElections/RunningElections';
// import { PollResults } from './components/PollResults/PollResults';

// function App() {
//     return (
//         <>
//             <NavBar />
//             <Routes>
//                 <Route path="/" exact element={<Home/>}/>
//                 <Route path='/auth' exact element={<Auth/>}/>
//                 <Route path='/user/:id' exact element={<UserProfile/>} />
//                 <Route path='/pollAnnouncementForm' exact element={<PollAnnouncementForm/>} />
//                 <Route path='/pollAnnouncements' exact element={<PollAnnouncements/>}/>
//                 <Route path='/applyForPoll/:id' exact element={<ApplyForPoll/>} />
//                 <Route path='/runningElections' exact element={<RunningElections/>}/>
//                 <Route path='/pollResults' exact element={<PollResults/>}/>
//             </Routes>
//         </>
//     );
// }

// export default App;



import { Route, Routes } from "react-router-dom";
import AppBody from "./components/AppBody/AppBody";
import Feed from "./components/Feed/Feed";
import NavBar from "./components/NavBar/NavBar";
import SignIn from "./components/SignIn/SignInPage";
import CreatePollPage from "./components/Voting/Admin/CreatePollPage";
import ManagePollPage from "./components/Voting/Admin/ManagePollPage";
import PollEventPage from "./components/Voting/User/PollEventPage";
import PollResultPage from "./components/Voting/Admin/PollResultPage";
import { PollAnnouncements } from './components/PollAnnouncements/PollAnnouncements';
import VotePage from './components/Voting/User/VotePage';
// import Messenger from './components/Messenger/Messenger.js';
import Messenger from "./components/Messenger/Messenger";
import ReactMarkdown from 'react-markdown'

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/sign-in" element={<SignIn />} />
        <Route exact path="/" element={<><NavBar /> <AppBody component={<Feed /> } /></>} />
        <Route exact path="/poll-history" element={<><NavBar /> <AppBody component={<PollResultPage/> } /></>} />
        <Route exact path="/polls" element={<><NavBar /> <AppBody component={<VotePage/> } /></>} />
        <Route exact path="/create-poll" element={<><NavBar /> <AppBody component={<CreatePollPage /> } /></>} />
        <Route exact path="/manage-poll" element={<><NavBar /> <AppBody component={<ManagePollPage /> } /></>} />
        <Route path='/pollAnnouncements' exact element={<><NavBar /> <AppBody component={<PollAnnouncements/> } /></>}/>

        {/* <Route path='/messenger' exact element={<Messenger/>} /> */}
        <Route path='/messenger' exact element={<Messenger/>} />
      </Routes>
      
    </>
  );
};

export default App;