import { IonApp, IonHeader, IonToolbar, IonTitle, IonItem, IonLabel, IonInput, IonRow, IonCol, IonGrid, IonContent, IonButton } from '@ionic/react';
import React from 'react';
import './ExploreContainer.css';




interface ContainerProps {
  name: string;
}

const BMICalc: React.FC<ContainerProps> = ({ name }) => {

  return (
    <IonApp>
        <IonHeader>
            <IonToolbar color="primary">
                <IonTitle>
                <strong>{name}</strong>
                </IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent>
            <IonItem>
                <IonLabel position="floating">Your Height</IonLabel>
                <IonInput id="height-input"></IonInput>
            </IonItem>

            <IonItem>
                <IonLabel position="floating">Your Weight</IonLabel>
                <IonInput id="weight-input"></IonInput>
            </IonItem>
            
<IonGrid>
    <IonRow>
        <IonCol>
            <IonButton color="success" id="calculate">Calculate!</IonButton>
        </IonCol>
        <IonCol>
            <IonButton color="danger" id="reset">Reset</IonButton>
        </IonCol>
    </IonRow>
</IonGrid>
            
            
            <div id="result"></div>
        </IonContent>

    </IonApp>

  );
};

export default BMICalc;
