---
name: Bug na API / Banco de Dados (Back-end)
about: Relato estruturado de falhas lógicas no Flask, Pytest ou Supabase.
title: ''
labels: ''
assignees: ''

---

##  Checklist de Triagem
- [ ] O erro ocorre mesmo com o banco de dados online.
- [ ] Confirmei que o erro persiste após rodar `pip install -r requirements.txt`.

##  Descrição da Falha
Explique a falha lógica, de cálculo ou de integração que ocorreu no servidor.

##  Rota Afetada
- **Método:** `GET` / `POST` / `PUT` / `DELETE`
- **Endpoint:** `/api/...`

##  Payload da Requisição
Se a requisição enviou dados para a API, cole-os no formato JSON abaixo:

```json
{
  "filme_id": 1,
  "sala_id": 2,
  "data_hora": "2026-06-23T14:00:00.000Z"
}
