import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { db } from './db'
import { useLiveQuery } from "dexie-react-hooks";
import { Header, Footer } from './components';
import { memoRoutes } from './routes'
import { Fade } from './components'

window.screen.orientation.lock("portrait")

const Root = () => {
  const theme = useLiveQuery(
    () => db.settings.where('key').equals("theme").first()
  );

  const [footerButtons, setFooterButtons] = useState<JSX.Element>()

  return (
    <React.StrictMode>
      <div className='Root' attr-theme={theme?.value ? theme?.value : 'Light'}>
        <Fade />
        <BrowserRouter >
          <Header />
          <div className='Content' >
            <Routes>
              { memoRoutes.map(
                e => <Route key={e.id} id={e.id} path={e.path} element={e.element(setFooterButtons)} />
              ) }
            </Routes>
          </div>
          <Footer children={footerButtons as JSX.Element }/>
        </BrowserRouter>
      </div>
    </React.StrictMode>
  )
}

const element: HTMLElement = document.getElementById("root") as HTMLElement

ReactDOM.createRoot(element).render(<Root />)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
