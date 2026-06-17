'use client';

import { useState } from 'react';
import { manutencaoService } from '@/services/manutencaoService';

export default function ManutencaoPage() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [statusMensagem, setStatusMensagem] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatusMensagem('A enviar...');
        
        try {
            await manutencaoService.criarSolicitacao(titulo, descricao);
            setStatusMensagem('Solicitação registada com sucesso!');
            setTitulo('');
            setDescricao('');
        } catch (error) {
            setStatusMensagem('Erro ao registar a solicitação. Tente novamente.');
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-black font-['Inter'] flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md bg-white p-8 border border-gray-200 shadow-sm">
                <h1 className="text-2xl font-semibold mb-6 tracking-tight">Manutenção de Software</h1>
                
                {statusMensagem && (
                    <div className="mb-6 p-3 bg-gray-50 border border-gray-200 text-sm">
                        {statusMensagem}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="titulo" className="text-sm font-medium">
                            Título do Chamado
                        </label>
                        <input
                            id="titulo"
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            className="border border-gray-300 p-2 outline-none focus:border-black transition-colors"
                            placeholder="Ex: Falha na listagem de sessões"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="descricao" className="text-sm font-medium">
                            Descrição do Problema
                        </label>
                        <textarea
                            id="descricao"
                            rows={5}
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className="border border-gray-300 p-2 outline-none focus:border-black transition-colors resize-none"
                            placeholder="Descreva o que aconteceu..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 bg-black text-white py-2.5 px-4 hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                        Abrir Solicitação
                    </button>
                </form>
            </div>
        </div>
    );
}