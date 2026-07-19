import { demoBrandOutput } from "../data/demoData";

const wait = (milliseconds) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

/**
 * Generates a complete brand package.
 *
 * The current implementation returns deterministic demo content so the app
 * works without an API. Later, replace the demo branch with a request to a
 * secure backend endpoint that calls Kimi. Do not expose a Kimi API key in
 * browser code.
 */
export async function generateBrandPackage(formData) {
  await wait(1400);

  const location = formData.location?.trim() || "Kochi, Kerala";
  const businessType = formData.businessType?.trim() || "Used laptop store";
  const promise = formData.mainPromise?.trim();

  return {
    ...demoBrandOutput,
    brandName:
      businessType.toLowerCase().includes("laptop")
        ? demoBrandOutput.brandName
        : `${businessType.split(" ")[0]} Loom`,
    tagline: promise || demoBrandOutput.tagline,
    positioning: `${demoBrandOutput.positioning} The initial launch market is ${location}.`,
    generatedAt: new Date().toISOString(),
    sourceInput: formData,
  };

  /*
  // Kimi-ready example:
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/generate-brand`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) throw new Error("Brand generation failed");
  return response.json();
  */
}
