# Question and Answer on PDF File

## Introduction
------------
Its is a simple application to perfomr QnA on providing a pdf file.

## How It Works
------------


The application follows these steps to provide responses to your questions:

1. PDF Loading: The app reads multiple PDF documents and extracts their text content.

2. Text Chunking: The extracted text is divided into smaller chunks that can be processed effectively.

3. Language Model: The application utilizes a language model to generate vector representations (embeddings) of the text chunks.

4. Similarity Matching: When you ask a question, the app compares it with the text chunks and identifies the most semantically similar ones.

5. Response Generation: The selected chunks are passed to the language model, which generates a response based on the relevant content of the PDFs.


## All Endpoints Usage
------------


1. /file [POST]    Get the file as an input and extract the text data and loads into the model.

2. /default_csv [GET]   Loads the default CSV by taking filename as query parameter.

3. /ask_question [POST]    Takes question as an input and input question into ML model and return ML models output as an answer(result).


## Challenges faced building frontend
------------


1. Handling file upload was a major problem I have faced.

2. Designing column in order to separate file upload and chat separatley.

3. API's integrations.

## Improvements
------------


1. I could have made better error handling

2. Made a better desing and flow, something like auto scroll

3. Focused on local storage of keys values.


