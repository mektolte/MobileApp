import { IonRow, IonCol, IonCard, IonCardContent, IonCardTitle } from "@ionic/react";
import React from "react";

const BmiResult: React.FC<{ result: number }> = (props) => {
  return (
    <IonRow>
      <IonCol>
        <IonCard>
          <IonCardContent 
          // className="card-cont" 
          class="ion-text-center"
          >
            <IonCardTitle><strong>BMI</strong></IonCardTitle>
              {/* <h1 className="ion-text-center tableHead" > BMI</h1> */}
              <IonCardTitle>{props.result.toFixed(2)}</IonCardTitle>
            {/* <h1 className="ion-text-center tableHead" > {props.result.toFixed(2)}</h1> */}
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};
export default BmiResult;
