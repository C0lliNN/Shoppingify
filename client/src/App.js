import React, { useState } from 'react';
import './App.css';
import Modal from './components/UI/Modal/Modal';
import Button from './components/UI/Button/Button';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="App">
      <Button
        btnType="raised"
        variant="secondary"
        onClick={() => setShowModal(true)}
      >
        Show
      </Button>

      {showModal && (
        <Modal
          title="Are you sure you want to delete this?"
          onClose={() => setShowModal(false)}
          cancelButton={
            <Button btnType="flat" onClick={() => setShowModal(false)}>
              cancel
            </Button>
          }
          okButton={
            <Button
              btnType="raised"
              variant="danger"
              style={{ marginLeft: '15px' }}
            >
              Yes
            </Button>
          }
        />
      )}
    </main>
  );
}

export default App;
