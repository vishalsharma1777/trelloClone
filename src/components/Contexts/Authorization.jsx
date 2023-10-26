import { createContext} from 'react';
export const AUTHContext = createContext();

function Authorization({ children}) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiToken = import.meta.env.VITE_API_TOKEN;
  const memberId = import.meta.env.VITE_API_MEMBER_ID;

  return (
    <AUTHContext.Provider value={{ apiKey, apiToken, memberId }}>
      {children}
    </AUTHContext.Provider>
  );
}

export default Authorization;
