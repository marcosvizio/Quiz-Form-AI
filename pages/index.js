// pages/index.js
import { useState } from 'react';
import QuizForm1 from '../components/QuizForm';
import QuizForm2 from '../components/QuizForm2';
import { evaluateLead } from '../lib/LogicEngine';

export default function Home() {
  const [step, setStep] = useState(1);
  const [form1Data, setForm1Data] = useState(null);
  const [form2Data, setForm2Data] = useState(null);
  const [leadResult, setLeadResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleForm1Submit = (data) => {
    setForm1Data(data);
    setStep(2);
  };

  const handleForm2Submit = async (data) => {
    setForm2Data(data);
    setLoading(true);

    try {
      const result = await evaluateLead(form1Data, data);
      setLeadResult(result);
    } catch (error) {
      console.error('Error evaluating lead:', error);
      setLeadResult({ score: 0, category: 'Error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <div style={{display:'flex', justifyContent:'center' }}>
        <img src="/LOGO_WHITE.png" alt="Metro AI Quiz Logo" style={{ width: '250px', marginBottom: '1rem'}} />
      </div>
      <h1 class="main_title">¡We present the new AI Lead Quiz!</h1>

      {step === 1 && (
        <QuizForm1
          setForm1Data={handleForm1Submit}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <QuizForm2
          setForm2Data={() => {}}
          onSubmit={handleForm2Submit}
          loading={loading}
        />
      )}

      {leadResult && (
        <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid black' }}>
          <h2>Result</h2>
          <p><strong>Lead Score:</strong> {leadResult.score}</p>
          <p><strong>Lead Category:</strong> {leadResult.leadType}</p>

        </div>
      )}
    </main>
  );
}
