# AI-Powered Personal Productivity Notes App

## Project Overview
* In Progress - 25% Done

**Goal**: To enhance an existing notes application by integrating an AI-driven assistant using the LLaVA model and Langflow. This will allow users to create, manage, and interact with their personal notes, providing intelligent responses and insights based on the content of their notes.

## Key Components

1. **Frontend**:
   - **React**: For building the user interface that allows users to create and manage notes.
   - **Chakra UI**: For providing a modern and responsive design.

2. **Backend**:
   - **Flask**: To serve the API endpoints for saving and retrieving notes, as well as handling requests to the AI model.
   - **Ollama**: To host the LLaVA model for processing user queries and generating responses based on the notes.
   - **Langflow**: To facilitate the interaction between the user interface and the LLaVA model, enhancing the AI's contextual understanding.

3. **Database**:
   - **AstraDB**: To store user notes and related information.

## Technical Stack

- **Frontend**: React, Chakra UI - 50% Done
  - **Technologies Used**: 
    - **React**: For building interactive user interfaces.
    - **Chakra UI**: For accessible and responsive component design.
    - **Redux or Context API** (to be implemented): For state management across components.

- **Backend**: Flask - 45% Done
  - **Technologies Used**:
    - **Flask**: A lightweight Python web framework for building APIs.
    - **Flask-SQLAlchemy**: For ORM capabilities to interact with the AstraDB.
    - **Flask-CORS**: For enabling cross-origin resource sharing between frontend and backend.

- **Model Hosting**: Ollama (LLaVA) - 0% Done
  - **Technologies Used**:
    - **Ollama**: To host and run the LLaVA model for processing AI queries.
    - **Langflow**: To streamline the AI query process and improve response accuracy.
    - **Docker** (to be used): For containerization of the model environment, ensuring consistency in deployment.

- **Database**: AstraDB - 0% Done (Current database is SQLite)
  - **Technologies Used**:
    - **AstraDB**: A managed database service for storing user notes and metadata.
    - **SQLite**: Currently being used for local development and testing before migrating to AstraDB.

## Development Progress

- **Frontend**: React, Chakra UI - 50% Done
  - **Current Status**: The user interface has been designed and implemented for creating, viewing, and managing notes. Basic components such as forms, buttons, and note lists are functional.
  - **Next Steps**:
    - Integrate state management (e.g., using React Context or Redux) to handle note data globally.
    - Implement user authentication (optional) to secure personal notes.
    - Optimize the UI for better user experience and responsiveness on mobile devices.

- **Backend**: Flask - 45% Done
  - **Current Status**: The Flask application has been set up with basic routes for creating and retrieving notes. Connection to the AstraDB is in progress.
  - **Next Steps**:
    - Finalize the database integration with AstraDB.
    - Implement API endpoints for updating and deleting notes.
    - Develop the endpoint for querying the LLaVA model with user prompts.

- **Model Hosting**: Ollama (LLaVA) - 0% Done
  - **Current Status**: The setup for hosting the LLaVA model has not yet been completed.
  - **Next Steps**:
    - Pull and run the LLaVA model using Ollama.
    - Create a wrapper for API calls to the model from the Flask backend.
    - Test the integration of the model with example prompts using Langflow.

- **Database**: AstraDB - 0% Done
  - **Current Status**: The database schema has not yet been defined or implemented.
  - **Next Steps**:
    - Define the database schema for storing notes, including fields for title, description, and timestamps.
    - Implement database connection logic in the Flask backend.
    - Populate the database with initial test data.

## Implementation Timeline
| Phase                     | Estimated Completion Date | Status     |
|---------------------------|--------------------------|------------|
| Frontend Development       | HE/HE/HEHEHE               | HEHEHE |
| Backend Development        | HE/HE/HEHEHE             | HEHEHE |
| Model Hosting              | HE/HE/HEHEHE                | HEHEHE |
| Database Setup             | HE/HE/HEHEHE                 | HEHEHE |

## Features
- **Create, Read, Update, Delete Notes**: Users can manage their notes effectively.
- **AI-Powered Queries**: Users can ask the AI for insights or assistance based on their notes, enhancing productivity and organization.
- **Responsive Design**: The app will be accessible on various devices, ensuring users can manage their notes anytime, anywhere.
- **Data Persistence**: Notes will be stored securely in AstraDB, providing reliable access and management.

## Challenges and Considerations
- **Model Performance**: Evaluating how well the LLaVA model understands and responds to user queries based on the context of their notes. There may be concerns about whether my PC can handle the computational demands of running LLaVA effectively.
- **User Experience**: Ensuring that the integration of AI enhances the functionality of the notes app without overwhelming the user. The goal is to create a seamless interaction between the user and the AI assistant.
- **Database Management**: Setting up AstraDB properly to handle data efficiently and securely. It will be crucial to manage data migrations from the current SQLite database to AstraDB while ensuring data integrity and accessibility.

## Conclusion
The AI-Powered Personal Productivity Notes App aims to provide users with an enhanced note-taking experience through the integration of AI. By combining modern frontend technologies with a robust backend and an intelligent AI model, this project will help users manage their personal productivity more effectively. Continued progress will focus on completing the remaining components, ensuring a seamless user experience, and thoroughly testing the application before launch.