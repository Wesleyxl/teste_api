export async function gerarPalavra(): Promise<string> {
  const letrasNumericas = "abcdefghijklmnopqrstuvwxyz0123456789";
  let palavra = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * letrasNumericas.length);
    palavra += letrasNumericas[randomIndex];
  }

  return palavra;
}
