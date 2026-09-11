import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ClientDetailPage } from './pages/ClientDetailPage';
import { ClientFormPage } from './pages/ClientFormPage';
import { ClientsPage } from './pages/ClientsPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { ProjectFormPage } from './pages/ProjectFormPage';
import { ProjectsPage } from './pages/ProjectsPage';

export default function App() {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route
				element={
					<ProtectedRoute>
						<Layout />
					</ProtectedRoute>
				}
			>
				<Route path="/" element={<DashboardPage />} />
				<Route path="/clientes" element={<ClientsPage />} />
				<Route path="/clientes/nuevo" element={<ClientFormPage />} />
				<Route path="/clientes/:id" element={<ClientDetailPage />} />
				<Route path="/clientes/:id/editar" element={<ClientFormPage />} />
				<Route path="/proyectos" element={<ProjectsPage />} />
				<Route path="/proyectos/nuevo" element={<ProjectFormPage />} />
				<Route path="/proyectos/:id/editar" element={<ProjectFormPage />} />
			</Route>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}
