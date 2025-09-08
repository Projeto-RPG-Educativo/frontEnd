import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './InventoryScreen.css';

// Dados de exemplo de itens (isso será substituído por dados dinâmicos do jogador)
const sampleItems = [
  { id: 1, name: 'Espada de Madeira', image: 'https://via.placeholder.com/64/a1887f/ffffff?text=Espada', description: 'Uma espada simples de madeira.' },
  { id: 2, name: 'Poção de Cura', image: 'https://via.placeholder.com/64/ef5350/ffffff?text=Poção', description: 'Restaura um pouco da sua vida.' },
  { id: 3, name: 'Escudo de Ferro', image: 'https://via.placeholder.com/64/757575/ffffff?text=Escudo', description: 'Um escudo robusto para defesa.' },
  { id: 4, name: 'Anel Mágico', image: 'https://via.placeholder.com/64/42a5f5/ffffff?text=Anel', description: 'Concede uma pequena vantagem mágica.' },
  { id: 5, name: 'Adaga Enferrujada', image: 'https://via.placeholder.com/64/8d6e63/ffffff?text=Adaga', description: 'Uma adaga velha e ineficaz.' },
];

interface InventoryScreenProps {
  onGoToMainMenu: () => void;
}

const InventoryScreen: React.FC<InventoryScreenProps> = ({ onGoToMainMenu }) => {
  // Lógica para detectar o clique na tecla 'I' e fechar o inventário
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'i' || event.key === 'I') {
        onGoToMainMenu();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onGoToMainMenu]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="inventory-screen"
    >
      <div className="inventory-header">
        <h1>Inventário</h1>
        <button className="inventory-close-button" onClick={onGoToMainMenu}>X</button>
      </div>
      <div className="inventory-grid">
        {sampleItems.map(item => (
          <div key={item.id} className="inventory-item">
            <img src={item.image} alt={item.name} className="item-image" />
            <span className="item-name">{item.name}</span>
          </div>
        ))}
      </div>
      <div className="inventory-description">
        {/* Aqui você pode exibir a descrição do item selecionado */}
        <p>Clique em um item para ver sua descrição.</p>
      </div>
    </motion.div>
  );
};

export default InventoryScreen;
