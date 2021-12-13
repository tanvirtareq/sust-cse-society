import './message.css'
import { format } from "timeago.js";
import { Typography } from '@mui/material';

const Message=({ message, own, src })=>{
  console.log(message);
  console.log(src);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {(!own) && 
          <img
            className="messageImg"
            src={src}
            alt=""
          />
        }
        <Typography className="messageText" variant='body1'>{message.text}</Typography>
        {/* <p className="messageText">{message.text}</p> */}
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}

export default Message;