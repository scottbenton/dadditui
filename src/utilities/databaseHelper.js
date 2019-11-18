export async function getUserFromID(userID, database) {
    return new Promise((resolve, reject) => {
        database.ref("/users/" + userID).once("value").then(function(snapshot) {
            resolve(snapshot.val());
        }).catch(error => {
            reject(error.message);
        });
    })
}

export async function getUserNameFromID(userID, database) {
    return new Promise((resolve, reject) => {
        getUserFromID(userID, database).then(function(user) {
            resolve(user.displayName);
        }).catch(error => {
            reject(error.message);
        });
    })
}