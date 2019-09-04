const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


const createNotification = ((notification) => {
    return admin.firestore().collection('notifications')
        .add(notification)
        .then(doc => console.log('notification added', doc));
})

exports.projectCreated = functions.firestore
.document('/projects/{projectId}')
.onCreate(doc => {
    const project = doc.data();
    const notification = {
        content: 'Added a new project',
        user: `${project.authorFirstName} ${project.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp(),
        projectId: `${project.id}`
    }

    return createNotification(notification);

});

exports.projectUpdated = functions.firestore
.document('/projects/{projectId}')
.onUpdate(doc => {
    const project = doc.after.data();
    const notification = {
        content: 'Updated a project',
        user: `${project.authorFirstName} ${project.authorLastName}`,
        time: admin.firestore.FieldValue.serverTimestamp(),
        projectId: `${project.id}`
    }

    return createNotification(notification);

});


exports.userJoined = functions.auth.user()
    .onCreate(user => {

        return admin.firestore().collection('users')
            .doc(user.uid).get().then(doc => {
                const newUser = doc.data();
                const Notification = {
                    content: "Joined the Planner",
                    user: `${newUser.firstName} ${newUser.lastName}`,
                    joinedAt: admin.firestore.FieldValue.serverTimestamp(),
                    userId: `${user.uid}`
                }
                return createNotification(Notification);
            })

    })