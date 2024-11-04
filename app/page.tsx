"use client";

import { Container, Title } from "@/components/shared";
import Pagination from "@/components/shared/pagination/pagination";
import Button from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";
import { Select } from "@/components/ui/select/select";
import { useEffect, useState } from "react";

interface IFields {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  options?: string[];
  errorCondition?: (value: string) => boolean;
  errorMessage?: string;
  multiline?: boolean;
}
const initialFields = [
  {
    id: "projectName",
    name: "Название проекта",
    label: "Название проекта",
    placeholder: "Название проекта",
    value: "",
    multiline: false,
    errorCondition: (value: string) => !value.trim(),
    errorMessage: "Заполните поле",
  },
  {
    id: "country",
    name: "Страна-производитель (копродукция)",
    label: "Страна-производитель (копродукция)",
    placeholder: "Страна",
    value: "",
    options: [
      "Россия",
      "США",
      "Канада",
      "Германия",
      "Франция",
      "Великобритания",
      "Италия",
      "Испания",
      "Китай",
      "Япония",
      "Южная Корея",
      "Австралия",
      "Индия",
      "Бразилия",
      "Мексика",
    ],
    errorCondition: (value: string) => !value.trim(),
    errorMessage: "Заполните поле",
  },

  {
    id: "genre",
    name: "Жанр",
    label: "Жанр",
    placeholder: "Жанр",
    value: "",
    options: [
      "🎭 Драма",
      "😂 Комедия",
      "🏴‍☠️ Приключения",
      "🧚‍♂️ Фэнтези",
      "👻 Ужасы",
      "🔪 Триллер",
      "🎨 Анимация",
    ],
    errorCondition: (value: string) => !value.trim(),
    errorMessage: "Заполните поле",
  },
  {
    id: "cost",
    name: "Сведения о сметной стоимости производства фильма на территории Нижегородской области, если есть",
    label:
      "Сведения о сметной стоимости производства фильма на территории Нижегородской области, если есть",
    placeholder: "Сметная стоимость",
    value: "",
    multiline: false,
  },
  {
    id: "format",
    name: "Формат",
    label:
      "Формат (для онлайн-платформы, большого экрана, интерактивная, другое)",
    placeholder: "Формат",
    value: "",
    options: ["Онлайн-платформа", "Большой экран", "Интерактивная", "Другое"],
    errorCondition: (value: string) => !value.trim(),
    errorMessage: "Заполните поле",
  },
  {
    id: "synopsis",
    name: "Синопсис",
    label: "Синопсис",
    placeholder: "Напишите краткое изложение",
    value: "",
    multiline: true,
  },
  {
    id: "unfNumber",
    name: "Номер УНФ или отсутствует",
    label: "Номер УНФ или отсутствует",
    placeholder: "890-000-000-000",
    value: "",
    multiline: false,
  },
];
export default function Home() {
  const [reset, setReset] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [fields, setFields] = useState(() => {
    let savedFields: string | undefined = '';
    if (typeof window !== "undefined") {
      savedFields = localStorage.getItem("fields") || undefined;
    }

    if (savedFields) {
      const parsedFields = JSON.parse(savedFields);

      return parsedFields.map((savedField: (typeof initialFields)[number]) => {
        const initialField = initialFields.find(
          (field) => field.id === savedField.id,
        );
        return {
          ...savedField,
          errorCondition: initialField?.errorCondition,
          errorMessage: initialField?.errorMessage,
        };
      });
    }

    return initialFields;
  });

  const resetForm = () => {
    setFields((prevFields: typeof fields) => {
      return prevFields.map((field: (typeof fields)[number]) => ({
        ...field,
        value: "",
      }));
    });
    setReset(true);
  };

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    localStorage.setItem("fields", JSON.stringify(fields));
    const hasError = fields.some((field: (typeof fields)[number]) => {
      if (field.errorCondition) {
        return field.value.trim() === "" && field.errorCondition(field.value);
      }
      return false;
    });
    setIsButtonDisabled(hasError);
  }, [fields]);

  const handleValueChange = (id: string, value: string) => {
    setFields((prevFields: typeof fields) => {
      return prevFields.map((field: (typeof fields)[number]) =>
        field.id === id ? { ...field, value } : field,
      );
    });
  };

  const nextStep = () => {
    let result = {};
    fields.map((field: (typeof fields)[number]) => {
      result = { ...result, [field.id]: field.value };
    });
    console.log(result);
    return localStorage.setItem("fields", JSON.stringify(fields));
  };

  return (
    <div className="wrapper">
      <div className="form">
        <Container>
          <div className="form__top">
            <div className="form__top-title">
              <Title size="xl" text="Производственные параметры фильма"></Title>
            </div>
            <div>
              <Button variant="outline" onClick={resetForm}>
                Отменить заполнение
              </Button>
            </div>
          </div>

          <div className="form__body">
            {fields.map((field) =>
              field.options ? (
                <Select
                  key={field.id}
                  id={field.id}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={field.value}
                  options={field.options}
                  errorCondition={field.errorCondition}
                  errorMessage={field.errorMessage}
                  onValueChange={(value) => handleValueChange(field.id, value)}
                  reset={reset}
                />
              ) : (
                <Input
                  className={`form__body-input ${field.id === "synopsis" && "form__body-input--multiline"}`}
                  key={field.id}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={field.value}
                  multiline={field.multiline}
                  onValueChange={(value) => handleValueChange(field.id, value)}
                  errorCondition={field.errorCondition}
                  errorMessage={field.errorMessage}
                  reset={reset}
                />
              ),
            )}
          </div>

          <div className="form__bottom">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            ></Pagination>
            <div>
              <Button
                variant="outline"
                onClick={nextStep}
                disabled={isButtonDisabled}
              >
                <span>Следующий шаг</span>
                <svg
                  width="19"
                  height="16"
                  viewBox="0 0 19 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.13385 7.99999L17.2294 7.99999M17.2294 7.99999L10.3313 1.11252M17.2294 7.99999L10.3313 14.8875"
                    stroke="#ACACAC"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
