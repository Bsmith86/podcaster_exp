import React, { useState, createContext, useEffect } from 'react'
import { Authenticator , withAuthenticator, View, Image, useTheme } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import appLogo from '../assets/logo2.png';

export const UserContext = createContext();

export function UserProvider (props) {



    const components = {
      Header() {
        const { tokens } = useTheme();
        return (
          <View textAlign="center" style={{}}>
            <Image
              className="login-logo"
              alt="Amplify logo"
              src={appLogo}
            />
          </View>
        );
      },
    }

      return (
        <Authenticator
        components={components}
        className="amplify-authenticator"
        signUpAttributes={[
          'email',
          'given_name',
          'family_name',
          'picture',
        ]}
        variation="modal"
        >      
        {({signOut, user}) => (
                    <UserContext.Provider value={{
                      user, signOut
                    }}>
                      {props.children}
                    </UserContext.Provider>
          )}
        </Authenticator>
      );
  }
  
  