import React, { useEffect,useState } from 'react';
import { IonCard, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import CurrencyRow from './currRow';

const BASE_URL='https://api.exchangeratesapi.io/latest'

const CurrenC: React.FC = () => {

const [currencyOptions, setCurrencyOptions] = useState<any>([]);
const [fromCurrency, setFromCurrency] = useState<any>()
  const [toCurrency, setToCurrency] = useState<any>()
  const [exchangeRate, setExchangeRate] = useState<any>()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => 
        {
          const firstCurrency = Object.keys(data.rates)[0]
          setCurrencyOptions([data.base, ...Object.keys(data.rates)])
          setFromCurrency(data.base)
          setToCurrency(firstCurrency)
          setExchangeRate(data.rates[firstCurrency])
        }
        )
  },[])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e: { target: { value:number; }; }) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e: { target: { value: number; }; }) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CurrenC</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
      <IonCard className="body">
      
        <IonCard className="input-card" >
       
        <div>
          <h5 className='h5'>Curren C</h5>
          <CurrencyRow currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e: { target: { value: any ;}; })=> setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
        amount={fromAmount}/>
          
          
          <h1>=</h1>

         
          <CurrencyRow currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e: { target: { value: any ; }; })=> setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
        amount={toAmount}/>
          
         </div>
        </IonCard>
       
      </IonCard>
        
      </IonContent>
    </IonPage>
  );
};

export default CurrenC;
