export async function fetchList<T>(url: string): Promise<T[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Falha ao carregar dados (${response.status})`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) {
    throw new Error("Resposta inválida da API");
  }
  return data as T[];
}

export async function sendRequest(
  url: string,
  method: "POST" | "PATCH" | "DELETE",
  body?: unknown
): Promise<void> {
  const hasBody = body !== undefined;
  const response = await fetch(url, {
    method,
    headers: hasBody ? { "Content-Type": "application/json" } : undefined,
    body: hasBody ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    throw new Error(`Falha na operação (${response.status})`);
  }
}
