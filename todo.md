# Sound Designer Portfolio - TODO

## Funcionalidades Planejadas

### Banco de Dados
- [x] Criar schema PostgreSQL para Projetos (title, description, link, type, tags)
- [x] Criar schema PostgreSQL para Conteúdo (about_me, metrics)
- [x] Executar migrações do Drizzle

### Frontend - Estrutura Base
- [x] Criar componente Hero (foto, nome, título)
- [x] Criar componente Sobre Mim (biografia, métricas)
- [x] Criar componente Grid de Projetos (cards com redirecionamento)
- [x] Criar componente Contato (links e formulário)
- [x] Criar componente Rodapé

### Navegação e Tema
- [x] Implementar sticky header com navegação
- [x] Implementar alternância Dark/Light Mode
- [x] Configurar TailwindCSS com tema customizado

### Painel Administrativo
- [x] Criar rota /admin com autenticação
- [x] Criar página de login do admin (placeholder)
- [ ] Criar CRUD de Projetos (interface completa)
- [ ] Criar gerenciamento de conteúdo (Sobre Mim, Métricas)
- [ ] Criar gerenciamento de links de contato

### API Routes
- [x] Criar endpoints para CRUD de Projetos
- [x] Criar endpoints para gerenciar conteúdo
- [x] Implementar autenticação nos endpoints

### Design e Animações
- [x] Adicionar hover effects nos cards
- [x] Adicionar transições suaves
- [ ] Testar responsividade (mobile, tablet, desktop)

### Deploy
- [ ] Configurar variáveis de ambiente para Vercel
- [ ] Configurar PostgreSQL (Neon.tech ou Supabase)
- [ ] Testar deploy na Vercel
- [ ] Configurar domínio customizado

## Testes
- [x] Criar testes unitários para rotas de projetos
- [x] Criar testes unitários para rotas de conteúdo
- [x] Todos os testes passando (8/8)

## Bugs Reportados
(Nenhum até o momento)


## Alterações Solicitadas (Sprint 2)
- [x] Alterar tema padrão para escuro (dark mode)
- [x] Ajustar paleta de cores conforme site do Matheus Leandro
- [x] Implementar gerenciamento de redes sociais no painel admin
- [x] Corrigir acesso ao painel admin (/admin) - Link adicionado no footer
- [x] Validar fluxo de autenticação completo

## Sprint 3 - Ajustes Finais
- [x] Remover link do painel admin do footer (rota /admin completamente oculta)

## Bugs Encontrados e Corrigidos
- [x] Corrigir redirecionamento automático em /admin (deve exibir login, não redirecionar)

## Bugs Encontrados (Sprint 4)
- [x] Corrigir redirecionamento pós-login: deve ir para /admin, não para /


## Sprint 5 - Novas Redes Sociais
- [x] Adicionar Instagram ao painel admin
- [x] Adicionar X (Twitter) ao painel admin
- [x] Atualizar componente Contact para exibir novos links


## Sprint 6 - Deploy e Configuração
- [x] Criar repositório GitHub (gaturco/sound-designer-portfolio)
- [x] Fazer primeiro commit do projeto
- [x] Converter de MySQL para PostgreSQL
- [x] Executar migrações no Neon.tech
- [x] Configurar Vercel para deploy automático
- [ ] Corrigir resposta do servidor na Vercel
- [ ] Conectar domínio gabrielturco.com.br
