import type { Produto } from '../models';

// ➜ PARA ADICIONAR A FOTO DE OUTRO PRODUTO:
// 1) coloque o arquivo em public/img/   2) adicione uma linha aqui:  id do produto: 'nome-do-arquivo.jpg'
// (use uma URL completa, tipo 'https://...', se preferir imagem externa)
export const IMAGENS: Record<string, string> = {
  p1: 'sup-notebook-husky.jpg',
  // p2: 'suporte-vertical.jpg',
  p3: 'mp-dragon.jpg',
  // p4: 'deskmat-couro.jpg',
  // p5: 'cabos-magnetico.jpg',
  // p6: 'calha-cabos.jpg',
  // p7: 'luminaria-arco.jpg',
  // p8: 'light-bar.jpg',
};

export const PRODUTOS_INICIAIS: Produto[] = [
  { id: 'p1', nome: 'Suporte para Notebook Husky', categoria: 'suporte', preco: 35.5, quantidade: 18,
    descricao: 'Eleva o notebook à altura dos olhos e libera espaço na mesa. Estrutura única em alumínio.',
    specs: ['Alumínio', 'Notebooks de 11" a 17"', '6 níveis de altura'] },
  { id: 'p2', nome: 'Suporte Vertical Dock', categoria: 'suporte', preco: 189.9, quantidade: 12,
    descricao: 'Guarda o notebook em pé, fechado, ao lado do monitor. Visual limpo e ventilação perfeita.',
    specs: ['Alumínio escovado', 'Base antiderrapante', 'Ajuste de largura'] },
  { id: 'p3', nome: 'Mousepad Gamer Grande 90x40 Speed', categoria: 'mousepad', preco: 65.9, quantidade: 30,
    descricao: 'Cobre teclado e mouse com uma superfície rápida, ideal para você que quer uma deslizada rapida no mousepad em FPS.',
    specs: ['900 × 400 mm', 'Base de borracha antiderrapante', 'Costura anti-desgaste'] },
  { id: 'p4', nome: 'Desk Mat Couro Vegano', categoria: 'mousepad', preco: 159.9, quantidade: 4,
    descricao: 'Superfície dupla face: couro vegano de um lado, microfibra do outro.',
    specs: ['800 × 400 mm', 'Resistente a líquidos', 'Dupla face'] },
  { id: 'p5', nome: 'Organizador de Cabos Magnético', categoria: 'cabos', preco: 59.9, quantidade: 50,
    descricao: 'Clipes magnéticos que prendem cabos na borda da mesa e não deixam eles caírem.',
    specs: ['Kit com 6 clipes', 'Silicone + imã de neodímio', 'Para cabos de até 8 mm'] },
  { id: 'p6', nome: 'Calha Organizadora Sob a Mesa', categoria: 'cabos', preco: 89.9, quantidade: 22,
    descricao: 'Esconde filtros de linha e fontes sob o tampo. Fixação sem furar a mesa.',
    specs: ['Aço pintado', 'Cabe filtro de 6 tomadas', 'Fixação adesiva ou parafuso'] },
  { id: 'p7', nome: 'Luminária LED RGB Arco', categoria: 'luminaria', preco: 199.9, quantidade: 9,
    descricao: 'Luz ambiente com 16 milhões de cores e controle por toque. Dá vida à parede atrás do setup.',
    specs: ['16 milhões de cores', 'Alimentação USB-C', 'Controle por toque'] },
  { id: 'p8', nome: 'Monitor Light Bar RGB', categoria: 'luminaria', preco: 279.9, quantidade: 0,
    descricao: 'Ilumina a mesa sem reflexo na tela e ainda traz luz RGB na parte de trás.',
    specs: ['Sem reflexo na tela', 'Luz traseira RGB', 'Encaixe universal'] },
];
