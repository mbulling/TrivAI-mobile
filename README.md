# TrivAI

<center><img src="https://github.com/mbulling/TrivAI-mobile/blob/main/Slides/banner-trivai.png?raw=true" style="max-width: 500px; max-height: 150px; width: auto; height: auto;"></img></center>

TrivAI is an mobile application that leverages LLMs to generate questions and study materials for a user. The backend utilizes a serverless architecture that enables reduced latency and more reliable responses.

<a href="https://apps.apple.com/us/app/trivai/id6447194187">Download on iOS App Store</a>

## Getting Started

### Prerequisites

To run the app locally, you will need to have the following:

- Node

### Installing

1. Clone this repository to your local machine.
2. Navigate to the `trivai-mobile` directory and install the required packages by running the following command:

      ```yarn install```


3. Set up your API access by requesting the API route.
4. In the `lib` directory, create a `key.js` file and add the API route as follows:

    ```export default AWS_HOST = "<HOST LINK>";```
    
5. In the `lib` directory, create a `ocrapikey.js` file and add the API key for the CV portion as follows: (To get a free key, go to ocr.space)
    ```export default key = "<key>";```
   

### Running the App

1. Launch the server.

    ```yarn start```

2. Build and run the app on your desired device or simulator.
3. Use the app to generate quizzes and test your knowledge!

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork this repository.
2. Create a new branch with your proposed changes.
3. Commit and push your changes to your fork.
4. Submit a pull request describing your changes and their purpose.










