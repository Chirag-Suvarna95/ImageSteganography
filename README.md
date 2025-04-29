# Image Steganography Project

This project demonstrates basic image steganography techniques, where messages can be hidden within images and later extracted. It uses JavaScript and HTML5 canvas for hiding and extracting messages from images.

## Features

- **Hide Message:** Allows you to upload an image and hide a message within it.
- **Extract Message:** Allows you to extract hidden messages from an image.
- **Display:** Shows both the original and modified images.

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/image-steganography.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd image-steganography
    ```

3. **Open `index.html` in your web browser.**

## Usage

1. **Upload an Image:**
   - Click on the "Click to upload image" button to select an image file from your device.

2. **Hide a Message:**
   - Enter the message you want to hide in the "Enter message to hide" text area.
   - Click the "Hide Message" button to hide the message in the image.

3. **Extract a Message:**
   - Click the "Extract Message" button to extract any hidden messages from the image.

## Code Explanation

### HTML (`index.html`)

- **File Upload:** Allows users to select an image file.
- **Text Area:** For entering the message to hide.
- **Buttons:** For hiding and extracting messages.
- **Canvas Elements:** For displaying the original and processed images.

### JavaScript (`script.js`)

- **`hideMessageInImage(imageData, message)`:** Function to hide a message in the image data.
- **`extractMessageFromImage(imageData)`:** Function to extract a hidden message from the image data.
- **`handleFileSelect(event)`:** Handles image file selection and displays the image on canvas.
- **`hideMessage()`:** Hides the user-provided message in the uploaded image.
- **`extractMessage()`:** Extracts and displays the hidden message from the image.

## Contributing

Feel free to submit pull requests or open issues if you have suggestions or find bugs.

## Acknowledgments

- Inspired by various steganography techniques and tutorials.
