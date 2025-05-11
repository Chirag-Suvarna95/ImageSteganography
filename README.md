# Image Steganography Project

This project demonstrates advanced image steganography techniques, allowing users to hide encrypted messages within images and extract them securely. It leverages JavaScript, HTML5 Canvas, and the `crypto-js` library for AES encryption to ensure message confidentiality.

## Features

- **Hide Encrypted Message**: Upload an image, enter a message, and provide an encryption key to securely hide the message within the image.
- **Extract Encrypted Message**: Extract and decrypt hidden messages from an image using the correct encryption key.
- **Display**: Shows the original and modified images side by side for comparison.
- **Encryption**: Uses AES encryption to secure messages before hiding, adding an extra layer of protection.

  - Open `index.html` in a web browser to run the application.

## Usage

1. **Upload an Image**:

   - Click the "Click to upload image" button to select an image file from your device.

2. **Hide an Encrypted Message**:

   - Enter the message to hide in the "Enter message to hide" textarea.
   - Provide an encryption key in the "Enter encryption key" password field (below the "Enter Encryption Key" heading).
   - Click the "Hide Message" button to encrypt the message with AES and embed it in the image.
   - The modified image will appear in the "Result" canvas.

3. **Extract an Encrypted Message**:

   - Upload the modified image containing the hidden message.
   - Enter the same encryption key used to hide the message.
   - Click the "Extract Message" button to extract and decrypt the message.
   - The decrypted message will be displayed below, or an error message will appear if the key is incorrect.

## Code Explanation

### HTML (`index.html`)

- **File Upload**: A custom-styled input for selecting an image file.
- **Textarea**: For entering the message to be hidden.
- **Password Input**: For entering the AES encryption key, clearly labeled with an "Enter Encryption Key" heading.
- **Buttons**: For triggering the hide and extract message functionalities.
- **Canvas Elements**: Two canvases to display the original and modified images.
- **External Library**: Includes `crypto-js` via CDN for AES encryption.

### JavaScript (`script.js`)

- `encryptMessage(message, key)`: Encrypts the message using AES with the provided key.
- `decryptMessage(encryptedMessage, key)`: Decrypts the extracted message using the provided key, with error handling for invalid keys.
- `hideMessageInImage(imageData, message)`: Hides the encrypted message in the image by modifying the least significant bits of pixel data.
- `extractMessageFromImage(imageData)`: Extracts the hidden encrypted message from the image data.
- `handleFileSelect(event)`: Handles image file selection and displays the image on both canvases.
- `hideMessage()`: Encrypts the user-provided message and hides it in the uploaded image.
- `extractMessage()`: Extracts the encrypted message, decrypts it, and displays the result or an error.

## Acknowledgments

- Inspired by steganography techniques and encryption tutorials.
- Utilizes `crypto-js` for robust AES encryption.
- Designed with modern web aesthetics, including glassmorphism and gradient effects.

## Notes

- **Security**: AES encryption relies on a strong, secret key. Ensure the encryption key is robust and not shared publicly.
- **Message Length**: Encrypted messages are longer than plain text. Use images with sufficient pixels (at least `8 * (encrypted_message_length + 1)` pixels) to store the message.
- **Testing**: Test with small images and short messages to verify functionality before using larger files.
- **Enhancements**: Consider adding features like a "Save Image" button or loading indicators for improved user experience.
