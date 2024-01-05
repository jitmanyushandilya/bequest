# Data Integrity Verification and Recovery App

This is a simple web application built with TypeScript that allows users to securely update data, verify data integrity, and recover data in case of data tampering. The application uses cryptographic hashing and encryption to ensure data security.

## Features

### Update Data

- To update your data, follow these steps:
  1. Enter your new information in the input field.
  2. Click the "Update Data" button.
  3. The application will securely send the data to the server for storage.
  4. You will receive a confirmation message once the data is successfully updated.

### Verify Data

- To verify the integrity of your data, follow these steps:
  1. Enter the information you previously saved in the input field.
  2. Click the "Verify Data" button.
  3. The application will send the data to the server to check if it has been tampered with.
  4. You will receive a message indicating whether the data is intact or has been tampered with.

### Recover Data

- In case the data has been tampered with and you want to recover the original data, follow these steps:
  1. Click the "Recover Data" button.
  2. The application will securely request the original data from the server.
  3. If the original data is available and the server can provide it, you will receive the plaintext data, and it will replace the current input field value.

## Security Measures

- The application uses cryptographic hashing to store data securely on the server. It employs SHA-256 hashing to generate a unique hash for each data entry.

- Data sent to the server is encrypted using AES-256 encryption with a randomly generated encryption key and initialization vector (IV).

- Data recovery is only possible if the original encryption key and IV are available. These are securely stored on the server.

## Getting Started

1. Clone this repository to your local machine.

2. Run 'npm run start' in both backend and frontend files

3. Open your web browser and visit `http://localhost:8080` to access the backend and visit `http://localhost:3000` to access the frontend. 
