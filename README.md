# Responsible Navigation Menu

This project implements a responsive navigation menu with a search functionality that fetches and displays news articles using the NewsAPI.

## Features

- Responsive navigation menu that adapts to different screen sizes
- Search functionality with debounce to optimize API calls
- Integration with NewsAPI to fetch and display news articles
- Environment variable support for secure API key management

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm
- You have a NewsAPI key. If not, you can get one at [https://newsapi.org/](https://newsapi.org/)

## Installing Responsible Navigation Menu

To install the project, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/Knoxand/Responsible-Navigation-Menu.git
   ```
2. Navigate to the project directory:
   ```
   cd responsible-navigation-menu
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add your NewsAPI key to the `.env` file:
   ```
   API_KEY=your-newsapi-key-here
   ```

## Using Responsible Navigation Menu

To use the project, follow these steps:

1. Start the development server:
   ```
   npm run start
   ```
2. Open your browser and navigate to `http://localhost:9000`

## Building for Production

To build the project for production, run:

```
npm run build
```

This will create a `dist` directory with your compiled code.
