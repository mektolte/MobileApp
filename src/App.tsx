import React from 'react';
import { Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import BmiTab from './pages/BmiTab';
import CurrenC from './pages/CurrencyC';
import Settings from './pages/Settings';


/* Theme variables */
import './theme/variables.css';

// ICONS

import   Tab1Icon from './assets/ico/Tab1Icon.svg';
import  Tab2Icon from './assets/ico/Tab2Icon.svg';






const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/CalculateBMI" component={BmiTab} exact={true} />
          <Route path="/ConvertCurrency" component={CurrenC} exact={true} />
          <Route path="/Settings" component={Settings} />
  
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="BmiTab" href="/CalculateBMI">
            <IonIcon icon={Tab1Icon} />
            <IonLabel>BMI</IonLabel>
          </IonTabButton>
          <IonTabButton tab="CurrC" href="/ConvertCurrency">
            <IonIcon icon={Tab1Icon} />
            <IonLabel>CurrenC</IonLabel>
          </IonTabButton>
          <IonTabButton tab="Settings" href="/Settings">
            <IonIcon icon={Tab2Icon} size="50px"/>
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
