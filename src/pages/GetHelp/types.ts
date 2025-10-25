export type HelpTicket = {
  id: number;
  subject: string;
  description: string;
  submitted_by: string;
  submitted_at: string;
  status: "open" | "in_progress" | "resolved";
  priority: "low" | "medium" | "high";
};
