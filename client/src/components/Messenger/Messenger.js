import NavBar from "../NavBar/NavBar";
import "./messenger.css";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Conversation from "../conversations/Conversation.js";
import Message from "../message/Message.js";
import ChatOnline from "../chatOnline/ChatOnline";

const Messenger=()=>{

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [friend, setFriend]=useState();
    const scrollRef = useRef();

    const profile=JSON.parse(localStorage.getItem('profile'));
    console.log(profile);
    const [user, setUser]=useState(profile);

    // useEffect(()=>{
        
    //     setUser(profile);
    //     // console.log(user);
    // }, []);

    useEffect(() => {
        arrivalMessage &&
          currentChat?.members.includes(arrivalMessage.sender) &&
          setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, currentChat]);

      useEffect(() => {
        const getConversations = async () => {
          try {
            const res = await axios.get("http://localhost:5001/getConversations/" + user._id);
            setConversations(res.data);
            console.log(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getConversations();
      }, [user?._id]);
    
      useEffect(() => {
        console.log('ase');
        console.log(currentChat);
        const receiver = currentChat?.members.find(
          (member) => member._id!== user._id
        );
        setFriend(receiver);
        console.log(friend);
        const getMessages = async () => {
          try {
            const res = await axios.get("http://localhost:5001/getMessages/" + currentChat?._id);
            setMessages(res.data);
            console.log(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getMessages();
      }, [currentChat]);

    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const receiver = currentChat.members.find(
        (member) => member._id!== user._id
      );
      const receiverId=receiver._id;
      // console.log(receiverId);
      const message = {
        conversationID: currentChat._id,
        senderID: user._id,
        receiverID:receiverId,
        text: newMessage,
      };

      try {
        const res = await axios.post("http://localhost:5001/createMessage", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    };
    
    return (
        <>
        <NavBar/>
        <div className='messenger'>
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                  <input placeholder="Search for friends" className="chatMenuInput" />
                  {conversations.map((c) => (
                    <div onClick={() => setCurrentChat(c)}>
                      <Conversation conversation={c} currentUser={user} />
                    </div>
                  ))}

                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {messages.map((m) => (
                      <div ref={scrollRef}>
                        <Message message={m} own={m.senderID === user._id} src={ (m.senderID === user._id)?user.imageUrl:friend.imageUrl }/>
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="write something..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
            </div>
            <div className="chatOnline">
                <ChatOnline/>
            </div>
        </div>
        </>
    )
}

export default Messenger;