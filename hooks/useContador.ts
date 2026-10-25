"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/*
  Una cifra que cuenta hacia arriba cuando entra en pantalla.

  Dos cosas que no son adorno:

  - **Arranca al verse, no al montarse.** La franja de cifras está debajo del
    pliegue; animándola al montar, la cuenta ya terminó cuando alguien llega
    ahí y lo único que se ve es el número quieto.
  - **Con `prefers-reduced-motion` no cuenta**: devuelve el valor final de
    entrada. Una cifra que salta es justo el tipo de movimiento que marea a
    quien pidió que no lo hubiera, y aquí no cuesta nada respetarlo — el dato
    es el mismo.

  Va con `requestAnimationFrame` y no con un `setInterval`: el intervalo se
  desincroniza del repintado y la cuenta se ve a tirones.
*/
export function useContador(destino: number, duracionMs = 1100) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true, margin: "-80px" });
  const sinMovimiento = useReducedMotion();
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (!visible) return;
    if (sinMovimiento || duracionMs <= 0) {
      setValor(destino);
      return;
    }

    let raf = 0;
    let inicio: number | null = null;

    const paso = (t: number) => {
      if (inicio === null) inicio = t;
      const avance = Math.min((t - inicio) / duracionMs, 1);
      // Desaceleración: la cifra llega y se asienta, no frena en seco.
      const suave = 1 - Math.pow(1 - avance, 3);
      setValor(Math.round(destino * suave));
      if (avance < 1) raf = requestAnimationFrame(paso);
    };

    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [visible, destino, duracionMs, sinMovimiento]);

  return { ref, valor };
}
