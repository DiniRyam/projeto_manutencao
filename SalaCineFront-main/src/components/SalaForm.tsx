"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { createSala } from "@/services/salaService";
import { toast } from "react-toastify";
import FloatingLabelInput from "./FloatingLabelInput";
import CustomButton from "./CustomButton";
import { Plus, Ban } from "lucide-react";

interface SalaFormProps {
  onSuccess?: () => void;
}

const validationSchema = Yup.object().shape({
  numero_sala: Yup.number()
    .integer("O número da sala deve ser um inteiro")
    .min(1, "O número da sala deve ser pelo menos 1")
    .required("O número da sala é obrigatório"),
  local: Yup.string()
    .max(100, "A localização deve ter no máximo 100 caracteres")
    .required("A localização é obrigatória"),
  capacidade: Yup.number()
    .integer("A capacidade deve ser um número inteiro")
    .min(1, "A capacidade mínima é de 1 lugar")
    .required("A capacidade é obrigatória"),
  tipo_tela: Yup.string()
    .required("O tipo de tela é obrigatório"),
});

export default function SalaForm({ onSuccess }: Readonly<SalaFormProps>) {
  const formik = useFormik({
    initialValues: {
      numero_sala: "",
      local: "",
      capacidade: "",
      tipo_tela: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const dataToSend = {
          ...values,
          numero_sala: Number(values.numero_sala),
          capacidade: Number(values.capacidade),
        };
        const salaCriada = await createSala(dataToSend);
        toast.success(
          `Sala ${salaCriada.numero_sala} cadastrada! ID: ${salaCriada.id_sala}`
        );
        resetForm();
        onSuccess?.();
      } catch (error) {
        console.error("Erro ao criar sala:", error);
        toast.error("Falha ao cadastrar sala");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="w-[750px] mx-auto px-5 pb-5 flex flex-col gap-10"
      style={{ paddingTop: "0px" }}
    >
      <div className="text-center">
        <h2 className="text-2xl">Adicionar Sala</h2>
        <h3 className="text-[#969696] text-lg">
          Adicione uma nova sala ao cinema
        </h3>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex gap-5">
          <div className="flex-1">
            <FloatingLabelInput
              id="numero_sala"
              name="numero_sala"
              label="Número da Sala"
              type="number"
              value={formik.values.numero_sala || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.numero_sala}
              error={formik.errors.numero_sala}
              min={1}
            />
          </div>
          <div className="flex-1">
            <FloatingLabelInput
              id="capacidade"
              name="capacidade"
              label="Capacidade (Nº de Assentos)"
              type="number"
              value={formik.values.capacidade || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.capacidade }
              error={formik.errors.capacidade}
              min={1}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex-1">
            <FloatingLabelInput
              id="local"
              name="local"
              label="Localização (Ex: Piso 1)"
              value={formik.values.local}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.local}
              error={formik.errors.local}
            />
          </div>
          <div className="flex-1">
            <FloatingLabelInput
              id="tipo_tela"
              name="tipo_tela"
              label="Tipo de Tela (Ex: 2D, 3D, IMAX)"
              type="select"
              value={formik.values.tipo_tela}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              touched={formik.touched.tipo_tela}
              error={formik.errors.tipo_tela}
              options={[
                { value: "", label: "Selecione a tecnologia" },
                { value: "2D", label: "Padrão 2D" },
                { value: "3D", label: "Projeção 3D" },
                { value: "IMAX", label: "IMAX" },
                { value: "XD", label: "Extreme Digital (XD)" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        <CustomButton
          type="button"
          label="Cancelar Ação"
          icon={<Ban size={18} />}
          variant="danger"
          className="flex-1"
          onClick={() => formik.resetForm()}
        />
        <CustomButton
          type="submit"
          label="Criar Sala"
          icon={<Plus size={18} />}
          variant="default"
          className="flex-1"
        />
      </div>
    </form>
  );
}