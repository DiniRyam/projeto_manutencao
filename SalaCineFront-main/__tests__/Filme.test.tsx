import { render, screen, waitFor } from '@testing-library/react';
import FilmePage from '../src/app/filme/page';

// 1. Simula o roteador do Next.js
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn()
    };
  },
}));

// 2. A GRANDE JOGADA: Simula o seu arquivo de serviço diretamente!
// Ajuste o caminho abaixo se a pasta 'services' estiver em outro lugar
jest.mock('../src/services/filmeService', () => ({
  getFilmes: jest.fn(() => Promise.resolve([
    // Devolvemos um filme falso no exato formato que a sua página espera
    { id: 1, titulo: "Filme Teste CI/CD", duracao: 120, classificacao: 12, diretor: "Diretor Teste", generos: ["Ação"] }
  ]))
}));

describe('Happy Path - Tela Principal de Filmes', () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve montar a página e renderizar a estrutura da lista de filmes com sucesso', async () => {
    
    // 3. Executa a renderização completa da página
    render(<FilmePage />);
    
    // 4. Aguarda a interface carregar e procura pela palavra "Filme" 
    await waitFor(() => {
      const elementos = screen.getAllByText(/Filme/i);
      expect(elementos[0]).toBeInTheDocument();
    });
    
  });
});