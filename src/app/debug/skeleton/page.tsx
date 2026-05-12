// src/app/debug/page.tsx
// Server Component — renderiza DebugTemplate (Client Component)

import { DebugTemplate } from "@/components/templates/DebugTemplate";

export const metadata = {
    title: "V2 Atom Playground",
    description: "Design System Playground para HomeTemplateV2",
};

export default function DebugPage() {
    return <DebugTemplate />;
}