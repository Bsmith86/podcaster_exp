import React, { useState, createContext, useEffect } from 'react'
import '@aws-amplify/ui-react/styles.css';
import appLogo from '../assets/logo2.png';

export const UserContext = createContext();

export function UserProvider (props) {


  const [user, setUser] = useState(null);


    // const components = {
    //   Header() {
    //     const { tokens } = useTheme();
    //     return (
    //       <View textAlign="center" style={{}}>
    //         <Image
    //           className="login-logo"
    //           alt="Amplify logo"
    //           src={appLogo}
    //         />
    //       </View>
    //     );
    //   },
    // }

      return (
                    <UserContext.Provider value={{
                      user, setUser
                    }}>
                      {props.children}
                    </UserContext.Provider>

      );
  }
  
  