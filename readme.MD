Creación, Transferencia y Cierre de Activos Digitales en Algorand Testnet
Este README proporciona una guía paso a paso del código que realiza una serie de acciones en la red de prueba de Algorand para demostrar la creación, transferencia y cierre de un activo digital personalizado.

Paso 1: Importación de la Biblioteca y Creación del Cliente
javascript
Copy code
import * as algokit from '@algorandfoundation/algokit-utils';

const algorand = algokit.AlgorandClient.defaultLocalNet();
Se importa la biblioteca algokit-utils de Algorand.
Se crea un cliente para la red de prueba local.
Paso 2: Creación de Cuentas para Alice y Bob
javascript
Copy code
const bob = algorand.account.random();
const alice = algorand.account.random();

console.log("Dirección de Alice: ", alice.addr);
console.log("Dirección de Bob: ", bob.addr);
Se generan cuentas aleatorias para Alice y Bob.
Se muestra la dirección de cada cuenta en la consola.
Paso 3: Obtención de Información de las Cuentas
javascript
Copy code
console.log("Información completa de Alice: ", await algorand.account.getInformation(alice.addr));
console.log("Información completa de Bob: ", await algorand.account.getInformation(bob.addr));
Se obtiene información detallada de las cuentas de Alice y Bob, como saldo y dirección.
Se muestra la información en la consola.
Paso 4: Financiar la Cuenta de Alice
javascript
Copy code
const dispenser = await algorand.account.dispenser();
await algorand.send.payment({ 
  sender: dispenser.addr,
  receiver: alice.addr,
  amount: algokit.algos(10), 
});
Se obtiene una cuenta dispensadora y se envían 10 Algos desde ella a la cuenta de Alice.
Paso 5: Creación de un Activo Digital por Alice
javascript
Copy code
const result = await algorand.send.assetCreate({
  sender: alice.addr,
  total: 10n,
});

