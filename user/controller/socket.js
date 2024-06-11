const { sellersupportModel } = require("../../seller/core/db/supoort")
const { customersupportModel } = require("../core/db/support")


//function to register logged in users to our logged in users
const registeruser = (io) => {
    io.on('connection', (socket) => {
        
      try {
      //join the room 
      socket.on('supportuser', async (data) => {
        const userid = data.userid
          socket.join(userid)
          console.log('connetceddone',data )
      })
      
      //send chat  for user
      socket.on('send_user_support', async (data) => {
        console.log('h=data' , data )
        //send user chat
        const type = data.type
        const usertype = data.usertype
        const text = data.text
        const customerid = data.userid
        const ticketid = data.ticketid
  
        const talk = await new customersupportModel({
          type , text, customerid , usertype , ticketid
        });
        const chat = await talk.save()
        console.log('h=chat' , chat )
        io.to(customerid).emit('receieve_user_support', chat)
          
       
      })
      
          //send chat  for dispatch
          socket.on('send_seller_support', async (data) => {
            console.log('h=data' , data )
            //send user chat
            const type = data.type
            const usertype = data.usertype
            const text = data.text
            const sellerid = data.userid
            const ticketid = data.ticketid
      
            const talk = await new sellersupportModel({
              type , text, sellerid , usertype , ticketid
            });
            console.log('talk', talk)
            const chat = await talk.save()
            console.log('h=chat' , chat )
            io.to(sellerid).emit('receieve_seller_support', chat)
              
           
          })
       
  
    } catch (error) {
        console.error('Socket error:', error);
    }
       
      })
}
  
module.exports = {
    registeruser
}