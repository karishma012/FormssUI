import React, { useRef, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Success from './Success';
import Spinner from './Spinner';

function Form() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const [showUploadUI, setShowUploadUI] = useState(true); // Show or hide the upload UI

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setLoading(true); // Show loading spinner while processing file

      setTimeout(() => {
        if (file.type === 'application/json') {
          const reader = new FileReader();

          reader.onload = (event) => {
            try {
              const jsonData = JSON.parse(event.target.result);
              setFileData(jsonData);
              setErrorMessage('');
            } catch (error) {
              setErrorMessage('Invalid JSON format');
              setFileData(null);
            } finally {
              setLoading(false); // Hide loading spinner when processing is done
              setShowUploadUI(true); // Show the upload UI again
            }
          };

          reader.readAsText(file);
        } else {
          setErrorMessage('Invalid file type. Please select a JSON file.');
          setFileData(null);
          setLoading(false); // Hide loading spinner
          setShowUploadUI(true); // Show the upload UI again
        }
      }, 1000); // Delay for 1 second before processing the file
      setShowUploadUI(false); // Hide the upload UI when processing begins
    } else {
      setErrorMessage('');
      setFileData(null);
      setShowUploadUI(true); // Show the upload UI if no file is selected
    }
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    if (fileData) {
      // If fileData exists and is valid JSON, proceed with submission
      setSuccessModal(true);
    } else {
      setErrorMessage('Please select a valid JSON file.');
    }
  };

  const handleCancel = () => {
    // Handle cancel button click to close the success modal
    setSuccessModal(false);
    setFileData(null); // Clear the file data
    setSelectedFile(null); // Clear the selected file
    setErrorMessage(''); // Clear any error messages
  };

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    // Trigger a click on the file input element when the icon is clicked
    fileInputRef.current.click();
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl mb-4 font-bold">
            <i className="fa fa-arrow-left fa-sm"></i> Submit Form
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700  text-sm font-bold mb-2" htmlFor="username">
             Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
              Email
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border bg-gray-100 border-gray-100 rounded pr-10 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="Email"
                type="email"
                placeholder="Email"
              />
              <FontAwesomeIcon icon={faEnvelope} className="absolute right-3 top-2 text-gray-500" />
            </div>
          </div>

          <div className="pb-6">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label htmlFor="cover-photo" className="block text-gray-700 text-sm font-bold mb-2">
                  Upload JSON File
                </label>
                <div className="mt-4 flex justify-center rounded-lg px-6 py-5 bg-gray-100" style={{ border: '2px dashed #ccc' }}>
                  {showUploadUI && (
                    <div className="text-center bg-gray-100">
                      <span onClick={handleIconClick} className="cursor-pointer">
                        <FontAwesomeIcon icon={faFileArrowUp} className="text-blue-700 text-4xl" />
                      </span>
                      <p>Browse Files</p>
                      <div className="mt-4 flex text-sm leading-6  text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                          <input ref={fileInputRef} id="file-upload" accept=".json" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                        </label>
                      </div>
                    </div>
                  )}
                  {loading && <Spinner className="text-blue-500 text-xl" />} {/* Show loading spinner */}
                  {errorMessage && !loading && (
                    <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          { !loading && (
            <div className="mb-4">
              <label className="block  text-gray-700 text-sm font-bold mb-2" htmlFor="FileContents">
                File Contents
              </label>
              <div className="border border-gray-300 bg-gray-100 p-4 max-h-48 overflow-auto whitespace-pre-wrap">
                <pre>  {JSON.stringify(fileData, "   ", 2)}</pre>
              </div>
            </div>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full mx-auto mt-4"
            type="button"
            onClick={handleSubmit}
          >
            Submit
          </button>
          {successModal && (
            <div className="fixed inset-0 flex justify-center items-center z-50">
              
              
                <Success onCancel={handleCancel} /> {/* Render the Success component here */}
              
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Form;
