# welcome to Flextask - by The barbell-squat-enthusiasts

# Unihack 2023 team project

Flextask is an AI powered time management app that will help you manage your project by breaking it down into more manageable tasks. We provide the user with an intuitive interface, prompting them for information about their project and generating the tasks with an OpenAI query. Once the tasks are generated, the user can tweak the provided tasks to their liking. Quick Tasks uses the Google Calendar API, allowing the user to effortlessly integrate the given tasks into their daily life.

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- Python3.11
- Node 18
- MongoDB 6.0.4
- Firebase / Google account

### Installation

#### Installing Google client library

Follow (google calendar api quickstart)[https://developers.google.com/calendar/api/quickstart/python] and set up your environment

#### Setting up the backend server

navigate to /unihack2023-server
Run the following commands to install Python dependencies
$ pip3 install -r requirements.txt

#### setting up the frontend client

Run the following commands to install Vite and Node dependencies
$ npm install

### running Flextask

run the backend server by running the following command from /unihack2023-server
$ uvicorn main:app

run the following command to run the frontend client from /unihack2023-client
$ npm run dev for dev mode