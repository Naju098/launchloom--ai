const LEADS_KEY = "launchloom-leads";

export function getStoredLeads() {
  try {
    const stored = window.localStorage.getItem(LEADS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveLead(lead) {
  const leads = getStoredLeads();
  const nextLead = {
    ...lead,
    id: crypto.randomUUID(),
    status: "New",
    score: Number(lead.budget?.replace(/\D/g, "")) >= 30000 ? "Hot" : "Warm",
    createdAt: new Date().toISOString(),
  };

  const updatedLeads = [nextLead, ...leads];
  window.localStorage.setItem(LEADS_KEY, JSON.stringify(updatedLeads));
  return updatedLeads;
}

export function updateLeadStatus(id, status) {
  const updatedLeads = getStoredLeads().map((lead) =>
    lead.id === id ? { ...lead, status } : lead,
  );
  window.localStorage.setItem(LEADS_KEY, JSON.stringify(updatedLeads));
  return updatedLeads;
}

export function seedDemoLeads() {
  const existing = getStoredLeads();
  if (existing.length) return existing;

  const demoLeads = [
    {
      id: crypto.randomUUID(),
      name: "Arjun Nair",
      phone: "+91 98765 43210",
      useCase: "Coding and college",
      budget: "₹30,000",
      product: "Dell Latitude 5420",
      status: "Contacted",
      score: "Hot",
      createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    },
    {
      id: crypto.randomUUID(),
      name: "Meera Joseph",
      phone: "+91 91234 56780",
      useCase: "Remote work",
      budget: "₹25,000",
      product: "Lenovo ThinkPad T490",
      status: "New",
      score: "Warm",
      createdAt: new Date(Date.now() - 1000 * 60 * 74).toISOString(),
    },
  ];

  window.localStorage.setItem(LEADS_KEY, JSON.stringify(demoLeads));
  return demoLeads;
}
