import React, { useState } from 'react';
import { type ClassName, classDefinitions } from '../../GameDataBank';
import Layout from '../Layout/Layout';
import '../Styles/ClassSelectionScreen.css';

interface ClassSelectionScreenProps {
  onSelectClass: (className: ClassName) => void;
}

const ClassSelectionScreen: React.FC<ClassSelectionScreenProps> = ({ onSelectClass }) => {
  const [selectedClass, setSelectedClass] = useState<typeof classDefinitions['Tank'] | null>(null);

  const handleClassClick = (cls: typeof classDefinitions['Tank']) => {
    setSelectedClass(cls);
  };

  const handleConfirmSelection = () => {
    if (selectedClass) {
      onSelectClass(selectedClass.name as ClassName);
    }
  };

  const handleCancelSelection = () => {
    setSelectedClass(null);
  };

  return (
    <Layout>
      <div className="class-selection-screen">
        <div className="select-container-bg">
          <div className="selection-title-wrapper">
            <h1 className="selection-title">SOLDIER SELECT</h1>
          </div>
          <div className="main-content-wrapper">
          {/* Barra lateral de seleção de classe */}
          <div className="class-sidebar">
            {Object.values(classDefinitions).map(cls => (
              <div
                key={cls.name}
                className={`class-card ${selectedClass?.name === cls.name ? 'selected' : ''}`}
                onClick={() => handleClassClick(cls as typeof classDefinitions['Tank'])}
              >
                <div className="class-image-container">
                  <img src={cls.image} alt={cls.name} className="class-image" />
                </div>
                <div className="class-name-tag">
                  {cls.name}
                </div>
              </div>
            ))}
          </div>

          {/* Área de visualização do personagem */}
          <div className="character-display-area">
            {selectedClass && (
              <div className="selected-character-card">
                <img src={selectedClass.image} alt={selectedClass.name} className="selected-image" />
                <div className="details-info">
                  <h3>{selectedClass.name}</h3>
                  <p>{selectedClass.description}</p>
                  <div className="stats-list">
                    <p><strong>HP:</strong> {selectedClass.stats.hp}</p>
                    <p><strong>Dano:</strong> {selectedClass.stats.damage}</p>
                  </div>
                  <div className="details-buttons">
                    <button onClick={handleConfirmSelection} className="confirm-button">Confirmar</button>
                    <button onClick={handleCancelSelection} className="cancel-button">Cancelar</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default ClassSelectionScreen;

