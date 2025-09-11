import React, { useState } from 'react';
import { type ClassName, classDefinitions } from '../../data/GameDataBank';
import './ClassSelectionScreen.css';

type SelectedClass = typeof classDefinitions[keyof typeof classDefinitions];

interface ClassSelectionScreenProps {
  onSelectClass: (className: ClassName) => void;
}

const ClassSelectionScreen: React.FC<ClassSelectionScreenProps> = ({ onSelectClass }) => {
  const [selectedClass, setSelectedClass] = useState<SelectedClass | null>(null);

  const handleClassClick = (cls: SelectedClass) => {
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

   const classes = Object.values(classDefinitions);
    const leftClasses = classes.slice(0, 3);
    const rightClasses = classes.slice(3, 6);

  return (
    <div className="select-container-bg">

      <div className="selection-title-wrapper">
        <h1 className="selection-title">SOLDIER SELECT</h1>
      </div>
      
      <div className="main-content-wrapper">
        {/* Barra lateral esquerda */}
        <div className="class-sidebar">
          {leftClasses.map(cls => (
            <div
              key={cls.name}
              className={`class-card ${selectedClass?.name === cls.name ? 'selected' : ''}`}
              onClick={() => handleClassClick(cls)}
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
              {/* Contêiner para imagem e status, lado a lado */}
              <div className="character-details-header">
                <img src={selectedClass.image} alt={selectedClass.name} className="selected-image" />
                <div className="character-stats-and-skills">
                  <div className="selected-character-stats">
                    <h3>{selectedClass.name}</h3>
                    <p>{selectedClass.description}</p>
                    <p><strong>HP:</strong> {selectedClass.stats.hp}</p>
                    <p><strong>Dano:</strong> {selectedClass.stats.damage}</p>
                  </div>
                </div>
              </div>

               {/* Slots de item na parte de baixo */}
              <div className="item-slots-wrapper">
                <div className="item-slots-row">
                  <div className="item-slot weapon-slot"></div>
                  <div className="item-slot armor-slot"></div>
                </div>
                <div className="item-slots-row">
                  <div className="item-slot consumable-slot"></div>
                  <div className="item-slot consumable-slot"></div>
                </div>
              </div>
              
              <div className="details-buttons">
                <button onClick={handleConfirmSelection} className="confirm-button">Confirmar</button>
                <button onClick={handleCancelSelection} className="cancel-button">Cancelar</button>
              </div>
            </div>
          )}
        </div>

            {/* Barra lateral direita */}
        <div className="class-rightsidebar">
          {rightClasses.map(cls => (
            <div
              key={cls.name}
              className={`class-card ${selectedClass?.name === cls.name ? 'selected' : ''}`}
              onClick={() => handleClassClick(cls)}
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

      </div>
    </div>
  );
};

export default ClassSelectionScreen;