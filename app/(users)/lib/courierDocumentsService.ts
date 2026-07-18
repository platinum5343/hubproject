// Client-side service for courier document endpoints.
// All calls go through Next.js proxy routes under /api.

import { ApiResult } from "./authService";

export interface CourierDocUploadPayload {
  document_type: string;
  // file is sent as multipart/form-data
}

function parseBackendError(data: any): string {
  if (!data) return "Something went wrong. Please try again.";
  if (typeof data.detail === "string") return data.detail;
  if (typeof data === "object") {
    const messages: string[] = [];
    for (const [field, errors] of Object.entries(data)) {
      const label = field === "non_field_errors" ? "" : `${field}: `;
      if (Array.isArray(errors)) {
        messages.push(`${label}${errors.join(" ")}`);
      } else if (typeof errors === "string") {
        messages.push(`${label}${errors}`);
      }
    }
    if (messages.length) return messages.join("\n");
  }
  return "Something went wrong. Please try again.";
}

async function callMultipart(
  endpoint: string,
  token: string,
  form: FormData,
): Promise<ApiResult> {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    });

    let data: unknown;
    try {
      data = await res.json();
    } catch {
      data = { detail: "Invalid response from server" };
    }

    return { ok: res.ok, data: data as any };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return { ok: false, data: { detail: message } };
  }
}

export async function uploadCourierDocument(opts: {
  token: string;
  documentType: string;
  file: File;
}): Promise<ApiResult> {
  const { token, documentType, file } = opts;

  const form = new FormData();
  form.append("document_type", documentType);
  // backend expects actual document file in a field named "file" or similar.
  // If your backend uses a different field name, update this.
  form.append("file", file);

  return callMultipart("/api/user/courier/documents/upload", token, form);
}

export async function fetchCourierDocumentsStatus(opts: {
  token: string;
}): Promise<ApiResult> {
  const { token } = opts;
  try {
    const res = await fetch("/api/user/courier/documents", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let data: unknown;
    try {
      data = await res.json();
    } catch {
      data = { detail: "Invalid response from server" };
    }

    return { ok: res.ok, data: data as any };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return { ok: false, data: { detail: parseBackendError(message) } };
  }
}

