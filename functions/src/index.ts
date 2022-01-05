//import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';
// admin.initializeApp(functions.config().firebase);
// exports.newSubscriberNotification = functions.firestore
// .document('subscribers/{subscriptionId}')
// .onCreate(async event =>{
//     const data = event.data.data();
//     const userId = data.userId
//     const subscriber = data.subscriberId
// const payload={
//     Notification:{
//         title='new subscriber',
//         body:`${subscriber} is following your content!`,
//         icon:''
//     }
// }
// const db = admin.firestore()
// const devicesRef = db.collection('devices').where('userId',=='userId')


// const devices=await devicesRef.get()
// const tokens = []
// devices.forEach(result => {
//     const token = result.data().token;
//     tokens.push(token)
   
// })
// return admin.messaging().sendToDevice(tokens,payload)

// });
