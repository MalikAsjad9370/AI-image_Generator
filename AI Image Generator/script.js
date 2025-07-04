const API_KEY = 'vk-b2DNIBAz8Mj3ZOmtj7EwcW9zk4lN2EU4Fzqcm03wHHZzQDB'; // Paste your API Key
const API_URL = 'https://api.vyro.ai/v2/image/generations';

const imageContainer = document.getElementById('imageContainer');
const imageResultElement = document.getElementById('imageResult');

// Function to generate the image
function generateImage() {
    // Get values from the input fields
    const promptValue = document.getElementById('prompt').value;
    const styleValue = document.getElementById('dropdownStyles').value;
    const ratioValue = document.getElementById('dropdownRatio').value;

    // if prompt is empty
    if (!promptValue) {
        alert('Please enter a prompt.');
        return;
    }

    setLoadingState(true);

    // prepare form data for the API request
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + API_KEY);


    const formData = new FormData();
    formData.append('prompt', promptValue);
    formData.append('style', styleValue);
    formData.append('aspect_ratio', ratioValue);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formData,
        redirect: 'follow'
    };

    fetch(API_URL, requestOptions)
        .then(response => response.blob())
        .then(blob => {
            // Create an object URL for the blob
            const imageUrl = URL.createObjectURL(blob);
            // Set the image source to display it
            imageResultElement.src = imageUrl;
        })
        .catch(error => {
            console.log('error', error);
            alert('An error occurred while generating the image.');
        })
        .finally(() => {
            // Restore the loading state
            setLoadingState(false);
        });
}

function setLoadingState(isLoading) {
    if (isLoading) {
        imageResultElement.style.display = 'none';
        imageContainer.classList.add('loading');
    } else {
        imageResultElement.style.display = 'block';
        imageContainer.classList.remove('loading');
    }
}

function downloadImage() {
    const imageUrl = imageResultElement.src;

    // if image URl is empty
    if (!imageUrl) {
        alert('No image available for download.');
        return;
    }

    // Create a temporary anchor element to image
    const link = document.createElement('a')
    link.href = imageUrl;
    link.download = 'ai-generated-image.jpg';
    link.click();
}