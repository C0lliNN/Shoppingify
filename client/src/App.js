import React from 'react';
import './App.css';
import Button from './components/UI/Button/Button';
import FormGroup from './components/UI/FormGroup/FormGroup';
import Badge from './components/UI/Badge/Badge';
import Spinner from './components/UI/Spinner/Spinner';

function App() {
  return (
    <main className="App">
      <Button
        btnType="raised"
        variant="primary"
        onClick={() => console.log('Works')}
      >
        Save
      </Button>
      <div>
        <FormGroup>
          <FormGroup.Label htmlFor="name">Name</FormGroup.Label>
          <FormGroup.Input placeholder="Enter your name" id="name" />
        </FormGroup>
        <FormGroup>
          <FormGroup.Textarea placeholder="Note" rows="5" />
        </FormGroup>
        <FormGroup>
          <FormGroup.Select>
            <option value="1">Test</option>
            <option value="2">Test2</option>
          </FormGroup.Select>
        </FormGroup>
      </div>
      <div>
        <Badge variant="secondary">completed</Badge>
        <Badge variant="danger">canceled</Badge>
      </div>
      <div>
        <Spinner />
      </div>
      <br />
      <br />
      <br />
    </main>
  );
}

export default App;
