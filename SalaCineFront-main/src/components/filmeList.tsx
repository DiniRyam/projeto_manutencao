"use client";

import { useEffect, useState } from "react";
import { Filme } from "@/types/Filme";
import {getFilmes,deleteFilme,getFilmeById,
} from "@/services/filmeService";
import { Table } from "@/components/Table";
import FilmeForm from "./FilmeForm";
import { toast } from "react-toastify";
import { Trash, Pencil } from "lucide-react";

export default function SalaList() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [loading, setLoading] = useState(true);
  const [filmeParaEditar, setFilmeParaEditar] = useState<Filme | null>(null);

  // Estado da busca
  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    fetchFilmes();
  }, []);

  const fetchFilmes = async () => {
    try {
      const filmesData = await getFilmes();
      setFilmes(filmesData);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este filme?")) {
      return;
    }

    try {
      await deleteFilme(id.toString());
      await fetchFilmes();

      if (filmeParaEditar?.id_filme === id) {
        setFilmeParaEditar(null);
      }

      toast.success("Filme excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir filme:", error);
      toast.error("Erro ao excluir filme.");
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const filme = await getFilmeById(id);
      setFilmeParaEditar(filme);
    } catch (error) {
      console.error("Erro ao buscar filme:", error);
      toast.error("Falha ao carregar filme para edição");
    }
  };

  const handleSuccess = () => {
    setFilmeParaEditar(null);
    fetchFilmes();
  };

  // Lista filtrada pela busca
  const filmesFiltrados = filmes.filter((filme) =>
    (filme.titulo ?? "")
      .toLowerCase()
      .includes(termoBusca.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-4 text-center">
        Carregando filmes...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 font-['Inter'] text-black bg-[#FAF9F6]">
      <FilmeForm
        filmeParaEditar={filmeParaEditar ?? undefined}
        onSuccess={handleSuccess}
        onCancel={() => setFilmeParaEditar(null)}
      />

      {/* Barra de Busca */}
      <div className="w-full max-w-md mx-auto px-5 -mb-8">
        <input
          type="text"
          placeholder="Buscar filme por título..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          className="w-full border border-gray-300 bg-white p-3 outline-none focus:border-black transition-colors"
        />
      </div>

      {filmes.length === 0 ? (
        <div className="p-4 text-center">
          Nenhum filme encontrado.
        </div>
      ) : (
        <>
          <Table.Root>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Título</Table.HeaderCell>
                <Table.HeaderCell>Diretor</Table.HeaderCell>
                <Table.HeaderCell>Classificação</Table.HeaderCell>
                <Table.HeaderCell>Duração</Table.HeaderCell>
                <Table.HeaderCell>Ações</Table.HeaderCell>
              </Table.Row>
            </Table.Head>

            <Table.Body>
              {filmesFiltrados.map((filme) => (
                <Table.Row
                  key={filme.id_filme}
                  cellsContent={[
                    filme.titulo,
                    filme.diretor,
                    filme.classificacao,
                    filme.duracao,
                    <div
                      key={filme.id_filme}
                      className="flex gap-6"
                    >
                      <button
                        onClick={() => {
                          if (filme.id_filme) {
                            handleDelete(filme.id_filme);
                          }
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Excluir"
                      >
                        <Trash size={18} />
                      </button>

                      <button
                        onClick={() => {
                          if (filme.id_filme) {
                            handleEdit(filme.id_filme);
                          }
                        }}
                        className="text-[#FF9809] hover:text-orange-600 transition-colors"
                        title="Editar"
                      >
                        <Pencil size={18} />
                      </button>
                    </div>,
                  ]}
                />
              ))}
            </Table.Body>
          </Table.Root>

          {filmesFiltrados.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              Nenhum filme corresponde à sua busca.
            </div>
          )}
        </>
      )}
    </div>
  );
}