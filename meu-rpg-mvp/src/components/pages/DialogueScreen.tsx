import React from 'react';
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

  const currentLine = dialogueData[currentDialogueIndex];
  const activeSpeakerName = currentLine.speaker;

  const leftSpeakerName = Object.keys(characterImages)[0];
  const rightSpeakerName = Object.keys(characterImages)[1];

  const leftImageSrc = characterImages[leftSpeakerName];
  const rightImageSrc = characterImages[rightSpeakerName];

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
            <button onClick={onAdvanceDialogue} className="advance-button">
              Avançar
            </button>
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