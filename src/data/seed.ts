import type { Produto } from '../models';

// ➜ PARA ADICIONAR A FOTO DE OUTRO PRODUTO:
// 1) coloque o arquivo em public/img/   2) adicione uma linha aqui:  id do produto: 'nome-do-arquivo.jpg'
// (use uma URL completa, tipo 'https://...', para imagem baixada -> /public/img)

export const IMAGENS: Record<string, string> = {
  p1: 'sup-notebook-husky.jpg',
  p2: 'sup-vertical1.jpg',
  p3: 'mp-dragon.jpg',
  p4: 'desk-mat1.jpg',
  p5: 'cable-management1.jpg',
  p6: 'teclado-husky.jpg',
  p7: 'luminaria-barra1.avif',
  p8: 'teclado-wooting.jpg',
};

export const PRODUTOS_INICIAIS: Produto[] = [
  { id: 'p1', nome: 'Suporte para Notebook Husky', categoria: 'suporte', preco: 35.5, quantidade: 18,
    descricao: 'Eleva o notebook à altura dos olhos e libera espaço na mesa. Estrutura única em alumínio.',
    specs: ['Alumínio', 'Notebooks de 11" a 17"', '6 níveis de altura'] },
  { id: 'p2', nome: 'Suporte Vertical UGREEN', categoria: 'suporte', preco: 189.9, quantidade: 12,
    descricao: 'Suporte vertical para notebook UGREEN de alumínio, compatível com MacBook Pro, MacBook Air, para mesa, ajustável, para notebook de jogos de até 17,3 polegadas, preto, Guarda o notebook em pé, fechado. ',
    specs: ['Alumínio escovado', 'Ajuste de largura'] },
  { id: 'p3', nome: 'Mousepad Gamer Grande 90x40 Speed', categoria: 'mousepad', preco: 65.9, quantidade: 30,
    descricao: 'Cobre teclado e mouse com uma superfície rápida, ideal para você que quer uma deslizada rapida no mousepad em FPS.',
    specs: ['900 × 400 mm', 'Base de borracha antiderrapante', 'Costura anti-desgaste'] },
  { id: 'p4', nome: 'Desk Mat DAWNTREES 35.5 x 15.8', categoria: 'mousepad', preco: 159.9, quantidade: 4,
    descricao: 'Superfície dupla face: couro vegano de um lado, microfibra do outro.',
    specs: ['800 × 400 mm', 'Resistente a líquidos', 'Dupla face'] },
  { id: 'p5', nome: 'Organizador de Cabos Magnético Baseus', categoria: 'cabos', preco: 59.9, quantidade: 50,
    descricao: 'Clipes magnéticos que prendem cabos na borda da mesa e não deixam eles caírem, perfeito para organização do seu setup.',
    specs: ['Kit com 6 clipes', 'Silicone + imã de neodímio', 'Para cabos de até 8 mm'] },
  { id: 'p6', nome: 'Teclado Mecânico Husky Anchorage', categoria: 'teclado', preco: 159.9, quantidade: 22,
    descricao: 'Teclado Mecanico Husky com Switch RED Gateron',
    specs: ['Cor: Preto', 'Layout ABNT2', '104 Teclas + Multimidia', 'Cabo trançado em nylon'] },
  { id: 'p7', nome: 'Quntis RGB Luminaria Barra para Monitor, Iluminação Dupla e 24 Modos RGB | Light Bar 40cm', categoria: 'luminaria', preco: 199.9, quantidade: 9,
    descricao: 'Iluminação Dupla Frontal e Traseira: A Quntis Monitor Light Bar apresenta um sistema de iluminação frontal e traseira integrado, reduzindo reflexos e ofuscamento causados pelo contraste da tela e proporcionando uma iluminação mais uniforme e equilibrada. A luz frontal ilumina a área da mesa para melhorar o foco durante o trabalho, enquanto a iluminação traseira cria um efeito ambiente dinâmico ideal para jogos',
    specs: ['16 milhões de cores', 'Alimentação USB-C', 'Controle por toque'] },
  { id: 'p8', nome: 'Teclado Mecânico Gamer Wooting60HE 60% ', categoria:'teclado', preco:960.9, quantidade:2,
    descricao: 'Wooting60HE 60%, USB-C, RGB, 60 teclas, Função Rapid Trigger, Ponto de ação ajustável, DKS, Takion Mode, Mod Tap, N-key Rollover',
    specs: ['60% Prático', 'USB-C', 'Melhor do mercado', 'Função Rapid Trigger']
  }
];


/*
CATEGORIAS ATUAIS DO SITE -> models.ts (mexer ou alterar depois -- vinicius)
*/