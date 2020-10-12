import React, { useState } from 'react';
import { Label, Input, Span } from './styles';

function Checkbox() {
  const [checked, setChecked] = useState(false);

  return (
    <Label checked={checked}>
      <Input type="checkbox" onChange={(e) => setChecked(e.target.checked)} />
      <Span />
    </Label>
  );
}

export default Checkbox;
