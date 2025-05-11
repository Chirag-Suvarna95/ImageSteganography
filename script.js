// Function to clear error and extracted message displays
function clearMessages() {
    document.getElementById('errorMessage').innerText = '';
    document.getElementById('extractedMessage').innerText = '';
}

// Function to encrypt the message
function encryptMessage(message, key) {
    if (!key) {
        throw new Error("Encryption key is required.");
    }
    return CryptoJS.AES.encrypt(message, key).toString();
}

// Function to decrypt the message
function decryptMessage(encryptedMessage, key) {
    if (!key) {
        throw new Error("Decryption key is required.");
    }
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
            throw new Error("Invalid key or corrupted message.");
        }
        return decrypted;
    } catch (error) {
        console.error("Decryption failed:", error);
        throw error; // Re-throw to handle in caller
    }
}

function hideMessageInImage(imageData, message) {
    let imgData = imageData.data;
    let msg = message + '\0'; // Null terminator to mark end of message
    let msgLen = msg.length;
    let msgIndex = 0;

    console.log("Hiding message:", msg);

    for (let i = 0; i < imgData.length; i += 8) {
        if (msgIndex < msgLen) {
            let charCode = msg.charCodeAt(msgIndex);
            imgData[i] = (imgData[i] & 0xFE) | ((charCode >> 7) & 0x01);
            imgData[i + 1] = (imgData[i + 1] & 0xFE) | ((charCode >> 6) & 0x01);
            imgData[i + 2] = (imgData[i + 2] & 0xFE) | ((charCode >> 5) & 0x01);
            imgData[i + 3] = (imgData[i + 3] & 0xFE) | ((charCode >> 4) & 0x01);
            imgData[i + 4] = (imgData[i + 4] & 0xFE) | ((charCode >> 3) & 0x01);
            imgData[i + 5] = (imgData[i + 5] & 0xFE) | ((charCode >> 2) & 0x01);
            imgData[i + 6] = (imgData[i + 6] & 0xFE) | ((charCode >> 1) & 0x01);
            imgData[i + 7] = (imgData[i + 7] & 0xFE) | ((charCode) & 0x01);

            msgIndex++;
        } else {
            break;
        }
    }

    console.log("Message hidden successfully.");

    return imageData;
}

function extractMessageFromImage(imageData) {
    let imgData = imageData.data;
    let extractedMessage = '';
    let charCode = 0;

    console.log("Starting extraction...");

    for (let i = 0; i < imgData.length; i += 8) {
        charCode = ((imgData[i] & 0x01) << 7) |
                   ((imgData[i + 1] & 0x01) << 6) |
                   ((imgData[i + 2] & 0x01) << 5) |
                   ((imgData[i + 3] & 0x01) << 4) |
                   ((imgData[i + 4] & 0x01) << 3) |
                   ((imgData[i + 5] & 0x01) << 2) |
                   ((imgData[i + 6] & 0x01) << 1) |
                   (imgData[i + 7] & 0x01);

        if (charCode === 0) {
            break;
        }

        extractedMessage += String.fromCharCode(charCode);
    }

    console.log("Extraction completed:", extractedMessage);

    return extractedMessage;
}

function handleFileSelect(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function(event) {
        let img = new Image();
        img.onload = function() {
            let canvas = document.getElementById('myCanvas');
            let ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            let canvas1 = document.getElementById('myCanvas1');
            let ctx1 = canvas1.getContext('2d');
            canvas1.width = img.width;
            canvas1.height = img.height;
            ctx1.drawImage(img, 0, 0, img.width, img.height);
        };
        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
}

document.getElementById('imageInput').addEventListener('change', handleFileSelect, false);

function hideMessage() {
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');

    let canvas1 = document.getElementById('myCanvas1');
    let ctx1 = canvas1.getContext('2d');

    let message = document.getElementById('messageInput').value;
    let key = document.getElementById('keyInput').value;

    try {
        clearMessages(); // Clear previous messages
        // Encrypt the message
        let encryptedMessage = encryptMessage(message, key);
        console.log("Encrypted message:", encryptedMessage);

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Hide the encrypted message
        imageData = hideMessageInImage(imageData, encryptedMessage);

        ctx.putImageData(imageData, 0, 0);
        ctx1.putImageData(imageData, 0, 0);

        document.getElementById('myCanvas1').style.display = 'block';
    } catch (error) {
        console.error("Error hiding message:", error);
        document.getElementById('errorMessage').innerText = "Failed to hide message: " + error.message;
        document.getElementById('extractedMessage').innerText = '';
    }
}

function extractMessage() {
    let canvas = document.getElementById('myCanvas');
    let ctx = canvas.getContext('2d');

    let key = document.getElementById('keyInput').value;

    try {
        clearMessages(); // Clear previous messages
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Extract the encrypted message
        let encryptedMessage = extractMessageFromImage(imageData);

        // Decrypt the message
        let decryptedMessage = decryptMessage(encryptedMessage, key);

        document.getElementById('extractedMessage').innerText = "Extracted Message: " + decryptedMessage;
    } catch (error) {
        console.error("Error extracting message:", error);
        document.getElementById('errorMessage').innerText = "Failed to extract message: Invalid key or corrupted message.";
        document.getElementById('extractedMessage').innerText = '';
    }
}