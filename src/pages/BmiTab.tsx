import React, { useRef, useState, } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonContent,
  IonAlert,
  IonCol,
  IonRow,
  IonPage,
  IonButton,
  IonPopover,
  IonListHeader,
  IonNote
  
} from "@ionic/react";
import "./bmi.css";
import InputCtrl from '../components/InputCtrl';
import BmiControls from "../components/BmiControls";
import BmiResult from "../components/BmiResult";
import { IonList } from '@ionic/react';


const BmiTab: React.FC = () => {
  const [caledBMI, setcaledBMI] = useState<number>();
  const [error, setError]= useState<string>();
  const [calcUnits, setCalcUnits]= useState<'mtrx'|'impr' > ('mtrx');
  const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });
  

  const hRef = useRef<HTMLIonInputElement>(null);
  const wRef = useRef<HTMLIonInputElement>(null);
  

  const calculateBMI = () => {
    const inputHeight = hRef.current!.value;
    const inputWeight = wRef.current!.value;

    if (
      !inputWeight || 
      !inputHeight || 
      +inputWeight <= 0 ||
      +inputHeight <= 0
      ){
setError("Plase input Invalid, please input a number that is > 0");
      return;
    }

     // Conversion Factor || feet and lbs : Default: meters and Kg
     const heightConversionFactor= calcUnits==='impr'? 0.03280:1;
     const height= +inputHeight / heightConversionFactor;
    const weightConversionFactor= calcUnits==='impr'? 2.2046:1;
    const weight= +inputWeight / weightConversionFactor;
    

    


    //Calculates
    
    const bmi = weight / ((height * height)/10000);
    console.log(bmi)

   

    setcaledBMI(bmi);
  };

  const resetInputs = () => {
    hRef.current!.value = " ";
    wRef.current!.value = " ";
    setcaledBMI(0);
  };
  

  const clearError = ()=>{
    setError("");
  }

  const selectUnitHandler=(sValue:'mtrx' | 'impr') => {
    setCalcUnits(sValue);
  };

  return (

    <React.Fragment>
    <IonAlert isOpen={!!error} message={error} 
    buttons={[{ text: 'Okay', handler: clearError}]}
    />

    <IonPage  >
      <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Be Aim I Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div className="card-bg"  >
      <IonRow>
      <IonCol>
        <InputCtrl sValue={calcUnits} onSelectValue={selectUnitHandler} />
      </IonCol>
      </IonRow>
     
        <IonItem >
          <IonLabel position="floating">Your Height ({calcUnits === 'mtrx' ? 'Cm':'feet'}) </IonLabel>
          <IonInput  ref={hRef} type="number"></IonInput>
        </IonItem>
        <IonItem >
          <IonLabel position="floating">Your Weight ({calcUnits === 'mtrx' ? 'Kg':'lbs'})</IonLabel>
          <IonInput  ref={wRef} type="number"></IonInput>
        </IonItem>
        
          <BmiControls OnCalc={calculateBMI} OnReset={resetInputs} />
          {caledBMI && 
          <BmiResult result={caledBMI} />
          }

<IonPopover
        cssClass='my-custom-class'
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}
      >
        <IonList>

        <IonListHeader>
          Chart Range
        </IonListHeader>

        <IonItem>
          <IonLabel>Very Thin</IonLabel>
          <IonNote slot="end" color="danger">Less than 16</IonNote>
        </IonItem>

        <IonItem>
          <IonLabel>Thin</IonLabel>
          <IonNote slot="end" color="danger">16 - 17</IonNote>
        </IonItem>

        <IonItem>
          <IonLabel>Lil Thin</IonLabel>
          <IonNote slot="end" color="warning">17 - 18.5</IonNote>
        </IonItem>

        <IonItem>
          <IonLabel>Normal</IonLabel>
          <IonNote slot="end" color="success">18.5 - 25</IonNote>
        </IonItem>

        <IonItem>
          <IonLabel>Overweight</IonLabel>
          <IonNote slot="end" color="warning">25 - 30</IonNote>
        </IonItem>

        <IonItem>
          <IonLabel>Obese I</IonLabel>
          <IonNote slot="end" color="danger">30 - 35</IonNote>
        </IonItem>

        <IonItem>
          <IonLabel>Obese II</IonLabel>
          <IonNote slot="end" color="danger">35 - 40</IonNote>
        </IonItem>

        <IonItem>
          <IonLabel>Obese III</IonLabel>
          <IonNote slot="end" color="danger">More than 40</IonNote>
        </IonItem>
        
        </IonList>

        
        
      </IonPopover>
      <IonButton color="success" onClick={
        (e: any) => {
          e.persist();
          setShowPopover({ showPopover: true, event: e })
        } }
      >
        Show Range Chart
      </IonButton>      
      </div>
      </IonContent>
    </IonPage>
    </React.Fragment>
  );
};

export default BmiTab;
