"use strict";Object.defineProperty(exports, "__esModule", {value: true}); async function gerarPalavra() {
  const letrasNumericas = "abcdefghijklmnopqrstuvwxyz0123456789";
  let palavra = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * letrasNumericas.length);
    palavra += letrasNumericas[randomIndex];
  }

  return palavra;
} exports.gerarPalavra = gerarPalavra;
