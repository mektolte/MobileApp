import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import React from "react";

const InputCtrl: React.FC <{sValue:'mtrx' | 'impr'; onSelectValue:(value:'mtrx' | 'impr')=> void }>= props =>{

    const inputChangerHandler=(event: CustomEvent) =>{
        props.onSelectValue(event.detail.value);
    }
;    return(
        <IonSegment value={props.sValue} onIonChange={inputChangerHandler}>
            <IonSegmentButton  value="mtrx">
            <IonLabel>cm/kg</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="impr">
            <IonLabel>ft/lbs</IonLabel>
            </IonSegmentButton>
        </IonSegment>
    );
};

export default InputCtrl;