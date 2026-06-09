
-- LAB Funciones agregadas y sub-consultas


UPDATE "Materiales" SET impuesto = 16

-- La suma de las cantidades e importe total de todas las entregas realizadas durante el 97.

SELECT
SUM(E.cantidad) AS TotalCantidades,
SUM(E.cantidad * M.precio * (1 + M.impuesto / 100)) AS ImporteTotal
FROM "Entregan" E
INNER JOIN "Materiales" M
ON E.clave = M.clave
WHERE EXTRACT(YEAR FROM E.fecha) = 1997;

-- Para cada proveedor, obtener la razón social del proveedor, número de entregas 
-- e importe total de las entregas realizadas.

SELECT
P.razonsocial AS Proveedor,
COUNT (*) AS NumeroEntregas,
SUM(E.cantidad * M.precio * (1 + M.impuesto / 100)) AS ImporteTotal
FROM "Proveedores" P
INNER JOIN "Entregan" E
ON P.rfc = E.rfc
INNER JOIN "Materiales" M
ON E.clave = M.clave
GROUP BY P.razonsocial;



-- Por cada material obtener la clave y descripción del material, la cantidad total entregada,
-- la mínima cantidad entregada, la máxima cantidad entregada, el importe total de las 
-- entregas de aquellos materiales en los que la cantidad promedio entregada sea mayor a 400.

SELECT
	M.clave,
	M.descripcion,
	SUM(E.cantidad) AS TotalEntregada,
	MIN(E.cantidad) AS MinimaEntregada,
	MAX(E.cantidad) AS MaximaEntregada,
	SUM(E.cantidad * M.precio * (1 + M.impuesto / 100)) AS ImporteTotal
FROM "Materiales" M
INNER JOIN "Entregan" E
	ON 
		M.clave = E.clave
GROUP BY 
	M.clave,
	M.descripcion
HAVING 
	AVG(E.cantidad) > 400;


-- Para cada proveedor, indicar su razón social y mostrar la cantidad promedio de cada 
-- material entregado, detallando la clave y descripción del material, excluyendo 
-- aquellos proveedores para los que la cantidad promedio sea menor a 500.

SELECT 
	P.razonsocial AS Proveedor,
	M.clave,
	M.descripcion,
	AVG(E.cantidad) AS CantidadPromedio
FROM "Proveedores" P
INNER JOIN "Entregan" E
	ON P.rfc = E.rfc
INNER JOIN "Materiales" M
	ON E.clave = M.clave
GROUP BY
	P.razonsocial,
	M.clave,
	M.descripcion
HAVING
	AVG(E.cantidad) >= 500;


-- Mostrar en una solo consulta los mismos datos que en la consulta anterior pero para 
-- dos grupos de proveedores: aquellos para los que la cantidad promedio entregada es 
-- menor a 370 y aquellos para los que la cantidad promedio entregada sea mayor a 450.

SELECT
	P.razonsocial AS Proveedor,
	M.clave,
	M.descripcion,
	AVG(E.cantidad) AS CantidadPromedio2
FROM "Proveedores" P
INNER JOIN "Entregan" E
	ON P.rfc = E.rfc
INNER JOIN "Materiales" M
	ON E.clave = M.clave
GROUP BY
	P.razonsocial,
	M.clave,
	M.descripcion
HAVING
	AVG(E.cantidad) < 370
	OR
		AVG(E.cantidad) > 450;