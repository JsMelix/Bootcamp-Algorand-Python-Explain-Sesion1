import * as algokit from '@algorandfoundation/algokit-utils'; // Importa la biblioteca de Algorand

async function main() {
  const algorand = algokit.AlgorandClient.defaultLocalNet(); // Crea un cliente para la red de prueba local

  // Creación de cuentas:
  const bob = algorand.account.random();
  const alice = algorand.account.random();

  console.log("Direccion de Alice: ", alice.addr);
  console.log("Direccion de Bob: ", bob.addr);

  // Obtener información de las cuentas:
  console.log("Informacion completa de Alice: ", await algorand.account.getInformation(alice.addr))
  console.log("Informacion completa de Bob: ", await algorand.account.getInformation(bob.addr))

  // Enviar fondos a Alice:
  const dispenser = await algorand.account.dispenser();
  await algorand.send.payment({ 
    sender: dispenser.addr,
    receiver: alice.addr,
    amount: algokit.algos(10), 
  })

  console.log("============")

  // Verificar el saldo de Alice después de la transacción:
  console.log("Informacion completa de Alice: ", await algorand.account.getInformation(alice.addr))

  // Crear un nuevo activo:
  const result = await algorand.send.assetCreate({
    sender: alice.addr,
    total: 10n,
  })

  console.log("ID del asset creado: ", BigInt(result.confirmation.assetIndex!));
  console.log("Info del asset", result.confirmation);
  const assetId = BigInt(result.confirmation.assetIndex!)

  console.log("===========")

  // Enviar fondos a Bob y optar por el activo:
  await algorand.send.payment ({ 
    sender: dispenser.addr,
    receiver: bob.addr,
    amount: algokit.algos(10)
  })
  await algorand.send.assetOptIn({ 
    sender: bob.addr,
    assetId  
  })

  // Transferir 1 unidad del activo a Bob:
  await algorand.send.assetTransfer({ 
    sender: alice.addr,
    receiver: bob.addr,
    assetId,
    amount: 1n,
  })

  console.log("===============")

  // Mostrar información de Bob y balances del activo:
  console.log("Informacion completa de Bob: ",await algorand.account.getInformation(bob.addr))
  console.log("=============")
  console.log("Balance  de Asset de Alice: ", await algorand.account.getAssetInformation(alice.addr, assetId));
  console.log("Balance  de Asset de Bob: ", await algorand.account.getAssetInformation(bob.addr, assetId));

  // Grupo de transacciones atómicas:
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

  console.log("======")

  // Mostrar nuevos balances del activo:
  console.log("Nuevo Balance  de Asset de Alice: ", await algorand.account.getAssetInformation(alice.addr, assetId));
  console.log("Nuevo Balance  de Asset de Bob: ", await algorand.account.getAssetInformation(bob.addr, assetId));

  // Mostrar información de Bob y su MBR:
  console.log("Informacion completa de Bob: ",await algorand.account.getInformation(bob.addr));
  console.log(" MBR de Bob", (await algorand.account.getInformation(bob.addr)).minBalance);

  // Transferir 0 unidades del activo y cerrar la cuenta del activo para Bob:
  await algorand.send.assetTransfer({ 
    sender: bob.addr,
    receiver: alice.addr,
    assetId,
    amount: 0n,
    closeAssetTo: alice.addr, // Cierra la cuenta del activo para Bob y envía cualquier saldo restante a Alice
  });
}

main();