const assetId = BigInt(result.confirmation.assetIndex!);
Alice crea un nuevo activo digital con un suministro total de 10 unidades.
Se guarda el ID del activo creado.
Paso 6: Financiar la Cuenta de Bob y Optar por el Activo
javascript
Copy code
await algorand.send.payment ({ 
  sender: dispenser.addr,
  receiver: bob.addr,
  amount: algokit.algos(10)
});
await algorand.send.assetOptIn({ 
  sender: bob.addr,
  assetId  
});
Se envían 10 Algos a la cuenta de Bob y Bob opta por recibir el activo creado por Alice.
Paso 7: Transferencia del Activo de Alice a Bob
javascript
Copy code
await algorand.send.assetTransfer({ 
  sender: alice.addr,
  receiver: bob.addr,
  assetId,
  amount: 1n,
});
Alice transfiere 1 unidad del activo a Bob.
Paso 8: Mostrar Información de las Cuentas y Balances del Activo
javascript
Copy code
console.log("Información completa de Bob: ",await algorand.account.getInformation(bob.addr));
console.log("Balance de Asset de
User
generame ese readme para github
ChatGPT
markdown
Copy code
# Creación, Transferencia y Cierre de Activos Digitales en Algorand Testnet

Este README proporciona una guía paso a paso del código que realiza una serie de acciones en la red de prueba de Algorand para demostrar la creación, transferencia y cierre de un activo digital personalizado.

## Paso 1: Importación de la Biblioteca y Creación del Cliente

```javascript
import * as algokit from '@algorandfoundation/algokit-utils';

const algorand = algokit.AlgorandClient.defaultLocalNet();
Se importa la biblioteca algokit-utils de Algorand.
Se crea un cliente para la red de prueba local.
Paso 2: Creación de Cuentas para Alice y Bob
javascript
Copy code
const bob = algorand.account.random();
const alice = algorand.account.random();

console.log("Dirección de Alice: ", alice.addr);
console.log("Dirección de Bob: ", bob.addr);
Se generan cuentas aleatorias para Alice y Bob.
Se muestra la dirección de cada cuenta en la consola.
Paso 3: Obtención de Información de las Cuentas
javascript
Copy code
console.log("Información completa de Alice: ", await algorand.account.getInformation(alice.addr));
console.log("Información completa de Bob: ", await algorand.account.getInformation(bob.addr));
Se obtiene información detallada de las cuentas de Alice y Bob, como saldo y dirección.
Se muestra la información en la consola.
Paso 4: Financiar la Cuenta de Alice
javascript
Copy code
const dispenser = await algorand.account.dispenser();
await algorand.send.payment({ 
  sender: dispenser.addr,
  receiver: alice.addr,
  amount: algokit.algos(10), 
});
Se obtiene una cuenta dispensadora y se envían 10 Algos desde ella a la cuenta de Alice.
Paso 5: Creación de un Activo Digital por Alice
javascript
Copy code
const result = await algorand.send.assetCreate({
  sender: alice.addr,
  total: 10n,
});

const assetId = BigInt(result.confirmation.assetIndex!);
Alice crea un nuevo activo digital con un suministro total de 10 unidades.
Se guarda el ID del activo creado.
Paso 6: Financiar la Cuenta de Bob y Optar por el Activo
javascript
Copy code
await algorand.send.payment ({ 
  sender: dispenser.addr,
  receiver: bob.addr,
  amount: algokit.algos(10)
});
await algorand.send.assetOptIn({ 
  sender: bob.addr,
  assetId  
});
Se envían 10 Algos a la cuenta de Bob y Bob opta por recibir el activo creado por Alice.
Paso 7: Transferencia del Activo de Alice a Bob
javascript
Copy code
await algorand.send.assetTransfer({ 
  sender: alice.addr,
  receiver: bob.addr,
  assetId,
  amount: 1n,
});
Alice transfiere 1 unidad del activo a Bob.
Paso 8: Mostrar Información de las Cuentas y Balances del Activo
javascript
Copy code
console.log("Información completa de Bob: ",await algorand.account.getInformation(bob.addr));
console.log("Balance de Asset de Alice: ", await algorand.account.getAssetInformation(alice.addr, assetId));
console.log("Balance de Asset de Bob: ", await algorand.account.getAssetInformation(bob.addr, assetId));
Se muestra la información completa de Bob y los balances del activo para Alice y Bob.
Paso 9: Grupo de Transacciones Atómicas
javascript
Copy code
await algorand.newGroup()
  .addPayment({ 
    sender: alice.addr,
    receiver: bob.addr,
    amount: algokit.algos(1) 
  })
  .addAssetTransfer({ 
    sender: bob.addr,
    receiver: alice.addr,
    assetId,
    amount: 1n,       
  })
  .execute()
Se crea un grupo de transacciones atómicas que incluye un pago de 1 Algo de Alice a Bob y una transferencia del activo de Bob a Alice.
Paso 10: Mostrar Nuevos Balances del Activo
javascript
Copy code
console.log("Nuevo Balance de Asset de Alice: ", await algorand.account.getAssetInformation(alice.addr, assetId));
console.log("Nuevo Balance de Asset de Bob: ", await algorand.account.getAssetInformation(bob.addr, assetId));
Se muestra el nuevo balance del activo para Alice y Bob después de la transacción atómica.
Paso 11: Mostrar Información de Bob y su MBR
javascript
Copy code
console.log("Información completa de Bob: ",await algorand.account.getInformation(bob.addr));
console.log("MBR de Bob", (await algorand.account.getInformation(bob.addr)).minBalance);
Se muestra la información completa de la cuenta de Bob y su "minimum balance requirement" (MBR).
Paso 12: Cierre de la Cuenta del Activo para Bob
javascript
Copy code
await algorand.send.assetTransfer({ 
  sender: bob.addr,
  receiver: alice.addr,
  assetId,
  amount: 0n,
  closeAssetTo: alice.addr,
});
Bob transfiere 0 unidades del activo a Alice y cierra su cuenta asociada con el activo.
