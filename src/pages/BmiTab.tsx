import React, { useRef, useState } from "react";
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
  
} from "@ionic/react";
import "./bmi.css";
import InputCtrl from '../components/InputCtrl';
import BmiControls from "../components/BmiControls";
import BmiResult from "../components/BmiResult";


const BmiTab: React.FC = () => {
  const [caledBMI, setcaledBMI] = useState<number>();
  const [error, setError]= useState<string>();
  const [calcUnits, setCalcUnits]= useState<'mtrx'|'impr' > ('mtrx');
  

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
      <IonContent  >
      <IonHeader>
        <IonToolbar color="black" >
          <IonTitle>Be Aim I Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <div className="card-nobg"  >
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
         

        {/* <IonContent >
          <div className="cole ">
          <IonRow >
            <IonCol className="align-left tableHead " >
          <h1 className="tableHead ">Category</h1>
          <br /> <h3 >Severe Thinness</h3>
          <br /> <h3 >Moderate Thinness</h3>
          <br /> <h3 >Mild Thinness</h3>
          <br /> <h3 >Normal</h3>
          <br /> <h3 >Overweight</h3>
          <br /> <h3 >Obese Class I</h3>
          <br /> <h3 >Obese Class II</h3>
          <br /> <h3 >Obese Class III</h3>
        </IonCol>
        <IonCol ><h1 className="tableHead ">BMI-Range</h1>
          <br /> <h3 className="dranger ">Less than 16</h3>
          <br /> <h3 className="dranger ">16 - 17</h3>
          <br /> <h3 className="oke ">17 - 18.5</h3>
          <br /> <h3 className="oke ">18.5 - 25</h3>
          <br /> <h3 className="dranger ">25 - 30</h3>
          <br /> <h3 className="dranger ">30 - 35</h3>
          <br /> <h3 className="dranger ">35 - 40</h3>
          <br /> <h3 className="dranger ">More than 40</h3>
        </IonCol>
        </IonRow>
        </div>
      </IonContent> */}
      </div>
      </IonContent>
    </IonPage>
    </React.Fragment>
  );
};

export default BmiTab;
