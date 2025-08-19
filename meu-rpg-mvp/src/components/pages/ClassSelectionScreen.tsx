import React from 'react';
import { type ClassName, classDefinitions } from '../../GameDataBank';
import Layout from '../Layout/Layout';

interface ClassSelectionScreenProps {
  onSelectClass: (className: ClassName) => void;
}

const ClassSelectionScreen: React.FC<ClassSelectionScreenProps> = ({ onSelectClass }) => {
  return (
    <Layout>
    <div className="class-selection-screen">
      <h1>Escolha sua Classe</h1>
      <div className="class-cards-container">
        {Object.values(classDefinitions).map(cls => (
          <div
            key={cls.name}
            className="class-card"
            onClick={() => onSelectClass(cls.name as ClassName)}
          >
            <h2>{cls.name}</h2>
            <p>{cls.description}</p>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};
export default ClassSelectionScreen;
