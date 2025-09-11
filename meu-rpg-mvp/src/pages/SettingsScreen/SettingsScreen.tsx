import React, { useState } from 'react';
import { useFullscreen } from '../../contexts/FullscreenContext'; // Este é o caminho correto
import './SettingsScreen.css';

interface SettingsScreenProps {
    onGoToMainMenu: () => void;
    onSaveGame: () => void;
    onLoadGame: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onGoToMainMenu, onSaveGame, onLoadGame }) => {
    const { toggleFullScreen } = useFullscreen();
    const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard'>('normal');

    return (
        <div className="settings-screen-container">
            <div className="settings-wrapper">
                <h1 className="settings-title">CONFIGURAÇÕES</h1>

                {/* Seção de Áudio */}
                <div className="settings-section">
                    <h2>Áudio</h2>
                    <div className="setting-option">
                        <label htmlFor="music-volume-slider">Volume da Música</label>
                        <input
                            id="music-volume-slider"
                            type="range"
                            className="audio-slider"
                            title="Volume da Música"
                        />
                    </div>
                    <div className="setting-option">
                        <label htmlFor="effects-volume-slider">Volume de Efeitos</label>
                        <input
                            id="effects-volume-slider"
                            type="range"
                            className="audio-slider"
                            title="Volume de Efeitos"
                        />
                    </div>
                </div>

                {/* Seção de Vídeo */}
                <div className="settings-section">
                    <h2>Vídeo</h2>
                    <div className="setting-option">
                        <span>Tela Cheia</span>
                        <button onClick={toggleFullScreen} className="settings-button">
                            Alternar
                        </button>
                    </div>
                </div>

                {/* Seção de Jogo */}
                <div className="settings-section">
                    <h2>Jogabilidade</h2>
                    <div className="setting-option">
                        <span>Dificuldade</span>
                        <div className="difficulty-buttons">
                            <button
                                className={`difficulty-button ${difficulty === 'easy' ? 'selected' : ''}`}
                                onClick={() => setDifficulty('easy')}
                            >
                                Fácil
                            </button>
                            <button
                                className={`difficulty-button ${difficulty === 'normal' ? 'selected' : ''}`}
                                onClick={() => setDifficulty('normal')}
                            >
                                Normal
                            </button>
                            <button
                                className={`difficulty-button ${difficulty === 'hard' ? 'selected' : ''}`}
                                onClick={() => setDifficulty('hard')}
                            >
                                Difícil
                            </button>
                        </div>
                    </div>
                </div>

                {/* Botões de Ação */}
                <div className="action-buttons-wrapper">
                    <button onClick={onSaveGame} className="settings-button save-button">Salvar Jogo</button>
                    <button onClick={onLoadGame} className="settings-button load-button">Carregar Jogo</button>
                    <button onClick={onGoToMainMenu} className="settings-button back-button">Voltar ao Menu</button>
                </div>
            </div>
        </div>
    );
};

export default SettingsScreen;