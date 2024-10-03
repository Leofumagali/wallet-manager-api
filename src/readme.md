# API Wallet - Documentação

## Descrição

Esta é uma API para gerenciar carteiras de criptomoedas. A API permite adicionar, atualizar, excluir e listar carteiras, bem como associar criptomoedas a essas carteiras. A API é construída usando TypeScript, Node, Express e MongoDB.

## Funcionalidades

- **Adicionar Carteira**: Crie uma nova carteira com um nome, endereço e rede blockchain associada.
- **Atualizar Carteira**: Atualize todas as informações de uma carteira existente, substituindo os dados antigos pelos novos.
- **Excluir Carteira**: Remova uma carteira do sistema.
- **Listar Carteiras**: Recupere todas as carteiras armazenadas.
- **Buscar Carteira por ID**: Recupere os detalhes de uma carteira específica usando seu ID.

## Estrutura do Projeto

```
src/
├── __tests__/
│   ├── controller/
│   │   └── WalletController.test.ts
│   ├── repositories/
│   │   └── WalletRepository.test.ts
│   └── services/
│       └── WalletService.test.ts
├── api/
│   ├── controllers/
│   │   └── WalletController.ts
│   ├── routes/
│       └── index.ts
├── domain/
│   ├── services/
│   │   └── WalletService.ts
│   ├── interfaces/
│   │   └──IWalletRepository.ts
│   └── dto/
│       ├── AddWalletDTO.ts
│       └── UpdateWalletDTO.ts
├── entities/
│   └── Wallet.ts
├── infra/
│   ├── database/
│   │   ├── models
│   │   │   └── WalletModal.ts
│   │   ├── schemas
│   │   │   └── WalletSchema.ts
│   │   └── db.ts
│   ├── middlewares/
│   │   └── dtoValidationMiddleware.ts
│   ├── inversify/
│   │   ├── types.ts
│   │   └── inversify.config.ts
│   └── repositories/
│       └── WalletRepository.ts
├── main.ts
├── general configs
└── .env
```

## Endpoints

### 1. **POST api/v1/wallets**

**Descrição**: Adiciona uma nova carteira.

**Request**:
```json
{
  "name": "Minha Carteira",
  "address": "0x1234...",
  "network": {
    "id": "1",
    "name": "Ethereum",
    "rpcUrl": "https://mainnet.infura.io/v3/...",
    "currencySymbol": "ETH",
    "blockExplorer": "https://etherscan.io"
  }
}
```

**Response**:
- `201 Created`: Se a carteira for adicionada com sucesso.
- `400 Bad Request`: Se houver erros de validação.

### 2. **PUT /wallets**

**Descrição**: Atualiza uma carteira existente com um novo conjunto de dados.

**Request**:
```json
{
  "id": "1c595565-06dc-4cac-a201-f6ae85345c26",
  "name": "Minha Nova Carteira",
  "address": "0x5678...",
  "network": {
    "id": "1",
    "name": "Ethereum",
    "rpcUrl": "https://mainnet.infura.io/v3/...",
    "currencySymbol": "ETH",
    "blockExplorer": "https://etherscan.io"
  }
}
```

**Response**:
- `204 No Content`: Se a carteira for atualizada com sucesso.
- `404 Not Found`: Se a carteira com o ID especificado não for encontrada.
- `400 Bad Request`: Se houver erros de validação.

### 3. **GET /wallets**

**Descrição**: Retorna todas as carteiras cadastradas.

**Response**:
- `200 OK`: Uma lista de carteiras.

### 4. **GET /wallets/:id**

**Descrição**: Retorna uma carteira específica pelo ID.

**Response**:
- `200 OK`: A carteira correspondente ao ID.
- `404 Not Found`: Se a carteira com o ID especificado não for encontrada.

### 5. **DELETE /wallets/:id**

**Descrição**: Exclui uma carteira específica pelo ID.

**Response**:
- `204 No Content`: Se a carteira for excluída com sucesso.
- `404 Not Found`: Se a carteira com o ID especificado não for encontrada.

## Middleware

### dtoValidationMiddleware

Este middleware valida os dados da requisição contra os DTOs definidos. Se os dados não estiverem em conformidade com as regras estabelecidas no DTO, uma resposta `400 Bad Request` é enviada com detalhes sobre os erros de validação.

**Uso**:

```typescript
router.post('/wallets', dtoValidationMiddleware(AddWalletDTO), walletController.addWallet);
router.put('/wallets', dtoValidationMiddleware(UpdateWalletDTO), walletController.updateWallet);
```

## Tratamento de Erros

A API utiliza um mecanismo de tratamento de erros para capturar e responder adequadamente a erros comuns, como erros de validação e operações em recursos não encontrados.