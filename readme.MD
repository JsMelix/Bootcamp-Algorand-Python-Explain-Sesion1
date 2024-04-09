
Explicación detallada del código con ejemplos
Paso 1: Importación y configuración
import * as algokit from '@algorandfoundation/algokit-utils';

const algorand = algokit.AlgorandClient.defaultLocalNet();
Use code with caution.
JavaScript
Importamos la biblioteca algokit-utils que proporciona funciones para interactuar con la blockchain de Algorand.
Creamos un cliente algorand conectado a la red de prueba local de Algorand.
Paso 2: Creación de cuentas
const bob = algorand.account.random();
const alice = algorand.account.random();

console.log("Dirección de Alice: ", alice.addr);
console.log("Dirección de Bob: ", bob.addr);
Use code with caution.
JavaScript
Generamos dos cuentas aleatorias para Alice y Bob utilizando la función algorand.account.random().
Mostramos las direcciones de las cuentas en la consola para poder usarlas en los siguientes pasos.
Paso 3: Información de las cuentas
console.log("Información completa de Alice: ", await algorand.account.getInformation(alice.addr));
console.log("Información completa de Bob: ", await algorand.account.getInformation(bob.addr));
Use code with caution.
JavaScript
Obtenemos la información completa de las cuentas de Alice y Bob utilizando algorand.account.getInformation().
Esta información incluye el saldo, la dirección y otros detalles de la cuenta.
Mostramos la información en la consola para verificar que las cuentas se han creado correctamente.
Paso 4: Financiamiento de la cuenta de Alice
const dispenser = await algorand.account.dispenser();
await algorand.send.payment({ 
  sender: dispenser.addr,
  receiver: alice.addr,
  amount: algokit.algos(10), 
});
Use code with caution.
JavaScript
Obtenemos una cuenta dispensadora utilizando algorand.account.dispenser().
Enviamos 10 Algos desde la cuenta dispensadora a la cuenta de Alice utilizando algorand.send.payment().
La función algokit.algos(10) convierte 10 Algos a la unidad mínima de la blockchain (microAlgos).
Paso 5: Creación de un activo digital
const result = await algorand.send.assetCreate({
  sender: alice.addr,
  total: 10n,
});

const assetId = BigInt(result.confirmation.assetIndex!);
Use code with caution.
JavaScript
Alice crea un nuevo activo digital con un suministro total de 10 unidades utilizando algorand.send.assetCreate().
Guardamos el ID del activo creado en la variable assetId para utilizarlo en los siguientes pasos.
Paso 6: Financiamiento y Opt-in de Bob
await algorand.send.payment ({ 
  sender: dispenser.addr,
  receiver: bob.addr,
  amount: algokit.algos(10)
});
await algorand.send.assetOptIn({ 
  sender: bob.addr,
  assetId  
});
Use code with caution.
JavaScript
Enviamos 10 Algos a la cuenta de Bob para cubrir las tarifas de transacción.
Bob opta por recibir el activo creado por Alice utilizando algorand.send.assetOptIn(). Esto le permite a Bob recibir y mantener el activo en su cuenta.
Paso 7: Transferencia de activo
await algorand.send.assetTransfer({ 
  sender: alice.addr,
  receiver: bob.addr,
  assetId,
  amount: 1n,
});
Use code with caution.
JavaScript
Alice transfiere 1 unidad del activo a Bob utilizando algorand.send.assetTransfer().
Paso 8: Información de las cuentas y balances
console.log("Información completa de Bob: ",await algorand.account.getInformation(bob.addr));
console.log("Balance de Asset de Alice: ", await algorand.account.getAssetInformation(alice.addr, assetId));
console.log("Balance de Asset de Bob: ", await algorand.account.getAssetInformation(bob.addr, assetId));
Use code with caution.
JavaScript
Se muestra la información completa de Bob y los balances del activo para Alice y Bob.
Podemos verificar que Alice tiene 9 unidades del activo y Bob tiene 1 unidad.
