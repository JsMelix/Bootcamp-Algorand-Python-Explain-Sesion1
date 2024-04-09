# Interacción con Activos Digitales en Algorand Testnet

Este README proporciona una guía detallada del código que ejecuta una serie de operaciones en la red de prueba de Algorand. El código proporcionado se centra en la creación, transferencia y cierre de activos digitales personalizados. A continuación, se desglosa cada paso del código de una manera más amigable y visual:

---

## Tabla de Contenidos

1. [Importación de Bibliotecas y Creación del Cliente](#importación-de-bibliotecas-y-creación-del-cliente)
2. [Creación de Cuentas para Alice y Bob](#creación-de-cuentas-para-alice-y-bob)
3. [Obtención de Información de las Cuentas](#obtención-de-información-de-las-cuentas)
4. [Financiamiento de la Cuenta de Alice](#financiamiento-de-la-cuenta-de-alice)
5. [Creación de un Activo Digital por Alice](#creación-de-un-activo-digital-por-alice)
6. [Financiamiento de la Cuenta de Bob y Optar por el Activo](#financiamiento-de-la-cuenta-de-bob-y-optar-por-el-activo)
7. [Transferencia del Activo de Alice a Bob](#transferencia-del-activo-de-alice-a-bob)
8. [Mostrar Información de las Cuentas y Balances del Activo](#mostrar-información-de-las-cuentas-y-balances-del-activo)
9. [Grupo de Transacciones Atómicas](#grupo-de-transacciones-atómicas)
10. [Mostrar Nuevos Balances del Activo](#mostrar-nuevos-balances-del-activo)
11. [Mostrar Información de Bob y su MBR](#mostrar-información-de-bob-y-su-mbr)
12. [Cerrar la Cuenta del Activo para Bob](#cerrar-la-cuenta-del-activo-para-bob)

---

## 1. Importación de Bibliotecas y Creación del Cliente

Para comenzar, importamos la biblioteca `algokit-utils`, que nos permite interactuar con la red de Algorand. Luego, establecemos un cliente para conectarnos a la red de prueba local (testnet).

---

## 2. Creación de Cuentas para Alice y Bob

Generamos cuentas aleatorias para Alice y Bob, y mostramos sus direcciones respectivas en la consola.

---

## 3. Obtención de Información de las Cuentas

A continuación, obtenemos detalles sobre las cuentas de Alice y Bob, como sus saldos y direcciones, que se muestran claramente en la consola.

---

## 4. Financiamiento de la Cuenta de Alice

Alice recibe un financiamiento inicial de 10 Algos desde la cuenta dispensadora de la red de prueba. Luego, verificamos que Alice haya recibido los fondos correctamente.

---

## 5. Creación de un Activo Digital por Alice

Alice crea un nuevo activo digital con un suministro total de 10 unidades. Se muestra el ID del activo recién creado junto con detalles sobre la transacción.

---

## 6. Financiamiento de la Cuenta de Bob y Optar por el Activo

Bob también recibe un financiamiento inicial de 10 Algos. Luego, Bob elige recibir el activo creado por Alice para poder realizar transacciones con él.

---

## 7. Transferencia del Activo de Alice a Bob

Alice transfiere 1 unidad del activo a Bob para demostrar cómo se pueden realizar transferencias de activos digitales entre cuentas.

---

## 8. Mostrar Información de las Cuentas y Balances del Activo

Se muestra una vista completa de la cuenta de Bob, así como los balances actuales del activo para ambas cuentas de Alice y Bob.

---

## 9. Grupo de Transacciones Atómicas

Se lleva a cabo un grupo de transacciones atómicas, garantizando que las operaciones se ejecuten de manera coherente. Esto incluye un pago de 1 Algo de Alice a Bob y una transferencia de 1 unidad del activo de Bob a Alice.

---

## 10. Mostrar Nuevos Balances del Activo

Después de la transacción atómica, se actualizan los balances del activo para Alice y Bob, lo que se muestra claramente para una fácil comprensión.

---

## 11. Mostrar Información de Bob y su MBR

Se presenta una visión general de la cuenta de Bob, incluido su "minimum balance requirement" (MBR), que es crucial para mantener cuentas activas en Algorand.

---

## 12. Cerrar la Cuenta del Activo para Bob

Por último, Bob transfiere 0 unidades del activo a Alice y cierra su cuenta asociada con el activo, asegurándose de que todos los fondos restantes sean transferidos correctamente.

---
