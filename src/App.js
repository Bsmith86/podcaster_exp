import './App.css';
import appLogo from './assets/logo2.png';

import { ContextProvider } from './contexts';

/// COMPONENTS ///
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
// import PageWrapper from './components/PageWrapper';


/// PAGES ///
import WithRightBar from './routes/WithRightBar'
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload'

// AWS
import Amplify, { API, Auth } from 'aws-amplify';
import awsExports from "./aws-exports";
import { Authenticator , withAuthenticator, View, Image, useTheme } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


// TRANSLATIONS //
import { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-react';
translations.es["Create Account"] = "Crear Cuenta";
translations.es["Given Name"] = "Nombre";
translations.es["Family Name"] = "Apellidos";
I18n.putVocabularies(translations);
I18n.setLanguage('es');


Amplify.configure(awsExports);




const myAPI = "api36e7f243";
const path = "/test";


function App() {
  // console.log(await API.Auth.currentCredentials());

  //   let getTest = (e) => {
  //   console.log(input)
  //   API.get("api36e7f243", path + "/" + input)
  //   .then((res) => {
  //     console.log("THIS IS API RES: ", res);
  //     let newTests = [...tests, res];
  //     setTests(newTests);
  //   })
  //   .catch((error) => {
  //     console.log("error", error)
  //   })
  // }

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
    <Router className="root-container">
      <ContextProvider>
        <div style={{display: "flex"}}>
          <Sidebar />
          <div className="app-content">
            <Navbar />
            <Routes>
              {/* <Route  path="/dashboard" element={<LandingPage />} /> */}
              {/* <Route  path="/register" element={<Register />} />
              <Route  path="/login" element={<Login />} /> */}
              {/* <Route path="/" element={<PageWrapper Component={Home}/>} /> */}
              {/* <Route path="/" element={Home} /> */}
              <Route path="/" element={<WithRightBar Component={Dashboard}/>} />
              <Route path="/upload" element={<WithRightBar Component={Upload}/>} />

              {/* <Route path="/upload" element={<Upload/>} /> */}

            </Routes>
          </div>
        </div>
        {/* <Footer /> */}
      </ContextProvider>
  </Router>
      )}
    </Authenticator>
  );
}

export default App;
