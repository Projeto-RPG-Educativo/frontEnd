import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import './CodexScreen.css';

interface CodexEntry {
    id: number;
    title: string;
    content: string;
}

// Dados de exemplo para o códex
const sampleCodexEntries: CodexEntry[] = [
    {
        id: 1,
        title: 'O Reino da Gramática',
        content: 'O reino da gramática é um lugar mágico onde as palavras têm poder. Cuidado com o Goblin da Gramática, ele protege o reino com unhas e dentes.',
    },
    {
        id: 2,
        title: 'O Goblin da Gramática',
        content: 'Uma criatura traiçoeira que usa seu conhecimento da gramática para atacar seus inimigos. Ele é conhecido por fazer perguntas complicadas e atacar quando a resposta está errada.',
    },
    {
        id: 3,
        title: 'A História dos Heróis',
        content: 'Muitos heróis tentaram derrotar o Goblin da Gramática, mas poucos conseguiram. Apenas os mais inteligentes e corajosos têm alguma chance.',
    },
];

interface CodexScreenProps {
    onClose: () => void;
}

const CodexScreen: React.FC<CodexScreenProps> = ({ onClose }) => {
    const [selectedEntry, setSelectedEntry] = useState<CodexEntry | null>(sampleCodexEntries[0]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="codex-screen"
        >
            <div className="codex-header">
                <h1>Códex</h1>
                <button className="codex-close-button" onClick={onClose}>X</button>
            </div>
            <div className="codex-content">
                <div className="codex-sidebar">
                    {sampleCodexEntries.map(entry => (
                        <button
                            key={entry.id}
                            className={`codex-entry-button ${selectedEntry?.id === entry.id ? 'active' : ''}`}
                            onClick={() => setSelectedEntry(entry)}
                        >
                            {entry.title}
                        </button>
                    ))}
                </div>
                <div className="codex-main">
                    {selectedEntry && (
                        <>
                            <h2>{selectedEntry.title}</h2>
                            <p>{selectedEntry.content}</p>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default CodexScreen;
