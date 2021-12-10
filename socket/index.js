const io=require("socket.io")(8900, {
    cors:{
        origin:"http://localhost:3000"
    }
});

let users=[];

const addUser=(userID, socketID)=>{
    (!users.some((user)=>(user.userID==userID))) && users.push(
        {userID:userID, socketID:socketID}
    );
}

const removeUser=(socketID)=>{
    users=users.filter((user)=>user.socketID!==socketID);
}




io.on('connection', (socket)=>{
    console.log('a user connected');

    socket.on('addUser', (userID)=>{
        addUser(userID, socket.id);
        io.emit('getUsers', users);
    });

    socket.on('disconnect', ()=>{
        console.log('a user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    });

    socket.on('sendMessage', ({senderID, receiverID, text})=>{
        const receiver=users.find(user=>user.userID==receiverID);
        io.to(receiver?.socketID).emit('getMessage', {senderID, text});
    
    });

    // console.log(socket);
});