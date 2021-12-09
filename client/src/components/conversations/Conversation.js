import './conversation.css';

const Conversation=({ conversation, currentUser })=>{
  console.log(conversation);

  const friend = conversation.members.find((m) => m._id !== currentUser._id);
  console.log(friend.imageURL);
    return (
        <div className="conversation">
          <img
            className="conversationImg"
            src={friend.imageUrl}
            alt=""
          />
          <span className="conversationName">{friend.userId}</span>
        </div>
      );
}

export default Conversation;