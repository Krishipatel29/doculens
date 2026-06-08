//--------------------------------- DOM ELEMENTS SELECTION

//   SELECT DROP ZONE,    Browse Button ,   Hidden File Input

const dropZone = document.querySelector("#dropZone");
const browseBtn = document.querySelector(".browse-btn");
const fileInput = document.querySelector("#fileInput");

// For Verify selected elements are working or not..

console.log("DROP ZONE ELEMENT", dropZone);
console.log("Browse Button Element", browseBtn)


//----------------------------------Function for Upload File

function uploadFile(file){
    const formData = new FormData();

    formData.append("myFile",file);  // ("key", value)

    console.log("File is ready for Uploading");
    // console.log("FORM DATA",FormData);
// --------------------------------------------------------------------
    // TODO: This address will connect the frontend to the backend later. 
    // Once the backend is built, we will update this URL.

//-----------------------------------------------------------------------

    fetch("http://localhost:3000/api/files", {
        method : "POST",   //because we are sending new data to the server
        body : formData  // The 'body' is the courier box (formData) we created above
    })

    .then((res) => res.json())   // Waiting for the server to reply and then converting that reply into readable JSON

    .then((data) => {
        console.log("Server Response",data);   // When the server sends the final data back to us
    })

      // we catch the error here : 

    .catch((err) => {
        console.log("Something went wrong",err);
    });
}

//---------------------------------- USER INTERACTION (EVENT LISTENERS)


// CLICK EVENT ON BROWSE BUTTON

browseBtn.addEventListener("click", function () {
    console.log("Browse Button Clicked");

    // (programmatic) click on hidden file input
    fileInput.click();
});

// when user select file

fileInput.addEventListener("change", function () {
    const selectedFile = fileInput.files[0];

    if (selectedFile) {
        if (selectedFile.type === "application/pdf") {
            console.log("File Dropped Name:", selectedFile.name);


            // Here is called uploadFile() function

            uploadFile(selectedFile);
        }
        else {
            alert("Only PDF files are allowed.");
            console.log("It is Not a PDF file");
        }
    }
});

// when file dragover on drop zone  

dropZone.addEventListener("dragover", function (e) {
    e.preventDefault(); //  stop a default behavior of the Browser

    // for User Interface - Visuals

    dropZone.style.borderColor = "#007bff";
    dropZone.style.backgroundColor = "#222";
    console.log("File is Hovering on Drop Zone");
});


// when leave drop zone without dropping file

dropZone.addEventListener("dragleave", function () {
    // UI reset 

    dropZone.style.borderColor = "#444";
    dropZone.style.backgroundColor = "#1a1a1d";
    console.log("File left the drop zone.");
});

// when file dropped on drop zone

dropZone.addEventListener("drop", function (e) {
    e.preventDefault(); //  stop a default behavior of the Browser

    // UI reset

    dropZone.style.borderColor = "#444";
    dropZone.style.backgroundColor = "#1a1a1d";

    // GET THE FIRST DROPPED FILE

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
        if (droppedFile.type === "application/pdf") {
            console.log("File Dropped Name:", droppedFile.name);

            //Also Here is called uploadFile() function

            uploadFile(droppedFile);
        }
        else {
            alert("Only PDF files are allowed.");
            console.log("It is Not a PDF file");
        }
    }
});