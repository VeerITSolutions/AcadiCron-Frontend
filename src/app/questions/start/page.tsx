"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Questions from "@/components/questions";
import { categoryOptions, difficultyOptions } from "@/constants";

const fetchData = async (
  category: string,
  difficulty: string,
  limit: string,
) => {
  try {
    const res = await fetch(
      `https://the-trivia-api.com/api/questions?categories=${category}&limit=${limit}&type=multiple&difficulty=${difficulty}`,
      {
        method: "GET",
        headers: { "Cache-Control": "no-cache" },
      },
    );

    if (!res.ok) throw new Error("Failed to fetch data!");

    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const QuestionsPage = () => {
  const searchParams = useSearchParams();
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);

  const category = searchParams?.get("category") || "";
  const difficulty = searchParams?.get("difficulty") || "";
  const limit = searchParams?.get("limit") || "10";

  // Validation Functions
  const validateCategory = (category: string) =>
    categoryOptions.some((option) => option.value === category);

  const validateDifficulty = (difficulty: string) =>
    difficultyOptions.some((option) => option.value === difficulty);

  const validateLimit = (limit: string) => {
    const parsedLimit = parseInt(limit, 10);
    return !isNaN(parsedLimit) && parsedLimit >= 5 && parsedLimit <= 50;
  };

  useEffect(() => {
    if (
      !validateCategory(category) ||
      !validateDifficulty(difficulty) ||
      !validateLimit(limit)
    ) {
      setQuestions(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchData(category, difficulty, limit)
      .then((data) => setQuestions(data))
      .catch(() => setQuestions(null))
      .finally(() => setLoading(false));
  }, [category, difficulty, limit]);

  if (loading) return <p>Loading...</p>;
  if (!questions) return <p>No questions found!</p>;

  return (
    <Questions
      questions={questions}
      limit={parseInt(limit, 10)}
      category={category}
    />
  );
};

export default QuestionsPage;
