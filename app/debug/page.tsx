// app/debug/page.tsx
// Test individual de componentes

import { Button } from "@/components/atoms/Button";
import { Card } from "@/components/molecules/Card";
import { Header } from "@/components/organisms/Header";
import { HomeTemplate } from "@/components/templates/HomeTemplate";

export default function DebugPage() {
    return (
        <div className="p-10 space-y-10">
            <h1>Debug de Componentes</h1>

            {/* Test 1: Átomo */}
            <section>
                <h2>1. Button (Átomo)</h2>
                <Button variant="primary" size="md">Test Button</Button>
            </section>

            {/* Test 2: Molécula */}
            <section>
                <h2>2. Card (Molécula)</h2>
                <Card variant="surface" padding="md">
                    <p>Contenido de prueba</p>
                </Card>
            </section>

            {/* Test 3: Organismo */}
            <section>
                <h2>3. Header (Organismo)</h2>
                <Header
                    navItems={[{ id: "test", label: "Test", href: "/test" }]}
                    cartCount={0}
                />
            </section>

            {/* Test 4: Template completo */}
            <section>
                <h2>4. HomeTemplate (Template)</h2>
                <p>Ver página principal para test completo</p>
            </section>
        </div>
    );
}