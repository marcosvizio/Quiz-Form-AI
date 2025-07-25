// components/QuizForm1.jsx
import { useState } from 'react';

export default function QuizForm1({ onNext, setForm1Data }) {
  const [projectType, setProjectType] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [locationZone, setLocationZone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm1Data({ projectType, budgetRange, locationZone });
    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 class="sub_title">AI Lead Quiz – Step 1</h2>

      <label>What type of project are you planning?</label>
      <select value={projectType} onChange={(e) => setProjectType(e.target.value)} required>
        <option value="">Select...</option>
        <option value="kitchen_remodel">Kitchen Remodel</option>
        <option value="bathroom_renovation">Bathroom Renovation</option>
        <option value="whole_home">Whole Home Renovation</option>
        <option value="new_construction">New Construction</option>
        <option value="condo_upgrade">Condo Upgrade</option>
      </select>

      <br /><br />

      <label>What is your estimated budget?</label>
      <select value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)} required>
        <option value="">Select...</option>
        <option value="under_50k">Under $50k</option>
        <option value="50k_150k">$50k–$150k</option>
        <option value="150k_400k">$150k–$400k</option>
        <option value="over_400k">Over $400k</option>
        <option value="not_sure">Not sure</option>
      </select>

      <br /><br />

      <label>Where is your property located?</label>
      <select value={locationZone} onChange={(e) => setLocationZone(e.target.value)} required>
        <option value="">Select...</option>
        <option value="coral_gables">Coral Gables</option>
        <option value="miami_beach">Miami Beach</option>
        <option value="coconut_grove">Coconut Grove</option>
        <option value="north_miami">North Miami</option>
        <option value="other">Other</option>
      </select>

      <br /><br />

      <button type="submit">Next</button>
    </form>
  );
}
