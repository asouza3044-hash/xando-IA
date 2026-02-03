import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Orcamentos from '@/pages/Orcamentos';
import NovoOrcamento from '@/pages/NovoOrcamento';
import Clientes from '@/pages/Clientes';
import Calculadora from '@/pages/Calculadora';
import Maquinas from '@/pages/Maquinas';
import Configuracoes from '@/pages/Configuracoes';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orcamentos" element={<Orcamentos />} />
          <Route path="/orcamentos/novo" element={<NovoOrcamento />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/calculadora" element={<Calculadora />} />
          <Route path="/maquinas" element={<Maquinas />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
