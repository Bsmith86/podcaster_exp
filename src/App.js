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



// import '@aws-amplify/ui-react/styles.css';


// TRANSLATIONS //
// import { I18n } from 'aws-amplify';
// import { translations } from '@aws-amplify/ui-react';
// translations.es["Create Account"] = "Crear Cuenta";
// translations.es["Given Name"] = "Nombre";
// translations.es["Family Name"] = "Apellidos";
// I18n.putVocabularies(translations);
// I18n.setLanguage('es');




function App() {
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

    <Router className="root-container">
      <ContextProvider>
        <div style={{display: "flex"}}>
          <Sidebar />
          <div className="app-content">
            <Navbar />
            <Routes>
              <Route path="/" element={<WithRightBar Component={Dashboard}/>} />
              <Route path="/upload" element={<WithRightBar Component={Upload}/>} />
            </Routes>
          </div>
        </div>
        {/* <Footer /> */}
      </ContextProvider>
  </Router>
  );
}

export default App;
