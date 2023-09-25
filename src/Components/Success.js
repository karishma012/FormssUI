import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function Success({ onCancel }) {
  return (

      
        <div className="flex flex-col items-center p-5 bg-white border rounded-lg relative">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-blue-800 text-8xl mb-2"
          />
          <span className="font-bold text-xl text-blue-700">Success!</span>
          <span>524 entries successfully uploaded</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full mt-4"
            type="button"
            onClick={() => {
              // Handle "Go to My Entries" click action here
            }}
          >
            Go to My Entries
          </button>
          <button
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full mt-4"
            type="button"
            onClick={onCancel} // Call onCancel when "Cancel" button is clicked
          >
            Cancel
          </button>
        </div>
   
    
  );
}

export default Success;
