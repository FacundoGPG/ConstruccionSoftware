
-- LAB Manipulacion de datos usando Stored Procedures
-- Facundo Gael Piñeiro González


-- La suma de las cantidades e importe total de todas las entregas realizadas durante el 97.

CREATE OR REPLACE FUNCTION fn_totales_entregas_anio(p_anio INT)
RETURNS TABLE(
    TotalCantidades NUMERIC,
    ImporteTotal    NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        SUM(E.cantidad)::NUMERIC,
        SUM(E.cantidad * M.precio * (1 + M.impuesto / 100))::NUMERIC
    FROM "Entregan" E
    INNER JOIN "Materiales" M
        ON E.clave = M.clave
    WHERE EXTRACT(YEAR FROM E.fecha) = p_anio;
END;
$$;

-- Ejecución:
SELECT * FROM fn_totales_entregas_anio(1997);



-- Por cada material obtener la clave y descripción del material, la cantidad total entregada,
-- la mínima cantidad entregada, la máxima cantidad entregada, el importe total de las 
-- entregas de aquellos materiales en los que la cantidad promedio entregada sea mayor a 400.

CREATE OR REPLACE FUNCTION fn_estadisticas_material(p_promedio_minimo NUMERIC)
RETURNS TABLE(
    Clave           TEXT,
    Descripcion     TEXT,
    TotalEntregada  NUMERIC,
    MinimaEntregada NUMERIC,
    MaximaEntregada NUMERIC,
    ImporteTotal    NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        M.clave::TEXT,
        M.descripcion::TEXT,
        SUM(E.cantidad)::NUMERIC,
        MIN(E.cantidad)::NUMERIC,
        MAX(E.cantidad)::NUMERIC,
        SUM(E.cantidad * M.precio * (1 + M.impuesto / 100))::NUMERIC
    FROM "Materiales" M
    INNER JOIN "Entregan" E
        ON M.clave = E.clave
    GROUP BY
        M.clave,
        M.descripcion
    HAVING
        AVG(E.cantidad) > p_promedio_minimo;
END;
$$;

-- Ejecución:
SELECT * FROM fn_estadisticas_material(400);


-- Mostrar en una solo consulta los mismos datos que en la consulta anterior pero para 
-- dos grupos de proveedores: aquellos para los que la cantidad promedio entregada es 
-- menor a 370 y aquellos para los que la cantidad promedio entregada sea mayor a 450.

CREATE OR REPLACE FUNCTION fn_proveedores_dos_grupos(
    p_limite_inferior NUMERIC,
    p_limite_superior NUMERIC
)
RETURNS TABLE(
    Proveedor        TEXT,
    Clave            TEXT,
    Descripcion      TEXT,
    CantidadPromedio NUMERIC,
    Grupo            TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        P.razonsocial::TEXT,
        M.clave::TEXT,
        M.descripcion::TEXT,
        AVG(E.cantidad)::NUMERIC,
        CASE
            WHEN AVG(E.cantidad) < p_limite_inferior THEN 'Grupo 1 (Bajo)'
            WHEN AVG(E.cantidad) > p_limite_superior THEN 'Grupo 2 (Alto)'
        END::TEXT
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
        AVG(E.cantidad) < p_limite_inferior
        OR AVG(E.cantidad) > p_limite_superior;
END;
$$;

-- Ejecución:
SELECT * FROM fn_proveedores_dos_grupos(370, 450);