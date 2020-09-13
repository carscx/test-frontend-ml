import React, { createContext, useState } from "react";

const ErrorsContext = createContext();
function ErrorsProvider({ children }) {
  const [dataErrors, setDataErrors] = useState({});
  return (
    <ErrorsContext.Provider value={[dataErrors, setDataErrors]}>
      {children}
    </ErrorsContext.Provider>
  );
}

export { ErrorsContext };
export default ErrorsProvider;
