# NoteBot App:
* NoteBot is a web application that enables students to co-create lecture notes, supported by generative AI models (e.g., ChatGPT).

* It was initially developed by [Hla Abuhamra](https://github.com/HlaHusain), [Yusra Abdulrahman](https://github.com/Yusra-3033), [Hadeel Saleh](https://github.com/hadeelalzenaty-web), and [Hadil Khbaiz]() in the frame of the AWT course in summer semester 2023.

* It was created with React, Nodejs, Express, Mongoose, MongoDB Atlas, OpenAi, and ChatGPT `gpt-3.5-turbo` model.

  
![image](https://github.com/HlaHusain/note_bot/assets/72098393/46c32532-51a0-4327-ba42-03126ba7c80a)



See the Video Tutorial: <br />


## Dependencies
### Database
* [MongoDB Atlas](https://www.mongodb.com/atlas)
* [Mongoose](https://mongoosejs.com/)

### Backend
* [OpenAI](https://openai.com/)
* [ChatGPT](https://platform.openai.com/)
* [Express](https://expressjs.com/en)
* [Nodejs](https://nodejs.org/en)

### Frontend
* [React](https://react.dev/)
* [Material UI](https://vitejs.dev/)

## Installation
* Clone this repo `https://github.com/HlaHusain/note_bot.git`
* Navigate into the repo `cd note_bot`

* Navigate into the `backend` folder `cd backend`
* Install the dependencies ``npm install``
* Replace the configuration data of OpenAI_API_KEY with your own data in the `controllers/chatbotController.js` file
* Run the `app.js` file `nodemon app.js`

*That will start the backend server on port `3000`: http://localhost:3000/*

* Navigate into the `frontend` folder `cd frontend`
* Install the dependencies ``npm install``
* Start the local server ``npm start``

*That will open the project on your default browser: http://localhost:3001/. You can now create your own notes with the AI assistance from your browser*
