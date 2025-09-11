import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type ClassName, classDefinitions } from '../../data/GameDataBank';
import './ClassSelectionScreen.css';

type SelectedClass = typeof classDefinitions[keyof typeof classDefinitions];

interface ClassSelectionScreenProps {
  onSelectClass: (className: ClassName) => void;
}

// Variantes de animação
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

const displayVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};

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
    <motion.div
      className="select-container-bg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="selection-title-wrapper" variants={containerVariants}>
        <motion.h1 className="selection-title" variants={cardVariants}>
          SOLDIER SELECT
        </motion.h1>
      </motion.div>

      <motion.div className="main-content-wrapper" variants={containerVariants}>
        {/* Barra lateral esquerda */}
        <motion.div className="class-sidebar" variants={containerVariants}>
          {leftClasses.map((cls) => (
            <motion.div
              key={cls.name}
              className={`class-card ${selectedClass?.name === cls.name ? 'selected' : ''}`}
              onClick={() => handleClassClick(cls)}
              variants={cardVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="class-image-container">
                <img src={cls.image} alt={cls.name} className="class-image" />
              </div>
              <div className="class-name-tag">
                {cls.name}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Área de visualização do personagem */}
        <div className="character-display-area">
          <AnimatePresence mode="wait">
            {selectedClass && (
              <motion.div
                key={selectedClass.name}
                className="selected-character-card"
                variants={displayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
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
                  <motion.button
                    onClick={handleConfirmSelection}
                    className="confirm-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Confirmar
                  </motion.button>
                  <motion.button
                    onClick={handleCancelSelection}
                    className="cancel-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Cancelar
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Barra lateral direita */}
        <motion.div className="class-rightsidebar" variants={containerVariants}>
          {rightClasses.map((cls) => (
            <motion.div
              key={cls.name}
              className={`class-card ${selectedClass?.name === cls.name ? 'selected' : ''}`}
              onClick={() => handleClassClick(cls)}
              variants={cardVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="class-image-container">
                <img src={cls.image} alt={cls.name} className="class-image" />
              </div>
              <div className="class-name-tag">
                {cls.name}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ClassSelectionScreen;