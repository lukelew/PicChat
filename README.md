![Tux, the Linux mascot](/client/public/images/picChat-logo.png)
# PicChat 
[http://www.picchat.me](http://www.picchat.me)

This project was built for Assignment 3 in Advanced Internet Programming.

### Group members are: 
- Qun Lu - 13298498
- Tianlin Wen - 12833644 
- Evgeniya Yueryva - 13066093

### Structure
Our Back-end and Front-end are separeted. So there are two individual node projects actually. All the files in the root of the folders are back-end based on expressJS. The Front-end is a project based on React.
**/client** contains the project of front-end.
**/client/src** contains all the sources files of front-end.
**/client/src/.env** stores the variable which is used for concatenating the address of all requests.
**/config** contains all the configuration for the app.
**/models** contains all the models for our data.
**/routes** contains all the requests and back-end logics.
**server.js** is the entry of the back-end.

### Functions
1. Registering as a new user and login in.
2. Users could upload images to start a new post.
3. Any other users could reply to the post by uploading some other pictures following.
4. Any users could react to any images with default emojis.
5. Users could browse all the pictures sorted by receny and populairty.
6. Leaderboard of the most active users.
7. Uploaded pictures will be anaylzed to check whether it contains any text or inappropriate contents.
8. Responsive Design.

**Bouns:**
7. Users could set and change an avatar
8. User could check all his posts in the *MyPosts* page.
9. If someone react to your pictures, you will get a notification in the *Notification* page. The number of unread notifications will be shown in the avatars as a badge.
10. Uploaded images will be processed and compressed, two different size of the same picture will be stored. The smaller one will be used in the homepage. The original one will be used in the detail page of that picture.
11. Almost a SPA(single page application), all request are asynchronous. Reloading just occur in a few places.
12. Loading effects are added for most interaction to offer a better user experience.


### Installing
To start using this application by simply run `npm install` in both **/** and **/client** to install all the necessary dependencies.

Then run `node server.js` to start the server. By default, our online database in MongoDB Atals will be connected.

Then simply run `npm start` in **/client** to start runing the front-end.

Here you go!



**Authur:** Qun Lu
