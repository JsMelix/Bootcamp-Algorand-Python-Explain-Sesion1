# Creación, Transferencia y Cierre de Activos Digitales en Algorand Testnet

Este README proporciona una explicación detallada del código que realiza una serie de acciones en la red de prueba de Algorand para demostrar la creación, transferencia y cierre de un activo digital personalizado.

## Explicación Detallada del Código

### 1. Importación de la Biblioteca y Creación del Cliente

```javascript
import * as algokit from '@algorandfoundation/algokit-utils';

const algorand = algokit.AlgorandClient.defaultLocalNet();

### Se importa la biblioteca algokit-utils de Algorand y se crea un cliente para la red de prueba local.

### 2. Creación de Cuentas para Alice y Bob
javascript
Copy code
const bob = algorand.account.random();
const alice = algorand.account.random();

console.log("Dirección de Alice: ", alice.addr);
console.log("Dirección de Bob: ", bob.addr);
### Se generan cuentas aleatorias para Alice y Bob, y se imprime la dirección de cada cuenta en la consola.

### 3. Obtener Información de las Cuentas
javascript
Copy code
console.log("Información completa de Alice: ", await algorand.account.getInformation(alice.addr));
console.log("Información completa de Bob: ", await algorand.account.getInformation(bob.addr));
### Se obtiene información detallada de las cuentas de Alice y Bob, como saldo y dirección, y se muestra en la consola.

### 4. Financiar la Cuenta de Alice
javascript
Copy code
const dispenser = await algorand.account.dispenser();
await algorand.send.payment({
  sender: dispenser.addr,
  receiver: alice.addr,
  amount: algokit.algos(10),
});
### Se obtiene una cuenta dispensadora y se envían 10 Algos desde ella a la cuenta de Alice.

### 5. Creación de un Activo Digital por Alice
javascript
Copy code
const result = await algorand.send.assetCreate({
  sender: alice.addr,
  total: 10n,
});

const assetId = BigInt(result.confirmation.assetIndex!);
### Alice crea un nuevo activo digital con un suministro total de 10 unidades y se guarda el ID del activo.

### 6. Financiar la Cuenta de Bob y Optar por el Activo
javascript
Copy code
await algorand.send.payment({
  sender: dispenser.addr,
  receiver: bob.addr,
  amount: algokit.algos(10),
});
await algorand.send.assetOptIn({
  sender: bob.addr,
  assetId,
});
### Se envían 10 Algos a la cuenta de Bob y Bob opta por recibir el activo creado por Alice.

### 7. Transferencia del Activo de Alice a Bob
javascript
Copy code
await algorand.send.assetTransfer({
  sender: alice.addr,
  receiver: bob.addr,
  assetId,
  amount: 1n,
});
### Alice transfiere 1 unidad del activo a Bob.

### 8. Mostrar Información de las Cuentas y Balances del Activo
### Se muestra la información completa de Bob y los balances del activo para Alice y Bob.

### 9. Grupo de Transacciones Atómicas
### Se crea un grupo de transacciones atómicas que incluye un pago de 1 Algo de Alice a Bob y una transferencia del activo de Bob a Alice.

### 10. Mostrar Nuevos Balances del Activo
### Se muestra el nuevo balance del activo para Alice y Bob después de la transacción atómica.

### 11. Mostrar Información de Bob y su MBR
### Se muestra la información completa de la cuenta de Bob y su MBR.

### 12. Cerrar la Cuenta del Activo para Bob
### Bob transfiere 0 unidades del activo a Alice y cierra su cuenta asociada con el activo.

### Este código demuestra cómo interactuar con activos digitales personalizados en Algorand, incluyendo su creación, transferencia y cierre de cuentas asociadas. Proporciona una visión completa del proceso y permite entender cómo funcionan las operaciones en la red de Algorand.
