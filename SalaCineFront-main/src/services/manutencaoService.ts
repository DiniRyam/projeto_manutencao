const API_URL = 'http://127.0.0.1:5000/api';

export const manutencaoService = {
    criarSolicitacao: async (titulo: string, descricao: string) => {
        const response = await fetch(`${API_URL}/manutencao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo, descricao })
        });

        if (!response.ok) {
            throw new Error('Erro ao criar solicitação de manutenção');
        }

        return response.json();
    }
};