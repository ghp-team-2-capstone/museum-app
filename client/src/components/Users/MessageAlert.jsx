import React, { useState, useEffect } from "react";

export default function MessageAlert({
  usernameError,
  passwordError,
  generalError,
  duplicateError,
  invalidUserError,
  successMessage,
  type,
  onClose,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if there are errors and set visibility accordingly
    if (
      usernameError ||
      passwordError ||
      generalError ||
      duplicateError ||
      invalidUserError ||
      (usernameError && passwordError)
    ) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [
    usernameError,
    passwordError,
    generalError,
    duplicateError,
    invalidUserError,
  ]);

  const alertClasses =
    type === "error"
      ? "bg-red-100 border text-red-700 px-4 py-3 rounded relative"
      : "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative";

  const closeAlert = () => {
    setVisible(false);
    onClose();
  };

  return visible ? (
    <div className={alertClasses} role="alert">
      {type === "error" ? (
        // Display error messages
        <>
          {generalError && <p>{generalError}</p>}
          {usernameError && <p>{usernameError}</p>}
          {passwordError && <p>{passwordError}</p>}
          {duplicateError && <p>{duplicateError}</p>}
          {invalidUserError && <p>{invalidUserError}</p>}
        </>
      ) : (
        // Display success message in an alert box
        <>
          {successMessage && (
            <div className={alertClasses}>
              <p className="text-green-900">{successMessage}</p>
            </div>
          )}
        </>
      )}
      <div className="absolute top-0 right-0 mt-1 mr-1">
        {/* Circular border */}
        <div className="rounded-full w-5 h-5 border border-red-500 flex items-center justify-center">
          {/* "X" button */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            onClick={closeAlert}
          >
            <path
              fillRule="evenodd"
              d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 11-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  ) : null;
}
