import React from 'react';
import { useState, useEffect } from 'react';
import '../Styles/DialogueScreen.css';

interface DialogueLine {
  speaker: string;
  text: string;
}

interface CharacterImages {
  [key: string]: string | undefined;
}

interface DialogueScreenProps {
  dialogueData: DialogueLine[];
  currentDialogueIndex: number;
  onAdvanceDialogue: () => void;
  characterImages: CharacterImages;
}

const DialogueScreen: React.FC<DialogueScreenProps> = ({
  dialogueData,
  currentDialogueIndex,
  characterImages,
  onAdvanceDialogue,
}) => {
  if (!dialogueData || dialogueData.length === 0) {
    return null;
  }
  const [showAdvanceButton, setShowAdvanceButton] = useState(false);

  const currentLine = dialogueData[currentDialogueIndex];
  const activeSpeakerName = currentLine.speaker;

  const leftSpeakerName = Object.keys(characterImages)[0];
  const rightSpeakerName = Object.keys(characterImages)[1];

  const leftImageSrc = characterImages[leftSpeakerName];
  const rightImageSrc = characterImages[rightSpeakerName];
  
  useEffect(() => {
    // Duração do temporizador em milissegundos (ex: 3 segundos)
    const timerDuration = 1000;

    // Temporizador para pular o diálogo automaticamente
    const autoAdvanceTimer = setTimeout(() => {
      onAdvanceDialogue();
    }, timerDuration);

    // Temporizador para mostrar o botão de avanço após um pequeno atraso
    const buttonTimer = setTimeout(() => {
      setShowAdvanceButton(true);
    }, 500); // Exibe o botão após 0.5 segundos

    // Função de limpeza para evitar problemas quando o componente é desmontado
    return () => {
      clearTimeout(autoAdvanceTimer);
      clearTimeout(buttonTimer);
    };
  }, [currentDialogueIndex, onAdvanceDialogue]);

  return (
    <div className="dialogue-overlay">
      <div className="dialogue-main-content">
        {/* Imagem do Personagem à Esquerda */}
        {leftImageSrc && (
          <div className={`character-image-container ${activeSpeakerName === leftSpeakerName ? 'active-speaker' : 'inactive-speaker'}`}>
            <img src={leftImageSrc} alt={leftSpeakerName} className="character-image" />
          </div>
        )}

        {/* Caixa de Diálogo Central */}
        <div className="dialogue-box">
          <div className="speaker-name-box">
            <p>{currentLine.speaker}</p>
          </div>
          <div className="dialogue-text-box">
            <p>{currentLine.text}</p>
          </div>
          <div className="dialogue-buttons-wrapper">
             {showAdvanceButton && (
            <button onClick={onAdvanceDialogue} className="advance-button">
              Avançar
            </button>
             )}
          </div>
        </div>

        {/* Imagem do Personagem à Direita */}
        {rightImageSrc && (
          <div className={`character-image-container ${activeSpeakerName === rightSpeakerName ? 'active-speaker' : 'inactive-speaker'}`}>
            <img src={rightImageSrc} alt={rightSpeakerName} className="character-image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogueScreen;