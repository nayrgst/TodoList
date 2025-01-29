/**
 * Um array de rotas públicas.
 * Essa rotas não precisam de autenticação.
 * @types {string[]}
 */
export const publicRoutes = ["/"];

/**
 * Um array de autorizaçao de usuário.
 * Essas rotas redirecionam usuários autenticados para /dashboard
 * @types {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

/**
 * O prefixo para as rotas de autenticação da API
 * Rotas que começam com esse prefixo são usadas para processos de autenticação via API
 * Exemplos: login, logout, verificação de sessão, etc.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * O caminho padrão de redirecionamento após o login
 * Após fazer login, o usuário será automaticamente redirecionado para essa página
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
