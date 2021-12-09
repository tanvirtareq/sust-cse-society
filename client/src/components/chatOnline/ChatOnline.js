import './chatOnline.css';

const ChatOnline=()=>{
    return (
        <div className="chatOnline">
            <div className="chatOnlineImgContainer">
                <img
                className="chatOnlineImg"
                src='https://cdn.britannica.com/w:400,h:300,c:crop/84/73184-004-E5A450B5/Sunflower-field-Fargo-North-Dakota.jpg'
                alt=""
                />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">tanvir</span>
        </div>
    );
}

export default ChatOnline;