// components/QuizForm2.jsx
import { useState } from 'react';

export default function QuizForm2({ onSubmit, setForm2Data }) {
  const [address, setAddress] = useState('');
  const [scopeOfWork, setScopeOfWork] = useState('');
  const [ownership, setOwnership] = useState('');
  const [timeline, setTimeline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const form2 = { address, scopeOfWork, ownership, timeline };
    setForm2Data(form2);
    onSubmit(form2); // Pasa el form completo
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 class="sub_title">AI Lead Quiz – Step 2</h2>

      <label>Property Address</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="123 Main St, Miami, FL"
        required
      />

      <br /><br />

      <label>Describe the scope of work</label>
      <textarea
        value={scopeOfWork}
        onChange={(e) => setScopeOfWork(e.target.value)}
        placeholder="E.g. Full kitchen remodel with new appliances, custom cabinetry, and flooring"
        required
      ></textarea>

      <br /><br />

      <label>Ownership Status</label>
      <select value={ownership} onChange={(e) => setOwnership(e.target.value)} required>
        <option value="">-- Select --</option>
        <option value="own">I own the property</option>
        <option value="buying">I'm buying soon</option>
        <option value="browsing">Just exploring options</option>
      </select>

      <br /><br />

      <label>Timeline</label>
      <select value={timeline} onChange={(e) => setTimeline(e.target.value)} required>
        <option value="">-- Select --</option>
        <option value="0_2_months">Within 0–2 months</option>
        <option value="2_6_months">2–6 months</option>
        <option value="later">Later this year</option>
        <option value="not_sure">Not sure</option>
      </select>

      <br /><br />

      <button type="submit">Submit</button>
    </form>
  );
}
